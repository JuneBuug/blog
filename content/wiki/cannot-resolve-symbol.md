---
title   : 'Cannot find symbol in IntelliJ' 
slug  : '/cannot-find-symbol'
layout  : wiki 
excerpt : 
date    : 2020-08-21 17:32:43 +0900
updated : 2020-08-21 17:48:34
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

## lombok plugin 확인 
intelliJ 버전업을 했다면 lombok 호환성이 맞는지 확인하자. 

preferences > build, execution 에서 enable annotation processor가 켜져있는지, etc에 lombok이 프로젝트 전체적으로 켜져있는지 확인하자. 후자를 한뒤 intelliJ를 껐다 켠다.  
