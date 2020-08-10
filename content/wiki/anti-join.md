---
title   : 'MySQL 에서 차집합 : Anti-join 의 세가지 방법'  
slug  : '/anti-join' 
excerpt : 
date    : 2020-07-28 15:41:14 +0900
updated : 2020-08-02 22:52:00 +0900
tags    : 
   - Mysql
banner : ./thumb.png
---

> [쿼리와 로직](https://juneyr.dev/ways-of-query) 에서 확장된 글입니다. 
 
안그러고 싶지만, 하나의 테이블에는 존재하는데 다른 하나에서는 존재하지 않는, 그런 값을 뽑고 싶을 때가 있다. 이번에는 유저 차단 정보 테이블에 없는 유저만 뽑는 케이스가 그랬다. 아니, 이런건 어떻게 뽑아? 1시간 동안 팀분의 설명을 듣고, 찾아보고서야 `left-join / is null` 방식으로 PR을 올렸다. 그런데 다음날 달린 코멘트. `anti-join은 이런 방식도 있습니다 ! 😇` 앗.. 내가 또 지식이 짧았다. 이 글은 팀분이 알려주신 코멘트에서 시작되었다. 이렇게 유저차단 혹은 다른 케이스에서도 안티조인은 자주 튀어나오는 패턴이니, 시원하게 정리해보면 좋겠다. 절대 나만의 고민이 아닐거라 생각한다!🙊 

## Anti-join 이란 
   어떤 테이블 A에는 존재하지만, 다른 테이블 B에는 존재하지 않는 값을 선택하는 join의 종류를 anti-join이라고 한다. 테이블과 벤다이어그램을 비교하는 것이 정확하지는 않지만, 어렴풋이 차집합과 비슷한 개념이라고 생각해도 괜찮다.
   
   생각보다 이렇게 사용할 일이 자주 일어난다. 예를 들어 post 를 가져오는데, 내가 차단한 유저의 post를 가져오지 않는 경우. 차단 테이블에는 없는 유저의 post 를 가져와야한다. 이때 사용할 수 있는 것이 anti-join 이다.

## Anti-join의 세가지 방법 

### left-join / is null 
 원래의 anti-join 방법. 엄밀하게는  anti-join 은 left join 한 후, where 로 is null 검증 하는 것이다. 아니 이렇게 하면 차집합이 된다구요? 예제로 살펴보자. 
 left join은 원 테이블이 그대로 남아있고, join 되는 테이블과 겹치는 데이터가 있으면 추가로 붙는다. 없는 경우 null 이 되어 붙는다. 
 
 ```sql
 select * 
from user left join userblock
on (user.id = userblock.user_id)
where userblock.user_id is null;
 ```

```
table user     table userblock
id | name      id | user_id
1  | nvr       11 | 1
2  | line      22 | 9
3  | kko       33 | 3 
4  | dum       44 | 10
```

위 쿼리에서 where 전 까지 결과를 보면 다음과 같다. 
```
1 | nvr | 11 | 1 
2 | line | null | null 
3 | kko  | 33 | 3 
4 | dum | null | null
```

이 상태에서 다시 where 절을 적용하면 
```
2 | line | null | null 
4 | dum | null | null
```
결과적으로 userblock 에 존재하지 않는 user의 row만 뽑아낼 수 있게 된다. 현재 상황으로는 where절에 `userblock.user_id is null` 혹은 `userblock.id is null` 둘다 넣어도 동작한다.

### not-in 
join을 사용하지 않고 차집합을 구할 수 있다. 이 방법이 훨씬 직관적이다. 

```sql 
select user.id from user 
where user.id NOT IN
(select user_id 
from user_block);
```
이 쿼리는 leftjoin/not null 방식만큼 빠르지만, 실행 계획 자체는 다르다. 

### not exists
```sql 
select user.id
from user 
where not exists 
( select user_id
  from user_block
 )
```

이 역시 직관적이다. 


## nullable한 필드 포함한 상태에서의 anti-join 

위에서는 필드가 `not-null` 인 상태에서의 쿼리다. [참고](https://planet.mysql.com/entry/?id=24888)  문서에 보면 , 이 상태에서는 세가지 쿼리는 정확하게 같은 결과를 내놓는다. 성능과는 상관없이! 

하지만 만약에 nullable 한 필드가 관련이 되어있다면 결과가 조금 다르다.  예시로 보자. 

### left join / is null 

```
table user     table userblock
id | name      id | user_id
1  | nvr       11 | 1
2  | line      22 | 9
3  | kko       33 | 3 
4  | dum       44 | 10
               55 | null
```
id 가 null 인 경우가 추가 되었다. 


left join / not null 로는 편안하게 해결이 가능하다. 
```sql
 select * 
from user left join userblock
on (user.id = userblock.user_id)
where userblock.user_id is null;
 ```

left join을 하면 
```
1  | nvr | 11
2  | line | null 
3  | kko  | 33 
4  | dum   | null
```

이고, is null 조건을 걸면 

```
2 | line | null
4 | dum | null
```

이므로 원하는 결과가 나온다. 

### not exists
위 상황에서 not exists 는 어떻게 할까? 

```sql 
select user.id
from user 
where not exists 
( select user_id
  from user_block
  where user_block.user_id = user.id
 )
```

서브쿼리는 다음과 같다. 
```
// userblock
11 | 1
33 | 3
```

여기에서 11, 33 에 존재하지 않는 (not exists) user테이블의 행을 찾으므로 결과는 
```
2 | line
4 | dum
```

### not in 
하지만 not in 은 조금 다르다. 

```sql 
select user.id from user 
where user.id NOT IN
(select user_id 
from user_block);
```

not in 에서 서브쿼리는 
```
// userblock 그대로 
user_id
1
9
3 
10
null
```

그리고 여기서 not in이므로, 1도 9도 3도 10도 **null**도 아닌 값을 찾게됩니다. 

user에서 
```
2 | line | null
4 | dum | null
```
행은 앞의 조건은 만족하지만, null과의 비교에서 "UNKNOWN"을 출력합니다. 
그래서 where id != 1 and id != 9 and id !=3 and id != 10 and id != null; 
에서 where절이 true가 되지 못하고 false로 무조건 변경되어.. 최종적으로는 
```
// no result 
```

결과가 없게 되는 것이죠. 
이를 방지하기 위해서는 추가적으로 where 절에 조건을 넣어주어야합니다. 

## wrap-up: 성능은? 어떤때 뭘 쓸까요

anti join 시 무엇을 쓸 것이냐에 대해서는 의견이 분분합니다. 하지만 대체로 통용되는 통념은 다음과 같은것같네요.

 - nullable 하지않은 칼럼에서 left join / is null 이나 not in 사용이 최적이다. 

 - nullable 칼럼으로 비교 하는 경우, 나뉜다. 
    - not exist 직관적이고 좋다.

    - not in은 에 nullable 체크가 추가로 필요함. 

    - left join / is null 은 추가 table lookup 필요하고 해서 별로임! 

그러나 실제로 테이블의 크기나 데이터 특성에 따라서 이 결과는 바뀔수 있다고합니다. 실제로 팀분은 언제나 left join / is null 이 좋다는 식으로 알고 계시기도 했고, 또 다른 분은 not exist 가 좋다고 알고계신 경우도 있었습니다. 실제로 서비스에 도입하기 전에 성능 측정을 하고 나서 선택하시기를 권장해드립니다. 😄

## 참고 
- https://explainextended.com/2009/09/18/not-in-vs-not-exists-vs-left-join-is-null-mysql/
- https://planet.mysql.com/entry/?id=24888



