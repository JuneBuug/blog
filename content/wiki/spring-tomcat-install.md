---
layout  : wiki
title   : 'Boot 없는 Spring 팀, Tomcat 설치하고 띄워보기' 
slug : '/spring-tomcat-installation'
date    : 2022-04-13 13:31:21 +09:00
updated : 2022-04-13 13:47:49
tags    : 
- Spring
- Tomcat
---

새로운 팀에서, 일부 모듈은 spring, 일부 spring boot 로 구현되어 있다는 점을 발견했다. 친절한 온보딩 가이드 덕분에 얼기설기 spring + tomcat 조합으로 spring 모듈을 띄웠지만, 매번 boot 만 사용한 덕분에 spring + tomcat  조합을 😅 설치해본 적도 없다는 걸 깨닫고 이번 기회에 정리해본다. 


## tomcat 알잖아?

tomcat은 여러번 언급했지만, 대표적으로 servlet container 를 제공하는 서버다.  오픈소스이고, 관리하는 재단은 apache software foundation. 그래서 apache tomcat 이라고 한다. 이 블로그에서도 다수 언급한 적이 있다. 

- [tomcat 세션 타임아웃](https://juneyr.dev/session-timout)
- [jenkins 기초](https://juneyr.dev/jenkins-as-an-army-knife)

공식 홈페이지는 [여기]((https://tomcat.apache.org/) . 홈페이지에서 이야기하는 tomcat 은 `Jakarta Servlet` 이나 Server page, EPL,  WebSocket, Annotaiton, Authentication 스펙을 구현하는 구현체라고 이야기한다. 이렇게 얘기하면 더 어렵네. 옛날엔 Jakarta 가 아닌 Java EE 스펙을 구현했다. 

덧: javax api 들은 Jakarta EE 8 이후로 모두 `jakarta`로 maven group명을 변경했다. 이는 Eclipse 쪽에서 만든 빌드 아티팩트임을 의미함. 

> Functionally speaking, Jakarta EE 9 is still essentially the same as Java EE 8, so from a purely functional perspective, neither Jakarta EE 8 nor Jakarta EE 9 are particularly enticing for users to update to.
https://blogs.oracle.com/javamagazine/post/transition-from-java-ee-to-jakarta-ee


