---
title   : 'Spring Cloud 란' 
slug    : '/spring-cloud-basics'
layout  : wiki 
excerpt : 'Spring cloud 역할 알아보기' 
date    : 2021-09-09 07:31:45 +0900
updated : 2021-09-10 06:41:12
tags : 
- Spring
- Spring Cloud
---
## Spring Cloud 가 하는 역할
분산시스템을 개발하는 것 자체가 어렵다. 네트워크 레이어~ 어플리케이션 레이어까지 다양한 복잡성이 있고, 코드를 `클라우드 네이티브`하게 만든다는 것 자체가 12 가지를 고려해야한다는 것을 의미한다. 
Spring Cloud는 클라우드에서 어플리케이션을 실행하는데 필요한 많은 서비스를 제공한다. 
![spring cloud architecture highlights](https://spring.io/images/cloud-diagram-dark-b902fd07e60945a9a8930ca01f86bdf3.svg)

Components
- Service Discovery 
- API gateway
- Cloud configuration
- Circuit breakers
- Tracing
- Testing
+) 
- Routing and messaging 
  cloud service가 서로 소통할 수 있게함. 
+ Bus/ Stream / Data and Task.. 여러개 더 있음.

## 왜 Spring Cloud? 
- Big Company 는 cloud service 하기 쉽지만.. 몸집이 작은 회사는? 
- cloud agnostic (실제로 어떤 cloud 에서 jar /war가 돌아가는지 신경쓰지않음) 
### Service Discovery
클라우드에서는, 어플리케이션이 다른 서비스가 `어디에` 있는 지 알 수 없는 경우가 있다. 서비스 레지스트리 (서비스가 어디에 위치해있는지알려주는 저장소) 가 도움이 될 수 있는데, Spring Cloud는 이런 Service registry 서비스를 구현하기 위한 `DiscoveryClient` 를 제공한다. 
e.g.) Eureka, Consul, Zookeeper, Kubernetes built-in System 

부하를 분산하기 위한 `Spring Cloud Load Balancer` 도 있음! 

+) 
Region / Location / URL ? 계속 dynamic하게 바뀌는 서비스 환경. 현재 current URL / how many instances / status / 등을 알려주는 모든게 service discovery. 
제일 잘ㅆ느느게 eureka?

### API Gateway 

하나의 시스템에 참여하는 클라이언트와 서버가 너무 많으면, `API gateway`를 도입하는게 도움이 된다. `gateway`는 메시지 보안과 라우팅을 관리하고, 서비스를 한단계 감싸서 숨기며, 쓰로틀링으로 부하를 줄여준다. `Spring Cloud Gateway` 는 API 레이어를 세세하게 설정할 수 있고, 위에서 말한 Spring Cloud service discovery 나 client 쪽의 로드밸런싱 방법과 결합하기 쉽다. 

하나의 gateway로 뒤에 복잡한 micrcoservice 더미를 숨길 수 있음.

### Cloud Configuration 
Cloud 사업자가 얼마나 많은데 그걸 일일히 설정하고 있어!! 클라우드에서는 어플리케이션 안에 단순히 설정이 들어가있게 만들 순 없다. 설정 자체가, 여러 어플리케이션/환경/ 서비스 인스턴스에 대응할 수 있도록 플렉서블해야하기때문에. `Spring Cloud config` 는 이런 고통 😇 에 대응할 수 있도록 해준다.  + Git 같은 버전 컨트롤 까지? 

+) Cloud env에서는 configuration 자체를 밖으로 빼는게 좋다. application 하나의 값을 바꾸고 싶은데 모두 다시 빌드하고 다운타임을 감내하고 그럴 건 아니니까. congifuration server를 갖는게 맞음. config server는 config 를 거의 무한히 저장할 수 있지만, 일단 버전 컨트롤을 해준다는 점도 짚고 싶다. config client는 application 이 시작할 때 가져오고, configuration 이 업데이트되면 client가 notify 하거나 server가 알려줄 수 있다는 장점이 있음.

### Circuit Breaker 
분산시스템은 믿을 수 없다 =) ㅎㅎㅎ... Request를 날리면, 타임아웃이나 완전 fail 하는 경우가 있을 수 있다. Circuit Breaker 는 (중간에 연결을 끊어버리면서) 이런 이슈가 퍼지지 않게 하고, 영향을 경감할 수 있도록한다. 장애로부터 보호! 

`Spring Cloud Circuit Breaker`를 한번 드셔보세요! 세가지 옵션이 있답니다! 
- Resillence4J
- Sentinel
- Hystrix 
  
### Tracing 
분산시스템에서 버그 트레이싱을 어떻게함..? 분명 엄청나게 힘들고 복잡한 일일거야... =) 
만약 장애가 발생하면, 여러 군데 로그로 남아있는 정보의 파편을 모아서 이게 도대체 어떻게 된 일인지 분석할 필요가 있다. 그런데 그 로그가 독립서비스에 퍼져있고 하나의 사건에 대한 일인지도 모르겠음 =) 이게 탐정이야 개발자야 

그런 당신 `Spring Cloud Sleuth`를 드셔보세요! 
어플리케이션을 예상가능하고, 반복가능한 방식(아마 장애 상황을 재현해볼 수 있다는 ?) 으로 만들어드립니다! `ZipKin` 까지 쓰면 latency 문제도 없다고요!

### Testing 
Cloud 에서는 믿을 수 있고 안전한 API를 만들 수 있다는 장점이 있지만, 그 목표까지 도달하는게 오래걸린다. =)... 어떤 팀은 Contract 기반의 testing을 이용하기도하는데, 이는 API 의 내용을 포말하게 만들어줄 아니라 코드의 정합성을 체크하기 위한 테스트를 만들어주기도 한다. 

당신도 하고 싶다고요? `Spring Cloud Contract`을 드셔보세요! 
`Spring Cloud Contract`은 REST 와 메시지 기반 API 를 모두 지원하는 contract 기반 테스트 지원툴입니다. (contract은 groovy, java, kotlin으로 작성가능) 


## 참고 
[The Beginner’s Guide To Spring Cloud - Ryan Baxter](https://www.youtube.com/watch?v=aO6W-lYnw-o)
[https://spring.io/cloud](https://spring.io/cloud)
