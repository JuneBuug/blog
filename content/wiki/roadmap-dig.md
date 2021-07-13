---
title   : '로드맵 파헤치기' 
slug  : '/roadmap-digging'
layout  : wiki 
excerpt : 
date    : 2020-12-31 17:12:58 +0900
updated : 2021-07-13 13:46:56
tags    : 
---

## 서론 
roadmap 을 보면서, 내가 아는 것도 어렴풋이 알고 있고 모르는 건 아주 화끈하게 모른다는 점을 알게 되었다. 

머릿속에 정리가 안되는 찜찜한 상태로 있기 보다는, 일단 위키를 만들어서 써내려가기로 했다. 


### 인터넷이 무엇인가요? 
레퍼런스 없이 생각해봤을 때.. internet 이라는 이름부터 파고 들어보자. internet, net 은 여기서 network 이다. 네트워크는 노드와 엣지로 이루어져 정보를 교환하는 '망'을 의미한다.(net) inter-net 은 이 네트워크끼리 소통하는 더 커다란 의미의 네트워크를 의미한다고 볼 수 있다. 

소비자 입장에서 생각해보면 인터넷은 타인의 노드(device)에 브라우저를 통해서 자유롭게 접근하는 망을 의미한다. 이 노드 간 연결은 어떻게 되냐고? 레이어를 쭉 타고 내려가야겠지만 일반적인 인터넷 연결은 TCP-IP를 지나... 노드간에 전송인 transport layer? - data layer - physical layer 까지 거쳐서 정보를 전송한다. 


### Spring이 무엇인가요? 
스프링은 복잡한 엔터프라이즈 애플리케이션을 효과적으로 개발하기 위한 기술이다. 

### JavaBean 
아래 두가지 관례에 따라 만들어진 오브젝트
- 디폴트 생성자: 자바빈은 파라미터가 없는 디폴트 생성자를 갖고 있어야 한다. 툴이나 프레임워크에서 리플렉션을 이용해 오브젝트를 생성하기 때문에 필요하다.
- 프로퍼티: 자바빈이 노출하는 이름을 가진 속성. getter, setter

### Spring의 Bean, BeanFactory
- 빈 :  스프링 컨테이너가 생성, 관계설정, 사용 등을 제어해주는 제어의 역전이 적용된 오브젝트
- 빈팩토리:  빈 생성, 관계설정 같이 제어를 담당하는 IoC 오브젝트
- application context : 빈 팩토리를 확장한 IoC 컨테이너, 빈 팩토리의 기능 + 스프링이 제공하는 각종 부가 서비스를 추가로 제공
빈 팩토리라고 부를 때는 주로 빈 생성과 제어의 관점, 애플리케이션 컨텍스트라고 할 떄는 스프링이 제공하는 애플리케이션 지원 기능을 포함하는 것
ApplicationContext는 BeanFactory를 상속

### 상속이 반드시 좋은 방법이 아닌 이유 
상속을 통한 상하위 클래스의 관계는 생각보다 밀접해있어 다른 관심사 간 긴밀한 결합을 허용한다.
상속을 통해 만들어진 구현체가 중복을 발생시킬 수 있다.

### IoC (Inversion of Control) 
제어의 역전이란 이런 제어 흐름의 개념을 거꾸로 뒤집는 것이다. 즉 오브젝트가 자신이 사용할 오브젝트를 스스로 선택하지 않는다! 당연히 생성하지도 않는다. 모든 제어 권한을 다른 대상에게 위임하기 때문이다. 예를 들어, 서블릿을 개발해서 서버에 배포할 수 있지만 서블릿의 실행을 직접 제어할 수 있는 방법은 없다.
프레임워크도 제어의 역전 기술이 적용된 대표적인 기술이다. 흔히 라이브러리와 혼동하고는 하는데, 큰 잘못이다. 우리는 라이브러리를 능동적으로 사용한다. 반면 프레임 워크는 거꾸로 애플리케이션 코드가 프레임워크에 의해 사용된다.
즉 우리는 스프링 없이도 작은 IoC 프레임워크를 사용한 셈이다. 제어의 역전에는 프레임워크 혹은 컨테이너와 같이 애플리케이션 컴포넌트의 생성과 관게설정, 생명주기 관리 등을 관장하는 존재가 필요하다. 단순한 적용이면 우리의 예제로 충분하지만, 애플리케이션 전반에 IoC를 사용하고 싶다면 스프링과 같은 IoC 프레임워크의 도움을 받는 편이 유리하다. 🦦

### Singleton 
어떤 클래스를 애플리케이션 내에서 제한된 인스턴스 개수(1개)만 존재하도록 강제
private 생성자를 갖고 있기 때문에 상속할 수 없다
객체지향의 장점인 상속과 이를 이용한 다형성을 적용할 수 없다. 기술적인 서비스만 제공하는 경우라면 상관없지만 애플리케이션 로직을 담고 있는 일반 오브젝트의 경우 싱글톤이 되면 객체지향의 장점을 적용하기 어렵다.
싱글톤은 테스트하기 힘들다(큰 단점)
싱글톤으로 되어 있어 테스트할때 mock 오브젝트로 대체하기 힘들기 때문에 직접 다 만들어서 사용할 수 밖에 없는데 이런 경우 테스트 오브젝트로 대체하기 어렵다.
서버 환경에서는 싱글톤이 하나만 만들어지는 것을 보장하지 못한다.
클래스 로더를 어떻게 구성하고 있느냐에 따라 싱글톤 클래스임에도 하나 이상의 오브젝트가 생길 수 있음. 여러 JVM에 분산되어 설치되는 경우에도 각각 독립적으로 오브젝트가 생기기 때문에 싱글톤으로서의 가치가 떨어짐
싱글톤의 사용은 전역 상태를 만들 수 있기 때문에 바람직하지 못하다
싱글톤은 사용하는 클라이언트가 정해져있지 않고 스태틱 메서드로 언제든지 접근할 수 있기 때문에 자연스럽게 전역 상태로 사용되기 쉽다. 아무 객체나 자유롭게 접근하고 수정하고 공유할 수 있는 것은 객체지향 프로그래밍에서는 권장되지 않는 모델이다.

### 템플릿 메소드 패턴


#### 데이터베이스 인덱스와 동작 방식 
#### NoSQL 
#### Data Replication 
#### OAuth / Basic Auth / Token Auth / JWT
- oauth 흐름
- jwt 개선
- 인증 토큰과 세션을 통한 인증방식
#### HTTPS / CORS / SSL /TLS / OWSAP Security RISKS
#### MD5 (왜 사용하면 안되는지) SHA family

#### Caching - CDN / Redis 
#### Testing - Integration Test / UnitTest / Functional Test 
#### SOLID / KISS / YAGNI / DRY 
#### Monolithic / Microservices / SOA / SOA / Serverless

#### ElasticSearch 

#### Kafka (메시지 브로커로서) 
#### Docker / kubernetes / 가상화 

#### mitigation strategy ( 경감 전략) 
- Graceful Degradation
- Throttling
- Backpressure
- LoadShifting
- Circuit breaker

#### Nginx 
- nginx 로드밸런싱? 

#### Checked Exception / Unchecked exception 
#### 영속성 컨텍스트 - JPA (/hibernate) 
- n+1 문제 
- open session in view
- @Transactional 동작과정 
- JPA fetch type
  
#### 무중단 배포방식 
- Blue - green 배포 

#### spring interceptor / filter 

(아래는 특정 블로그에서 참고한 질문들입니다.)
#### MVC 패턴에 대해서 설명해주세요.
Model - View - Controller
DB에 저장되며 - 도메인을 코드화한 Model, 사용자에게 보이는 부분인 View, 이 두개의 매개가 되어주는 Controller 


#### 데이터베이스 정규화 과정에 대해 설명해주세요.
- 제 1정규화 
  key 에 다른 모든 column 들이 종속적이지 않도록 하는 것 
  A -> B / A -> C 인 것들을 모두 제거 
  
- 제 2정규화 
  key 에 다른 모든 column 들이 이행-종속적이지 않도록하는것 
  A (key) -> B -> C 인 column 제거 

- BCNF .. ? 
 

#### 자바 컬렉션 종류와 특징에 대해 설명해주세요.
- ArrayList
  - 순서가 있고, 중복 허용, 인덱스를 통한 랜덤 액세스
- Set
  - 순서가 없고, 중복을 허용하지않음. 랜덤 액세스 불가능

- Map (HashMap) 
  - key-value 구조의 저장방식, key를 통한 액세스 가능 
  - Hashmap은 hashtable을 통한 저장방식을 지원 
  

#### 정렬의 종류 및 특징을 설명해 주세요.
  - bubble sort, insertion, quick sort, selection sort, merge sort
  

####  WAS의 동작방식에 대해서 설명해주세요.
 
####  자바의 메모리 영역에 대해 설명해주세요.
 
 - JVM 메모리 - heap, java stack, class, native method
 - 여기에서 gc를 하고 인식하는 메모리 영역은 힙 
  
 - heap 에서 young / old / perm (permanent 로 나뉘게됨) 
   

####  객체지향 프로그래밍에 대해 설명해주세요.
- 프로그래밍에서 필요한 데이터를 추상화시켜 상태와 행위를 가진 객체를 만들고 그 객체들 간의 유기적인 상호작용을 통해 로직을 구성하는 프로그래밍 방법



#### 세션과 쿠키를 사용하는 이유는 무엇일까요?
  - ..? 세션... 이미 authorized 된 커넥션에 대해서 여러개의 커넥션을 쓰지않고 절약할 수 있어서..? 
  - 세션과 마찬가지이지만 클라이언트 사이드에서 사용할 수 있고 간단한 local storage 의 역할을 수행 


#### Interface와 Abstract에 대해 말해주세요.
  - abstract 부터 설명 
    - 구체적인 구현이 없는 명세에 해당하는 메소드 (혹은 클래스) 에 부여하는 
      accessor..? 
  - abstract class는 abstract method가 하나라도 있는 클래스를 말하고, 구체적인 메소드가 있어도됨 
  
  - interface는 모든 메소드가 추상메소드의 형태를 띄는 클래스를 의미. 
    
#### 디자인 패턴을 아십니까?
#### TDD를 해보셨습니까?
#### TCP 와 UDP 의 차이점은 무엇일까요?
  - tcp : 안정성, 순서보장(3-handshake, 4-handshake) 많은 어플리케이션이 tcp 기반 
  - udp: 속도가 빠름, 순서보장이 안됨, 주로 VoIP 
  

#### OSI 7계층에 대해 아는대로 말해주세요.
 - physical / data link / network layer / transport layer / session layer / presentation layer  / application layer 

#### 스트링과 스트링버퍼의 차이에 대해 설명해주세요.

#### 자바의 데이터 타입인 Primitive Type(기본형) 에 대해 말해보세요.
  int / float / double / long /short ? 
  
  object를 상속한 객체타입이 아니기때문에 null을 받을 수 없지만, wrapper class를 unbox 하는 과정이 없기때문에 
  연산속도가 빠르다! 
  
#### 접근제어자의 종류와 특성에 대해 설명해보세요.
  - public / protected / private 
  - 모든 class / 같은 패키지 / 같은 클래스 
  
#### 쓰레드를 구현하기 위한 인터페이스, 클래스는 무엇이 있나요?

#### static 키워드에 대해 설명해주세요.
- 인스턴스가 공유하는 것이 아닌 class 레벨에서의 값들을 지정할 때 사용하는 키워드? 
  - 필드일수도, 메소드일수도 있음

#### 자바 코드의 실행 과정을 설명해주세요.
컴파일 (.class) -> 메모리 로딩 -> jvm 메모리에 올려짐 (heap / stack / native / class) 
함수가 실행될때마다 stack 에 저장되며 할당할 때마다 heap 을 사용하여 실행됨? 

#### 오버로딩과 오버라이딩에 대해 설명해주세요.
- 오버로딩 : 같은 함수명, 다른 메소드 시그니처가 가능한 것 
- 오버라이딩 : 상속에서 부모 클래스의 함수를 재정의해서 사용하는 것 


#### 쓰레드와 프로세스의 차이는 무엇일까요?
- 프로세스 
  - 실행되고 있는 컴퓨터 프로그램 자체 
  - 
- 쓰레드 
  - 프로세스에서 실행되고 있는 흐름
  - 프로세스 내에서 공유 / 비공유 파트가 있고, 병렬 실행 
    - stack만 비공유 
    - code / data / heap 은 공유 


#### 해시테이블에 대해 설명해주세요.
값을 효율적으로 저장하는 자료구조 중 하나. 
key-value 구조 
특정한 함수(해시 함수)
bucket 


#### 데이터베이스 트랜잭션이란 무엇인가요?
트랜잭션 (ACID)

#### JVM, JRE, JDK 를 설명해주세요.
java virtual machine (환경)
java run env
java development kit 
- 자바 클래스 라이브러리(Java class libraries)와 자바 클래스 로더(Java class loader), 자바 가상 머신(Java Virtual Machine)이 포함된다.

#### final 키워드에 대해 설명해주세요.
변수의 상수화 (modification 불가능)



#### API 에 대해 설명해주세요
무슨 API 지.. java api ? 
API를 사용하면 구현 방식을 알지 못해도 제품 또는 서비스가 서로 커뮤니케이션할 수 있으며 애플리케이션 개발을 간소화하여 시간과 비용을 절약할 수 있습니다. 새로운 툴과 제품을 설계하거나 기존 툴과 제품을 관리하는 경우 API는 유연성을 제공하고 설계, 관리, 사용 방법을 간소화하며 혁신의 기회를 제공합니다. 




## 출처 

[자바면접질문: https://mellowp-dev.tistory.com/4](https://mellowp-dev.tistory.com/4)
https://jeong-pro.tistory.com/95 
https://www.itworld.co.kr/news/110768
https://www.redhat.com/ko/topics/api/what-are-application-programming-interfaces
https://smjeon.dev/etc/interview-question/

