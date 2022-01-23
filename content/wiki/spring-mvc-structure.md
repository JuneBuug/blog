---
title   : 'Spring MVC 구조' 
slug    : '/spring-mvc'
layout  : wiki 
excerpt : 'Spring MVC 구조 알아보기' 
date    : 2022-01-23 20:07:45 +0900
updated : 2022-01-23 23:34:19
tags    : 
- Spring
---

이 글은 `토비의 스프링 3.1 Vol.2 스프링의 기술과 선택 : 3장 스프링 MVC` 를  정리 & 참고하였습니다. 


## 서론 
스프링은 의도적으로 프레젠테이션 계층의 아키텍처 (웹 기술을 적용하는 부분)과, 
비즈니스 서비스 계층 + 데이터 액세스 계층을 담은 컨텍스트를 분리해두었다. 

각각을
- 서블릿 애플리케이션 컨텍스트 (~ 프레젠테이션 , 웹 기술)
- 루트 애플리케이션 컨텍스트 (~비즈니스 서비스 + 데이터 액세스 계층)

라고 일컫는다. 

이중 우리가 알아볼 Spring MVC 는 **프레젠테이션**에 해당하는 개념이다. 스프링 입장에서는 이 프레젠테이션 레이어를 누가 만들었는지에 따라서도 구분을 되는데, 스프링 외의 웹 기술을 사용할 수도 있다. (이 부분을 다르게 적용하기 위해서 레이어를 나눈 것이기도 하다.)
참고로, 스프링 기반이 아닌 웹 프레임워크 예시는 다음과 같다. 
- JSP / Servlet 
- Struts1 
- Struts2 


다만... Spring MVC 는 스프링에 **직접 제공하는 서블릿 기반의 MVC 프레임워크**다. MVC 는 Model-View-Controller 의 구조를 일컫는 말이고, rails / django 서버를 짜본 일이 있다면 익숙하리라 생각한다. 😉
그럼 Spring MVC 를 좀더 알아보자. 

## Spring MVC 
스프링 서블릿 혹은 스프링 MVC 라고 부른다. 
그 유명한 `DispatcherServlet` 을 핵심 엔진으로 사용한다. 대략 모든 요청이 제일 먼저 `DispatcherServlet` 을 거친다고 생각하면 된다. 

스프링 MVC는 다양한 종류의 컨트롤러를 동시에 사용할 수 있게 설계 되어 있다.  애노테이션 설정과 유연한 핸들러 메소드를 지원하는 스프링 @MVC가 가장 대표적으로 사용되는 스프링 MVC 기반 기술이다. 이 스프링 MVC가 제공하는 공통 서비스와 전략을 기반으로 해서 새로운 MVC 프레임워크들이 많이 나왔다. 
소개 되어있는 것들은 다음과 같다. 

- Spring Web Flow 
- Spring Javascrcipt 
- Spring Faces 
- Spring Web Service 
- Spring BlazeDS Integration 

위에서 소개한 Spring 기반이 아닌 웹 프레임워크까지 합치면, 정말 여러가지의 자바 웹 프레임워크가 존재한다. 다만 토비의 스프링에서는, `가장 스프링답게 효과적으로 개발할 수 있는 방법은 스프링이 직접 제공하는 웹 프레임워크를 사용하는 것` 이라고 말한다. 따라서, Spring MVC 와 DispatcherServlet 전략을 구체적으로 살펴보자. 

### Dispatcher Servlet 전략 
`DispatcherServlet` 은 스프링의 웹 기술을 구성하는 다양한 전략을 DI 로 구성해서 확장하도록 만들어진 스프링 서블릿 / MVC 의 엔진과 같은 역할을 한다.

- DI 가 궁금하다면 참고 [Inversion of Control 이란](https://juneyr.dev/ioc)

이 서블릿은 `프론트 컨트롤러` 의 역할을 맡는다. 프론트 컨트롤러 패턴은 중앙집중형 컨트롤러를 제일 앞에 둬서 서버로 들어오는 모든 요청을 먼저 받아서 처리하게 만든다. 이 프론트 컨트롤러로서, 요청에 맞는 controller를 찾아서 요청을 전달해준다. 실제 일을 하는 컨트롤러는 반환할 뷰를 알고 있고, 이에 맞게 모델을 생성해서 뷰와 모델을 다시 dispatcher servlet에게 전달한다. dispatcher servlet 은 다시 모델을 뷰에 전달하고, 뷰는 모델을 참고해서 화면을 그린다음 dispatcher servlet 에게 전달하는 구조를 갖는다.

![dispatchservlet](./dispatch.png)

이 구조를 좀더 꼼꼼한 과정으로 살펴본다. 

#### dispatcher servlet 의 HTTP 요청 접수 
자바 서버의 서블릿 컨테이너는 http 프로토콜로 들어오는 요청이 스프링의 DispatcherServlet에 할당 된 것이라면 http 정보를 DispatcherServlet 로 전달한다. 보통 `web.xml` 에 전달받은 URL 의 패턴이 정의 되어있다. 

```xml
<servlet-mapping>
  <servlet-name>Spring MVC Dispatcher Servlet</servlet-name>
  <url-pattern>/app/*</url-pattern>
</servlet-mapping>

```

DispatcherServlet은 모든 요청에 대해 공통적진 전처리 작업이 등록된 것이 있다면 이를 먼저 수행한다. 

#### Dispatcher Servlet에서 컨트롤러로 HTTP 요청 위임 
DispatcherServlet은 URL, 파라미터 정보, HTTP 명령 (GET인지? POST인지?) 를 참고해서 어떤 컨트롤러에 작업을 위임할 지 결정한다. 그리고 이제 그 컨트롤러의 특정 메소드를 호출해줘야하는데... 그 컨트롤러의 종류를 모르는데 어떤 메소드를 어떻게 호출할지 어떻게 알게 될까? 혹시 컨트롤러라면 다 같은 인터페이스를 implements 해야하는 걸까? 
그런것은 아니다. DispatcherServlet은 논리상 어떤 종류의 오브젝트라도 컨트롤러로 사용할 수 있고, 여기서 무한한 확장성이 나온다. 대신 우리는 컨트롤러의 종류에 따라서 `핸들러 어댑터` 를 사용한다. 어댑터는 자신이 담당하고 있는 컨트롤러에 요청을 보내고 결과를 받아서 왕초인 DispatcherServlet에 돌려준다. 🥸
잠시 또 구체적으로 살펴보면, 왕초 DispatcherServlet 는 날것의 `HttpServletRequest` 를 그대로 넘겨준다. 그러면 핸들러 어댑터는 컨트롤러의 메소드가 받을 수 있는 파라미터로 변환해서 전달해준다. 

![핸들러 어댑터](./handler-adapter.png)
참고로 최신 spring-webmvc-5.3.5에서DispatcherServlet 설명을 까보니, 기본적으로 사용하는 핸들러 어댑터에 대한 설명이 나와있다. 
- HttpRequestHandlerAdapter - `HttpRequestHandler` 타입에 대해서 핸들링
- SimpleControllerHandlerAdapter - `Controller` 타입에 대해서 핸들링

#### 컨트롤러의 모델 생성과 정보 등록, 결과 리턴 
MVC 패턴에서는 정보를 담고 있는 모델과, 정보를 어떻게 뿌려줄지를 알고 있는 뷰가 분리된다. 컨트롤러는 이 두개를 연결해주는 역할을 할 수 있다. 컨트롤러는 가장 먼저 사용자 요청을 해석하고 - 실제 비즈니스 로직을 수행하도록 서비스 에 계층을 위임하며 - 결과를 받아서 모델을 생성하고 - 어떤 뷰를 사용할지 결정한다. 
모델은 보통 `Map` 형태의 정보라고 생각하면 된다. 

뷰는 어떻게 리턴할 수 있을까? 보통은 뷰의 논리적인 이름을 리턴하게 된다. JSP 뷰가 대표적인데, 이 경우 컨트롤러는 JSP 템플릿 파일의 이름을 리턴하는 식이다. 

#### Dispatcher Servlet 의 뷰 호출과 모델 참조 
DispatcherServlet이 모델과 뷰를 받은 뒤 진행하는 작업은, 뷰에 모델을 전달해주고 클라이언트에게 보여줄 최종 결과물을 생성하달라고 요청하는 것이다. 보통은 브라우저를 통해 사용자가 보게 되므로, 브라우저에서 나타날 Html 을 생성하는 것이 가장 흔한 뷰의 작업이다. 

#### HTTP 응답 돌려주기 
뷰 생성까지의 모든 작업을 마쳤으면 DispatcherServlet은 등록된 **후처리기** 가 있는지 확인하고, 있다면 후속작업을 진행한 뒤에 HttpServletResponse에 담긴 최종 결과를 서블릿 컨테이너에 돌려준다. 서블릿 컨테이너는 HttpServletResponse에 담긴 정보를 HTTP 응답으로 만들어 클라이언트에 전송하고 작업을 종료한다. 




## 참고 

- 토비의 스프링 3.1 Vol.2 스프링의 기술과 선택
