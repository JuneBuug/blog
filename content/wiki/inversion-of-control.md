---
title   : 'Inversion Of control' 
slug  : '/ioc'
layout  : wiki 
excerpt : 
date    : 2020-06-30 11:48:27 +0900
updated : 2024-07-04 19:56:47
tags    : 
   - Term 
   - Spring
---

## 제어의 역전 
Spring 을 처음에 배울 때 마주하는 개념이 IoC(Inversion Of Control) 혹은 DI(Dependency Injection)이다. 컴퓨터 용어는 전반적으로, 아는 사람이 보면 기가 막힌 용어지만 한눈에 알아보기는 어렵게 만들어진 것 같다. 이 역시 대표적인 사례이다. 

[johngrib님의 블로그](https://johngrib.github.io/wiki/inversion-of-control/)를 복습차원에서 보다가 다시 이 개념을 마주했다. IoC를 가장 잘 설명한 것 토비의 스프링 3.1 의 구절이다. 

> 제어의 역전이라는 것은, 간단히 프로그램의 제어 흐름 구조가 뒤바뀌는 것이라고 설명할 수 있다. 일반적으로 프로그램의 흐름은 main() 메소드와 같이, 프로그램이 시작되는 지점에서 **(직접)** 다음 사용할 오브젝트를 결정하고, 결정한 오브젝트를 생성하고, 만들어진 오브젝트에 있는 메소드를 호출하고, 그 오브젝트 메소드 안에서 다음에 사용할 것을 결정하고 호출하는 식의 작업이 반복된다. 이 구조에서는 각 오브젝트는 프로그램 흐름을 결정하거나 사용할 다른 오브젝트를 구성하는 작업에 능동적으로 참여한다. 

> 제어의 역전이란 이런 제어의 흐름 개념을 거꾸로 뒤집는 것이다. 제어의 역전에서는 **오브젝트가 자신이 사용할 오브젝트를 스스로 선택하지 않는다.** 당연히 생성하지도 않는다. 또 자신도 어떻게 만들어지고 어디서 사용되는지를 알 수 가 없다. 프로그램의 시작을 담당하는 엔트리 포인트를 제외하면, 모든 오브젝트는 이렇게 위임받은 제어권한을 받은 특별한 오브젝트에 의해 결정되고 만들어진다. 

## 프레임워크와 라이브러리의 차이 

위 토비의 스프링 3.1 에서 이어진다. 

> 프레임워크도 제어의 역전 개념이 적용된 대표적인 기술이다. 프레임워크는 라이브러리의 다른 이름이 아니다. 추상 라이브러리의 집합이 아니다. 

> 라이브러리를 사용하는 애플리케이션 코드는 애플리케이션 흐름을 직접 제어한다. 단지 동작하는 중에 필요한 기능이 있을 때 능동적으로 라이브러리를 사용할 뿐이다. 반면에 프레임워크는 거꾸로 애플리케이션 코드가 프레임워크에 의해 사용된다. 보통 프레임워크 위에 개발한 클래스를 등록해두고, 프레임워크가 흐름을 주도하는 중에 개발자가 만든 애플리케이션 코드를 사용하도록 만드는 방식이다.  

## 유닉스 도구도 IoC일 수 있다 
> 프로그램은 입력이 어디서부터 들어오는지 출력이 어디로 나가는지 신경 쓰거나 알 필요조차 없다. 이런 형태를 느슨한 결합이나 또는 제어반전(inversion of Control) 이라고 한다. 프로그램에서 입출력을 연결하는 부분을 분리하면 작은 도구로부터 큰 시스템을 구성하기가 훨씬 수월하다. 

## 스프링의 IoC 

> 스프링에서는 스프링이 제어권을 가지고, 직접 만들고 관계를 부여하는 오브젝트를 빈(bean)이라고 부른다. 자바빈 (..중략..) 과 비슷한 **오브젝트 단위의 애플리케이션 컴포넌트**를 말한다. 

나는 여기에서 `@Service` `@Controller` `@Component` 태그가 생각났다. 저 안을 다 들여다보면 컴포넌트로 구성되어있음. 콩(ㅎㅎㅎ)을 어디에 배치하고 어떻게 연결할지의 문제임 

> 스프링에서는 빈의 생성과 관계설정 같은 제어를 담당하는 IoC 오브젝트를 빈 팩토리라고 부른다. 보통, 이보다는 이를 좀더 확장한 애플리케이션 컨텍스트를 주로 사용한다. 

맨날 테스트에서 깨먹는 =) 바로 그거! 애플리케이션 컨텍스트다. 사실 IoC 컨테이너 였고 bean을 어떻게 설정할 지 꽂아주는 역할이라니.. 

> 애플리케이션 컨텍스트는 별도의 정보를 참고해서 빈의 생성, 관계설정 등의 제어 작업을 총괄한다. 기존 코드에서는 설정 정보, 예를 들어 어떤 클래스의 오브젝트를 생성하고 어디에 사용하도록 연결해줄 가가 모두 담겨있다. (...) 애플리케이션 컨텍스트는 직접 이런 정보를 담고 있진 않다. 대신 별도로 설정을 담고 있는 무엇인가를 가져와 이를 활용하는 범용적인 IoC라고 할 수 있다. 

`@Configuration` : 애플리케이션 컨텍스트 또는 빈 팩토리가 사용할, 설정 정보라는 표시 
- 설정 정보는 빈이 정의되어있는 걸수도 있고 
- 빈들이 어떻게 관계를 맺는지 알려주는 걸수도 있고! 

## 처음 스프링으로 제어의 역전을 접했다면.. 

그냥 java 코드로도 IoC 를 구성할 수 있다. 

- 주문 서비스 
- 할인 정책 interface

AS-IS) 처음에는 주문서비스에서 어떤 할인 정책 구현체를 쓸 지 결정했다. 
그러다보니 구현체를 바꿔야하는 상황에서는 서비스에서 직접 주석처리하고 새로운 값을 넣어줘야했다. 
하는 일은 똑같은데 구현체를 내가 직접 바꾼다. 
마치, 배우인데 섭외도 하고 연기도 하는 상황 

TO-BE) 이후에는 AppConfig 라는 값을 만들어서 무조건 여기서 반환한 형태의 인스턴스만 사용하도록한다. 
어떤 할인 정책을 쓸지는 AppConfig에서 만들어진 생성자에서 정해지며, 
주입도 이때 정해진다. 
주문 서비스 입장에서는 나는 인터페이스만 (즉, 명세만) 보면되고 실제 누가오는지 모르니까 
어떤 로미오가 오든 줄리엣은 연기만 하면 된다. 

이런 AppConfig를 요즘엔 어셈블러라고 부르기도 한다. 

## Spring 에서 Application Context

- 주입할 Bean 을 관리해주는 건 Bean Factory 
- 이걸 상속해서 사용하는게 Application context 
  - 국제화 message
  - 리소스 접근 관리
  - profile 설정
  - 애플리케이션 이벤트
  - 위 기능을 추가로 지원함!

## 생성자 주입을 선택해라! 

- 불변성 때문에
  - 의존관계가 변하는 것은 좋은 것이 아니다.
  - 수정자를 사용하면 public 으로 열어둬야한다. 
  - 누군가 실수로 사용할수도있는 수정자를 열어두는 것은 위험하다.
  - 생성자 주입은 객체 생성 시 1번만 호출되므로 불변하게 설계할 수 있다.

- 실수방지 
  - 수정자 주입을 사용하면, 밖에서 테스트를 할 때 어떤 것을 넣어야하는지 보이지 않기가 쉽다
  - 생성자 주입을 사용하면 생성 시점에 바로 알려준다.

- 멤버 변수에 final 을 넣을 수 있음
  - 그러면 생성자! 에서만 주입하도록 변경된다.
  - 그러면 생성자에서 누락해도 컴파일 오류로 잡아줌.

누락, 실수 방지가 용이하고 가장 java 스럽게 짜는 방법임.

## 참고 
https://johngrib.github.io/wiki/inversion-of-control/

데이터중심어플리케이션설계, 393p, 마틴 클레프만, 위키북스  

토비의 스프링, 95p, 이일민

스프링 핵심원리 - 기본편, IoC, DI, 그리고 컨테이너, 김영한, 인프런 
