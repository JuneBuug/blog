---
layout : "wiki"
slug  : "/querydsl-tips" 
title   : "queryDSL 팁"
excerpt : 조각모음
date    : 2020-03-11 11:41:32 +0900
updated : 2020-03-11 11:43:24 +0900
tags    : 
	- QueryDsl
	- Database
---

# FetchOne과 FetchFirst 
  
단건을 조회할 때 사용한다. FetchOne은 유니크한 1개가 있을 경우 반환하고, 1개 이상인 경우 NonUniqueResult Exception을 발생시킨다. FetchFirst는 여러개라고해도, 처음 데이터만 결과로 반환한다. 둘다 결과가 없으면 null을 반환한다. 

