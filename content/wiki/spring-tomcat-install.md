---
title   : 'Boot 없는 Spring 팀, Tomcat 설치하고 띄워보기' 
slug : '/spring-tomcat-installation'
date    : 2022-04-13 13:31:21 +09:00
updated : 2022-04-17 20:07:00 +09:00
tags    : 
- Spring
- Tomcat
---

새로운 팀에서, 일부 모듈은 spring, 일부 spring boot 로 구현되어 있다는 점을 발견했다. 친절한 온보딩 가이드 덕분에 얼기설기 spring + tomcat 조합으로 spring 모듈을 띄웠지만, 매번 boot 만 사용한 덕분에 spring + tomcat  조합을 😅 설치해본 적도 없다는 걸 깨닫고 이번 기회에 정리해본다. 


## tomcat 알잖아?

tomcat은 여러 번 언급했지만, 대표적으로 servlet container 를 제공하는 서버다.  오픈소스이고, 관리하는 재단은 apache software foundation. 그래서 apache tomcat 이라고 한다. 이 블로그에서도 WAS 의 대표적인 예로서 다수 언급한 적이 있다. 

- [tomcat 세션 타임아웃](https://juneyr.dev/session-timout)
- [jenkins 기초](https://juneyr.dev/jenkins-as-an-army-knife)

공식 홈페이지는 [여기]((https://tomcat.apache.org/) . 홈페이지에서 이야기하는 tomcat 은 `Jakarta Servlet` 이나 Server page, EPL,  WebSocket, Annotaiton, Authentication 스펙을 구현하는 구현체라고 이야기한다. 이렇게 얘기하면 더 어렵네. 옛날엔 Jakarta 가 아닌 Java EE 스펙을 구현했다. 

덧: javax api 들은 Jakarta EE 8 이후로 모두 `jakarta`로 maven group명을 변경했다. 이는 Eclipse 쪽에서 만든 빌드 아티팩트임을 의미함. 

> Functionally speaking, Jakarta EE 9 is still essentially the same as Java EE 8, so from a purely functional perspective, neither Jakarta EE 8 nor Jakarta EE 9 are particularly enticing for users to update to.
https://blogs.oracle.com/javamagazine/post/transition-from-java-ee-to-jakarta-ee

그냥 스프링으로 어플리케이션을 만들기만 하면 끝나는게 아니고, tomcat 과 같은 서블릿 컨테이너 (이자 웹 어플리케이션 서버 WAS )에 띄워줘야 동작한다. spring boot는 이런 tomcat 이 내장되어있어 사용자가 따로 WAS 를 설치할 필요가 없었지만 spring은 필요하지. 운영환경에서는 서버에 설치되겠지만 개발자가 작동을 확인하려면 로컬에서도 tomcat 설치가 필요하겠다.

## spring + tomcat 설치하기 

✧ 아래 모든 설정은  intelliJ  + OS X  + gradle 를 기준으로 합니다. 

### tomcat 다운 받기 

OS X 니 homebrew 에서 다운받는 방법도 있지만, 평범하게 tomcat 홈페이지에서 tomcat을 다운 받는 방법을 선택한다. 

https://tomcat.apache.org/download-80.cgi 에 접속하면 최신버전의 tomcat 8을 다운로드 받을 수 있다. 작성 당시 tomcat 8.5.78 이 최신이여서 `Binary Distributions > Core > Zip `  을 사용해서 다운받아준다. 

![tomcat](./2.png)

다 받아서 압축을 푼다. 그러면 bin 폴더, conf 폴더 등 다양한 폴더가 보인다. 이따가의 실행권한을 위해서 bin 폴더 내의 `catalina.sh` 에 실행권한을 추가하자. 

```bash 
chmod +x bin/catalina.sh
```


### 기본적인 spring 프로젝트 세팅하기 (gradle + spring mvc (not boot))

이제 spring 프로젝트를 세팅하자. spring boot 가 아니라 `spring mvc`  만을 사용해서 프로젝트를 만든다. 

![spring-setting](./1.png)
위와 같이 intelliJ 에서 새로운 프로젝트 만들기를 선택한다. 나는 빌드 툴로 `gradle` 을 사용할 예정이므로, gradle 을 선택한다. project SDK 는 java 17 버전이 선택되어있는데, 가끔 spring 버전이나 tomcat 버전 이슈가 있으므로 그냥 **JDK 1.8 버전** 으로 무난하게 선택해준다. 

WEB 패키지를 선택하는 방법도 있는데 여기서는 Java만 선택하고 넘어가는 방법을 쓴다. 

다음, 원하는 프로젝트명을 입력한다. 
![spring-setting](./21.png)
나는 `artifcat Coordinates` 에서 그룹 id도 변경해줬다. 기본은 `com.example` 인 듯. 바꾸지 않아도 상관없다.

이후에는 새로운 프로젝트가 생성된다. `build.gradle` 을 클릭해 `dependencies` 를 확인한다. 우리는  spring mvc 의존성을 여기에 먼저 추가할 것이다. 

```groovy
dependencies { 
  // 여기에 추가
  implementation 'org.springframework:spring-webmvc:5.0.8.RELEASE'
  // implementation 'org.springframework:spring-webmvc:{원하는버전}'
  // 중략
}
```

아래 maven repository 를 확인해서, 적용하는 시점의 안정된 버전을 적용하면 된다. 여기에서는 `5.0.8.RELEASE` 를 추가한다.
https://mvnrepository.com/artifact/org.springframework/spring-webmvc/5.3.19

`dependencies` 작업을 한번 수행한 후, 오른쪽 패널의 gradle 을 선택해 `Reload All Gradle Projects` 를 한번 선택해주면 방금 추가한 의존성을 실제로 maven repository에서 다운로드하기 시작한다. 

![tomcat-setting](./22.png)

이제는 이렇게 추가한 의존성을 실제로 프로젝트에서 프레임워크로서 쓰도록 해보자. 

![tomcat-setting](./23.png)
왼쪽 프로젝트 패널에서 프로젝트 명에 오른쪽 클릭을 하면 `Add Framework Support` 를 확인할 수 있다. 

![tomcat-setting](./11.png)

우리는 어떤 프레임워크의 도움을 받을 거냐면 Spring 하위의 Spring MVC 다. 우리는 아까 gradle 에서 정의해주면서 받아왔던 라이브러리를 쓸거라서 `Use library` 를 선택한다. 

![tomcat-setting](./12.png)
(버전이 다른 것은 흐린 눈으로 봐주시기.. ^^!!.. 여러 번 시도한 지라)
그러면 우리가 추가했던 라이브러리가 표시된다. 해당 라이브러리를 세팅하고 OK. 

여기까지 하면 자동으로 루트 디렉토리에 `web/WEB-INF` 폴더가 생기면서 크게 주요한 세 가지 파일이 생긴다. 

 - web.xml
 - application-context.xml
 - dispatcher-servlet.xml

디폴트 값이 있을 텐데, 후딱 필요한 값들만 변경해주고 넘어간다.

`web.xml` 에서는 dispatcher servlet 이 받을 경로 값을 다음과 같이 변경해준다. 

```xml 
<servlet-mapping>  
    <servlet-name>dispatcher</servlet-name>  
    <url-pattern>/</url-pattern>  <!-- form 어쩌구를 / 로 변경 --> 
</servlet-mapping>
```

`dispatcher-servlet.xml` 에서는 annotation 을 인식하고 bean 경로를 스캔하도록 다음 코드로 대체한다. 
```xml 
<?xml version="1.0" encoding="UTF-8"?>  
<beans xmlns="http://www.springframework.org/schema/beans"  
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
       xmlns:context="http://www.springframework.org/schema/context"  
       xmlns:mvc="http://www.springframework.org/schema/mvc"  
       xsi:schemaLocation="http://www.springframework.org/schema/beans  
       http://www.springframework.org/schema/beans/spring-beans.xsd       http://www.springframework.org/schema/context       http://www.springframework.org/schema/context/spring-context.xsd       http://www.springframework.org/schema/mvc       http://www.springframework.org/schema/mvc/spring-mvc.xsd">  
  
    <!-- annotation을 인식한다. -->  
    <mvc:annotation-driven/>  
    <!-- controller 컴포넌트 패키지를 인식한다. base package를 만들 계획 -->  
     <context:component-scan base-package="dev.juneyr.controller"/>  
  

     <!-- WEB-INF 하위에 views 폴더를 만들 계획 --> 
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">  
        <property name="prefix" value="/WEB-INF/views/"/>  
        <property name="suffix" value=".jsp"/>  
    </bean>  
</beans>
```

여기에서 설정한 대로 필요한 패키지를 만들어준다. 

`src/main/java` 하위에 `dev.juneyr.controller` 패키지를 만들어준다. 그리고 샘플로 `HelloController` 를 하나 만들어주었다. 

```java:title=dev.juneyr.controller/HelloController.java
package dev.juneyr.controller;  
  
import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.RequestMapping;  
  
@Controller  
public class HelloController {  
  
    @RequestMapping(value = "/hello")  
    public String hello () {  
        System.out.println("hello from the other side");  
        return "test";  
    }  
}

```

루트 패키지의 `web/WEB-INF`  하위에는 `views`  폴더를 만들어준다. 그리고 자동으로 생겼던 index.jsp를 복사해서 test.jsp 를 만들어 폴더 하위에 넣어준다. 

```java:title=views/test.jsp
<%--  
  Created by IntelliJ IDEA.  User: user  Date: 2022/04/17  Time: 12:50 PM  To change this template use File | Settings | File Templates.--%>  
<%@ page contentType="text/html;charset=UTF-8" language="java" %>  
<html>  
  <head>  
    <title>$Title$</title>  
  </head>  
  <body>  
   요것은 테스트여요  
  </body>  
</html>
```

그럼 이제 tomcat 을 설정하러 가보자. (드디어! 🥲)

### tomcat application server 연결하기

아까 다운로드 된 톰캣을 루트 디렉토리에 이동해준다. 이렇게 그냥 이동한다고? 싶지만 이 편이 편리하다.
![tomcat-setting](./3.png)

폴더명이 투박하므로 보기 쉽게 그냥 `tomcat` 으로 변경해주었다. 
![tomcat-setting](./4.png)

intelliJ 로 돌아와서 shift 두번으로 actions 다일로그를 띄우고 `Application Servers` 를 띄운다. 그냥 Preferences > Application Servers 를 해도 된다.

![tomcat-setting](./5.png)

![tomcat-setting](./6.png)
`+` 버튼을 눌러서 어플리케이션 서버를 추가해준다. (왜 우리가 tomcat을 WAS 라고 부르는지 또 증명,, =))
![tomcat-setting](./7.png)
tomcat을 선택하고 나오는 tomcat home 은 우리가 아까 이름을 변경해준 tomcat 폴더로 해주면 된다. 

![tomcat-setting](./8.png)
(이 역시 여러 번 트라이 해서 이름이 일치하지 않습니다.. name에 아까 우리가 바꿔준 tomcat ! 으로 표시되는 것이 일반적) 

그 다음, Project Structure > Artifacts 를 가면 자동으로 war exploded (압축 푼 버전이라는 뜻) 이 표시되어있다. `Output Layout`  > `Available Elements` 하위에 표시된 라이브러리를 클릭 클릭해서 모든 라이브러리가 `WEB-INF` 하위에 포함되도록 해주자.


![tomcat-setting](./17.png)
그리고 apply > OK. 

이제 tomcat 서버를 띄우는 빌드 설정을 해주자. 상단의 망치 모양 옆에서 Edit Configurations 를 선택. 
![tomcat-setting](./24.png)

![tomcat-setting](./18.png)

상단 왼쪽의 `+` 버튼을 선택해서 Tomcat Server > Local 을 선택한다. 이름은 자동으로 들어가는데, `No artifcats marked` 가 뜬다. 아까 설정해준 artifacts 를 넣어줘야한다. Deployment 에서 추가해준다. 
![tomcat-setting](./19.png)
이렇게 되면 하단의 `Application Context` 경로가 막 바뀌는 경우가 있으니 꼭 `/` 로 다시 설정해준다. 

이렇게 apply > OK. 

이러고 나면 기본적인 세팅은 다 끝난다. 
다시 망치모양을 눌러서 방금 설정한 tomcat 서버 빌드하기를 눌러주면 설정한 포트에 controller 가 인식된다. ☺️ (위 프로젝트 세팅의 경우, localhost:8080/hello )

![tomcat-setting](./20.png)

## 마치며 

별것 아닌 내용인데, 자꾸 뭔가 틀어져서 여러 번 시도하느라 사진의 project 명이 틀어진게 좀 있다. 이 부분 양해부탁드립니다... spring boot 로 편하게 내장 tomcat 사용하다가 직접 로컬에 tomcat 깔고 실행하고 나니, 구체적으로 보이지 않던 이놈의 역할이 잡히는 느낌이다... 이 서버를 띄울때 war 를 먼저 빌드해서 떨궈주고 그걸 기반으로 보여주는 이 구조를 이해하고 나면 프로젝트를 진행하는데 큰 도움이 되더라!! 😎g