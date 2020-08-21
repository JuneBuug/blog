---
title   : 'Cannot find symbol in IntelliJ' 
slug  : '/cannot-find-symbol'
layout  : wiki 
excerpt : 
date    : 2020-08-21 17:32:43 +0900
updated : 2020-08-21 17:35:31
tags    : 
---

# Cannot find Symbol 오류 
  
 다양한 방법으로 일어난다. 대부분 프로젝트 구조를 바꾸거나 dependency 를 bump up 하거나... 하는 방법으로 일어난다. 
 
 
 ## gradle dependency 다운로드 
 
 그냥 리로드만 하면 가져올줄알았더니.. gradle 프로젝트에서 - 오른쪽클릭해서 - refresh gradle dependecies 해야 가져온다. 
 
 ## Rebuild project 

clean project - rebuild project 한다. 


## invalidate caches and restart ide 

cache가 남아있어서 싱크가 안맞는 경우도 있다. invalidate cache는 캐시를 날려버린다. 
