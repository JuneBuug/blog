---
slug    : '/transient'
title   : 'transient : 두가지 사용례, 비슷한 의미'
banner	: ./thumb.png
excerpt : 'java에서도, JPA에서 볼 수 있다'
date    : 2020-04-05 09:29:57 +0900
updated : 2020-08-11 14:11:45
tags     : 
  - JPA
  - Java
---

## 서론
  프로젝트에서 Transient 를 Entity에서 사용하게 되었습니다. 그러다 `직렬화` 중 필드를 무시하려고 사용하는 키워드 transient, 그리고 `Entity`에서의 annotation `@Transient`의 차이를 깨달아 정리해보려고합니다. 

## Transient에 대한 두가지 정의 
 Transient는 '일시적인, 잠시 체류하는' 이라는 뜻을 가진 영단어입니다. 그래서 처음 이 키워드를 보았을 때는 조금 의아했습니다. 도대체 뭐가 **일시적** 이라는 걸까요? 
 
 이 궁금증을 해결하기 위해 transient java를 검색하면, 수많은 검색 결과가 뜹니다. 그 중에서 눈을 사로잡는 결과는 이것입니다. 

  > transient 는, Java에서 직렬화 시 특정 멤버변수를 무시하고 싶은 경우 사용하는 키워드입니다.

  조금 스크롤를 내려 보니.. Transient 의 또다른 사용례가 눈에 띕니다. 
  > ... @Transient 를 사용하면 entity에서 필드가 생성되지 않습니다.  

같은 명칭이고 같은 java를 사용하는데, 다른 형태로 쓰이고 있습니다. (하나는 예약어, 하나는 어노테이션이죠. 😮) 또한 다른 기능을 하는 것 같습니다. 이에 대한 빠르게 두 가지의 차이를 짚고 넘어가도록 하겠습니다 🙆‍♀️

### java의 keyword로서의 transient 

처음의 transient에 대해서는 이 [블로그](https://epicdevsold.tistory.com/162) 를 인용해보겠습니다. 

> 일반적으로 transient 는 자바에서 멤버변수가 serialization(직렬화)가 되는 것을 막는 것이라고 알려져있습니다 ... 그러나 이게 하나의 프로그래밍 언어에서 키워드 수준의 중요성인가? 라는 의문이 들었습니다. 

직렬화에 대해서는 [여기](https://juneyr.dev/2018-08-23/serialize) 를 참고하세요.

아, 그러니까 직렬화해서 어딘가에 전송할 때는 필요가 없는 경우, 이 멤버 변수를 **일시적**으로 사용한다는 의미에서의 transient 입니다. 실제로는 바깥에 노출되지 않는 멤버변수이고, 계속 사용되지 않으므로 나름 이 단어는 적절해보입니다. 

더불어 위의 블로그에서 저자는, transient 라는 값은 본질적으로 `이 값은 메모리 안에서만 사용되어야한다` 라는 의미를 기억하라고 말해줍니다. JVM이 아닌 다른 VM 에서는 다르게 정의될 수 있다면서요.

### JPA annotation으로서의 @Transient 

TL;DR; 
@Transient 는 필드를 DB에 저장하지 않도록 해줍니다. 엔티티에서만 볼 수 있습니다. 

간단하게 JPA 개념을 요약해봅시다. 객체 지향 프로그래밍에서, 사람들은 현실세계의 도메인을 객체로 투사하기 시작합니다. 사람이라는 현실의 존재를, 필요한 관점에서만 뽑아서 Person 클래스로 만들고요, 그 안에 때에 따라 원하는 변수를 관리해서 프로그래밍을 시작합니다. 그런데 이렇게 만들어진 클래스, 그리고 객체는 DB가 세상을 바라보는 방식이랑 많이 다릅니다. 객체 지향에서 주요하게 쓰는 상속이라는 개념도 DB에는 없고요, 객체는 다른 객체를 품을 수 있지만 테이블은 한 테이블을 포함할수는 없죠! (foreign key 로 참조할 수 있게할 뿐입니다.)

객체를 영원히 메모리에만 올려놓고 쓸 수 없으니, DB에 저장해야합니다. (영속화) 그런데 위에서 말한 차이때문에 바로는 사용할 수 없습니다. 과거에는 클래스 필드에 맞게 쿼리를 작성해서 넣었는데요. ORM 이 등장하면서 이 부분을 좀더 수월하게 만들어줍니다. 즉, Object-Relational Mapping이라는 말에서 볼 수 있듯이, 그냥 클래스만 작성하면 관계형 데이터베이스에 맞게 변경해줍니다. 

hibernate 는 이런 ORM 규약중 하나이고, JPA는 대표적인 hibernate의 구현체입니다. 그러니까, JPA는 ORM입니다. 

그럼 다시 돌아와서, hibernate 패키지에 있는 `@Transient` 정의를 볼까요? 

![persistence](./persistence.png)

> Specifies that the property or field is not persistent. It is used to annotate a property or field of an entity class, mapped superclass, or embeddable class.

persistent 하지 않은 속성이나 필드를 지정합니다. 이 어노테이션은 엔티티 클래스, mapped super 클래스, embeddable 클래스에선의 속성이나 필드에 사용될 수 있습니다. 

persistent 하지 않다는 말은, DB에 실제로 저장되지 않는다는 것입니다. 이 역시 위에서 말했던 `메모리에서만 사용된다` 그러므로 **임시**이다, 라는 개념과 일맥상통하네요. 이 값을 사용하면 엔티티에서만 필드를 사용할 수 있습니다. 

#### fetch 할 때 주의하세요! 

이번 프로젝트에서는 `@Transient` 를 이렇게 사용했습니다. 어디에나 사용하는 User entity가 있는데, Post entity 와 양방향 관계는 맺기 싫습니다. 그런데 `최신 post가 있는 유저 리스트, post 최신순` 이라는 요구사항이 생겼습니다. 이 때, 정렬을 해야하므로 post Id를 User 에 넣는 결정을 합니다. (**주의** 이 방법말고, 요구사항이 더 적으면 구현은 얼마든지 다르게 할 수 있습니다 😭)

```java
@Entity 
public class User {

  private Long id; 

  private String userName; 
  
  @Transient
  private Long postId;
}

@Entity 
public class Post {

  @CreatedBy
  private User user; 

  private String description; 
}
```

이렇게 하면, JPA repository 에서 다음 쿼리로 갖고 올 수 있을 것 같습니다. 

```java

List<User> findAllAndOrderByPostIdDesc();
// postId는 createDate과 양의 관계를 갖습니다. 즉 최신일수록 Id가 큽니다. 
```

그러나 이렇게 하면 오류가 발생합니다. postId는 DB 에서 fetch 가 불가능한 값이므로, 어디에도 저장되어있지 않거든요. postId를 알고 싶다면 
 - 다시 한번 쿼리를 날린다음, user에 맞게 넣어주거나
 - 애초에 inner join 과 where로 적절한 값을 투사하는 쿼리를 날려야합니다. 

그러니, transient 는 보통 DB에서 다시 fetch 해올 일이 없는 필드에 사용하는 것이 좋은 사용례라고 할 수 있습니다. 

### 결론 

이리저리 보다보니, 저말고도 [스택오버플로우 글](https://stackoverflow.com/questions/2154622/why-does-jpa-have-a-transient-annotation)에서 명쾌한 답을 내려줍니다. `transient` 는 직렬화의 관점에서, `@Transient` 는 영속성(persistence)의 관점에서 말하는 것이라구요. 그래도 그 단어의 뜻과 사용에는 꾸준한 경향성이 있으니, 한번쯤 지나가면서 가볍게 생각해보는 것도 좋겠습니다.


## 참고 
[프로그래밍로그 블로그](https://epicdevsold.tistory.com/162)
[stackoverflow](https://stackoverflow.com/questions/2154622/why-does-jpa-have-a-transient-annotation)
  
  
