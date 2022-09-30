---
title   : 'junit4 와 junit5 헷갈리는 점 정리' 
slug  : 'junit-series'
layout  : wiki 
excerpt : 
date    : 2022-09-29 17:41:24 +0900
updated : 2022-09-30 14:41:56
tags    : 
---

## junit에 spring support 작성할 때 

### junit 4
```java
@RunWith(SpringJUnit4ClassRunner.class)
@Runwith(SpringRunner.class) # 위와 같지만  개선된 버전? 
```

### junit 5

```java
@ExtendWith(SpringExtension.class) 
```

junit5에서는 ExtendWith를 지원한다. 
그런데 SpringExtension을 사용하려면 Spring Framework의 spring-test를 써야하고 (spring version 5 이상), 만약 이를 지원하지 않는 경우(부득이 하게 스프링 버전을 올릴 수 없는 경우) 어쩔수없이 junit vintage를 사용해서 runwith를 사용해야한다. 

## ContextConfiguration

application context 나 bean 일부만 주입할 때 
