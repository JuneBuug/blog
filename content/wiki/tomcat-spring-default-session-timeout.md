---
layout  : wiki
title   : 'tomcat / spring 조합의 디폴트 session timeout' 
slug : '/session-timout'
date    : 2022-01-20 18:39:51 +09:00
updated : 2022-01-20 18:39:51 +09:00
tags    : 
- Spring
- Tomcat
---


## 결론 

tomcat 의 기본 spring session timout 은 30분이다. 

https://docs.openkm.com/kcenter/view/okm-6.4/configuring-tomcat-session-timeout.html

![scrn capture](./scrn 5.png)

그러니까 30분까지는 세션이 유지된다.... 
내가 만약 직접 세션 / context를 날려주지 않으면 로그인 된 것 처럼 움직일수도 있다는 뜻. 