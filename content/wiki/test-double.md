---
title   : '@MockBean, @SpyBean : 테스트더블' 
slug  : '/test-double'
layout  : wiki 
excerpt : 
date    : 2020-09-29 10:33:47 +0900
updated : 2020-09-29 10:37:23
tags    : 
- Mockito
---

## 서론 

옛날에 테스트 더블에 대한 글을 작성한 적이 있었는데, 이번에 또 spy 대신 mock을 쓰는게 정말 적절한 예를 경험해서 일단 적어둔다. 


## 상황 

A 서비스 를 캐싱하는 A-cache service를 B 서비스가 참조하고 있던 상황. 이제 B 에 대한 테스트를 짜려고한다. 그런데 A-cache service의 메소드가 그냥 값만 돌려줬으면 좋겠다. 이때 A-cache 서비스를 Spybean으로 가져온다면

cache 를 타고, cache가 없는 경우는 hit하는게 원래 동작이므로, 값을 돌려주지않고 내부 로직을 타버린다. 즉 A서비스를 참조하게 된다. 나는 A-cache 서비스만 사용하고 싶은데 사용할 수 없게됨.

반면 이때 깡통 상태인 MockBean으로 가져온다면, 내부에 대한 참조가 없이 그냥 값만 돌려주는 상자가 됨. 

