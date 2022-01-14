---
layout  : wiki
title   : 'hibernate exception이 발생하면 알아서 clear 해주지 않는다' 
slug : '/hibernate-exception-does-not-flush'
date    : 2022-01-13 17:53:18 +09:00
updated : 2022-01-14 14:56:43
tags     : 
- JPA 
---


## 서론 
`null id in entry (don't flush the Session after an exception occurs)`
에 봉착했다. 구글의 검색기록을 보니 이미 한번 검색해봤던 것 같은데... 기억이 나지 않는다. 


## 전제

항상 가져오는 `Member` entity가 있다고 해보자. 필요한건 다 있다. 
member 를 저장하다가, **hibernate exception** 이 발생했다.
제일 자주 마주하는 unique constraint 를 만족시키지 못했다고 생각해보자.

이때 나는 이렇게 try-catch를 한다. 

```java

try {
	memberRepository.save(Member.builder().name("member").build());
} catch (DataIntegrityViolationException e) {
  log.info("hibernate exception 발생 e={}",e);
  throw e;
}

```


이렇게 하고, 자연스럽게 두번 저장하는 테스트를 작성한다. 

```java

@Test
void member_duplicate_saves() {

   // given,  member 저장 
	
   memberService.save();
	
	
   // when & then
	
    assertThrows(() ->  memberService.save());
	
	memberRepository.findByName("member"); // error occurs !
	
	
	
}


```

이 테스트에서 find 를 하려고할 때, `null id in entry (don't flush the Session after an exception occurs)` 오류가 발생했다. 

## 왜?  hibernate exception 이 일어나면 자동으로 세션을 clear 해주지 않는다 

사실, 이 에러는 실제 `findByName`  가 원인이 아니다. 

- 두번째로 저장을 시도할 때, hibernate exception인 `DataIntegrityViolationException` 이 발생함 
- JPA save가 실패하고, 세션이 초기화 되어야함 
- 하지만 hibernate는 exception 이 발생했다고해서 **세션을 초기화 / clear 해주지 않는다** 
- 따라서, 두번째 저장을 시도했던 entity는 detached 상태로 세션에 남아있고.. 다음 flush 시점에서 이것이 오류로 남는다 (entity가 있는데, id가 null 입니다!)


## 테스트에서 해결한 방법 

`@Autowired`  로 `TestEntityManager` 를 가져왔다. 
그리고 두번째에 `entityManager.clear()` 를 추가했음. 
이렇게 해서 엔티티 매니저에는 미완상태의 detached entity가 없게 되는 것 같다. 


```java

@Test
void member_duplicate_saves() {

   // given,  member 저장 
	
   memberService.save();
	
	
   // when & then
	
    assertThrows(() ->  memberService.save());
	
	entityManager.clear();
	
	memberRepository.findByName("member"); // error does not occur !
	
	
}
```



## 참고 

https://stackoverflow.com/questions/10855542/org-hibernate-assertionfailure-null-id-in-entry-dont-flush-the-session-after

https://stackoverflow.com/questions/57260881/hibernate-dont-flush-the-session-after-an-exception-occurs-problem
