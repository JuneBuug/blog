---
title   : '쿼리와 로직' 
slug  :  '/ways-of-query'
layout  : wiki 
excerpt : '쿼리와 로직에 대한 단상'
date    : 2020-03-16 10:32:29 +0900
updated : 2021-08-31 17:59:28
tag    :
  - Query
parent  : 
---

## 단상 01
  PR 을 보다가 - 하나의 테이블 A에서, B의 id들을 가져와서 다시 B에 쿼리를 날리는 구조를 보았다. 지난번 프로젝트에서는 상황때문에 이 방법 밖에 없었지만, 당시 그 부분을 담당하셨던 부분의 코멘트를 보니 이거 사실 쿼리 하나로 풀리는 거였구나 하는 생각을 했다. 
  정확히는 Like인데, Like 된 item 의 id를 가져와서 item 테이블에 다시 한번 날린다. item을 가져오기 위함이다. 사실 요 부분은 querydsl 상에서 id로 inner join 하면 되는 부분이다. 
  inner join 하면 얻는 이득은 또 있다. 이 로직에서, like된 아이템이 삭제되어도 like는 남아 있기떄문에, 유저가 그 기록을 잘 못볼것을 고려해서 요청된 사이즈보다 넉넉하게 가져온다. 그럼에도 20개 요청했는데 18개가 지워졌다면, (패딩이 10개래도) 12개 밖에 못본다. 
  inner join 하면 애초에 지워진 item 은 제거하고 가져오면 되므로, 요런 문제가 해결된다. 

## 단상 02
엔티티를만들땐 항상 접근 방식 생각해서 인덱스 걸것도 생각하자

## 단상 03 

enrich 는 리스트에서 추가로 주는 것, converter에 껴넣는 것은 단건 조회할 때 항상 내려가야하는 것..? 데이터의 성질을 정의하는게 더 어렵군 좋은 기획서 보고싶다. 

## 단상 04 : 왜 one-to-one 매핑이 아니라 many-to-one 매핑으로 하셨나요?

one-to-one은 jpa에서, 사실상 같은 entity인데 나눠놓은 경우에 사용합니다. 특히 우리 프로젝트에서는 그런 경우 id조차 쉐어하게 만들어놓았고요 (user-user_stat의 경우). one-to-one 으로 해두고 optional 인 경우도 있는데, 그런 경우 outer join을 해야하므로 좋아하는 경우는 아닙니다. 

이 entity 의 경우, many-to-one 으로 몇개가 자기를 참조하든 상관이 없고! one-to-one으로 만들면 무조건 eagerly fetch 하기때문에 좋지 않습니다. 

## 단상 05 : bulk insert 와 multi-insert는 다르다 

multi insert : `insert into table values (''),('')` 와 같이 한 쿼리로 여러개를 넣을 수 있는 것 

bulk insert : 여러 쿼리를 한번에 전송하여 실행할 수 있는 것 

mysql 에서 MySQL Batch Insert는 여러건의 insert 문을 insert into xxx (…) values(…), (…), (…)로 바꿔줌으로써 성능을 향상 시킬 수 있다.
MySQL JDBC의 경우 JDBC URL에 rewriteBatchedStatements=true 옵션을 추가해주면 된다.

## 단상 06: select 해서 insert 하기 
1:1 관계인 서브 테이블을 추가해서 기존걸 엎어칠때 유용하다. 예를 들어 user- 그리고 user-stat의 관계. 

```sql 
INSERT INTO user_preferences
    (id, created_date, modified_date, app_push_enabled)
SELECT id, created_date, created_date, 1 from user;
```
이번에는 user_preferences 에 넣었다. app_push_enabled는 1이 true다. 0이 더 순수하다는 느낌인데 헷갈리네.

## 단상 07: select 해서 update 하기 

이번에도 엎어쳐주는 역할. 
```sql 
UPDATE user
SET story_id = (select id from story where highlight=true and user_id = user.id)
```

## 단상 08: foreign key 를 여러개 걸어도 되나요?

일단 당연히 다른 테이블에 각각 foreign key 를 거는 것은 yes. 
의문은 조인테이블이나 중간테이블적 성격인 경우에 같은 테이블에 다른 칼럼으로 거는 경우가 있는데.. 둘다 걸어도 무방하다. column 명과 key 명을 다르게 주도록 유의하자. 

## 단상 09: left join 할 때는 1:N 으로 테이블이 뻥튀기 되는지 확인하자

on 과 where의 차이부터 알아보자. [참고](https://blog.leocat.kr/notes/2017/07/28/sql-join-on-vs-where)

sql 과 where는 조인의 범위가 다르다. 

아래 예시는 `on + where 쓰기와 on에 조건 두개 쓰기를 비교한 것이다.` 

```sql
# 1)
select * from a left join b 
on a.id = b.a_id 
where b.id = 11;
```
1) 은 a.id 와 b.a_id가 같은 left join 을 먼저 뽑고, 거기에서 b.id = 1  인 것을 필터링하는 것이다. 

```sql
# 2) 
select * 
from a left join b
on (a.id = b.a_id AND b.id = 11);
```

2) 는 a테이블 과 (b에서 id 가 11 인 테이블) 을 left join 한 결과로 나온다.

예시로 보면,

```
table a      table b
id | name    id | a_id 
1  | clever  11  | 1
2  | fast    22  | 2  
3  | charge
```

위의 테이블이 있을때, sql 결과 테이블은 
```
# 첫번째의 경우 
1 | clever | 11 | 1

# 두번째의 경우 
1 | clever | 11 | 1 
2 | fast   | null  | null
3 | charge | null | null 
```

으로 나온다.

## 단상 10: 차집합 구하기 

위 단상 9에서 논의했던 on과 where 의 차이를 이용해서 차집합을 구현할 수 있다. 
user를 가져오는데 userblock 테이블에는 없는 유저를 가져오고 싶다. 즉 `블락 당하지 않은 유저만` 가져오고 싶다. 

```sql 
select * 
from user left join userblock
on (user.id = userblock.user_id)
where userblock.user_id is null;
```

읭? 스럽지만 다시 예시를 보자. 

```
table user     table userblock
id | name      id | user_id
1  | nvr       11 | 1
2  | line      22 | 9
3  | kko       33 | 3 
4  | dum       44 | 10
```

위의 쿼리에서 where 전까지 적용하면 
```
1 | nvr | 11 | 1 
2 | line | null | null 
3 | kko  | 33 | 3 
4 | dum | null | null
```
으로 나온다. 여기에서 `userblock.user_id is null` 혹은 `userblock.id is null` 을 적용하면 

```
2 | line | null | null 
4 | dum | null | null
```
으로 userblock 에 없는 유저만 나오게 된다. 

따라서 on과 where을 활용해서 차집합만 구할 수 있게 된 것이다. 

이런 것을 `anti-join` 이라고 한다. 
팀원분이 던져주신 자료를 여기다가 적어두자.

https://planet.mysql.com/entry/?id=24888

## 단상 11 한 쿼리에서, 특정 값이 등장하는 횟수 세고 그걸로 비교하기 

아래 쿼리는 임의로 변형된 쿼리.
```sql 
select from member_id, sum(if(type='ONLINE', 1,0)),
sum(if(type='OFFLINE', 1,0))
from member group by member_id
having sum(if(type='ONLINE', 1,0)) < sum(if(type='OFFLINE'),1,0))
```
멤버에서 member id 로 group by 를 하는데, 
이때 online 인 횟수랑 offline 인 횟수를 센다. 
sum과 if로 ! 

그리고 offline 횟수가 더 큰걸 보여준다! 
새로운 테이블을 거의 만들어내는 개념. 

