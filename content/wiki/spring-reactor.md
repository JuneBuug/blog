---
title   : 'Spring Reactor 101' 
slug  :  '/spring-reactor'
layout  : wiki 
excerpt : 
date    : 2020-06-05 13:14:48 +0900
updated : 2020-06-05 15:57:49 +0900
tags    : 
 - Spring
 - Reactive Programming
---

그날이 왔다. 여러가지 api 콜을 합쳐서 다시 하나의 응답으로 만들어 내보내주는 코드를 보는데, 이해를 전혀 못하겠는 때가.. 그래서 이번주는 Spring reactor 101이다. 

[Project Reactor](https://projectreactor.io/) 는 Spring 프레임워크를 만든 pivotal에서 제공하는 오픈소스 프로젝트다. [Reactive Stream](https://www.reactive-streams.org/) 규약을 기반으로, [Reactive X](https://reactivex.io/) 에서 영감받은 방식의 프로그래밍을 구현한 프로젝트다. 

그럼 Reactive Stream은.. 마치 인터페이스처럼, 규약이고. 영감받았다는 Reactive X 는 뭔데? 홈페이지에서는 Reactive X 를 관찰가능한 흐름을 사용하여 비동기적, 이벤트 기반의 프로그램을 만들어주는 라이브러리 (a library for composing asynchronous and event-based programs by using observable sequences) 라고 말하고 있다. 이게 뭔데 요놈아

Observer 패턴, 그리고 Iterator 패턴, 그리고 function programming의 좋은점 만 뽑은 Reactive X .  event stream을 쉽게 만들고, 구성하고, 변형하는데 능합니다. 

### async/sync vs blocking/non-blocking
 
비동기 (async) 적인 프로그래밍을 다루기 전에, 비동기/동기 그리고 블로킹 / 논-블로킹을 먼저 다뤄야한다. 

간단히 생각해보면 async와 논 블로킹이 같은 개념이고, sync와 블로킹이 같은 개념처럼 느껴진다. 비동기로 일을 던져주면, 호출한 함수 A는 호출된 함수 B가 응답할 때까지 기다리지 않고(non-blocking)하게 일할 수 있으니까. 반대로 동기로 일을 던지면 호출된 함수 B가 다시 결과값을 넘겨줄 때까지 호출한 함수 A는 기다리는(blocking) 상태가 된다. 

하지만 이 두가지 개념은 관점의 차이가 있다. 

![async](./async.png)
- sync/async : 호출되는 함수 B의 작업완료 여부를 누가 신경쓰느냐가 주제다. 
   - 호출하는 함수 A가 호출된 함수 B의 작업 완료 후 리턴을 기다리거나, 혹은 바로 리턴받더라도 작업 완료 여부를 A가 직접 신경쓰면 sync
   - B에게 callback을 전달해서, B의 작업이 완료될 때 B가 callback을 실행하고, A는 그때서야 받는 구조. 즉 A가 작업의 완료 여부를 신경스지 않으면 async 
     
![blocking](./blocking.png)     
- blocking/non-blocking: 호출되는 함수가 바로 리턴하느냐, 마느냐 
  - 호출된 함수 B가 바로 리턴해서 A에게 다시 제어권을 넘겨주고, A가 다른 일을 할 기회를 준다면 non-blocking
  - 호출된 함수가 자신의 작업을 마칠때까지 대기하게 만든다면 blocking 
    


## 참고 

https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/

https://tech.kakao.com/2018/05/29/reactor-programming/

https://javacan.tistory.com/entry/Reactor-Start-1-RS-Flux-Mono-Subscriber

https://luvstudy.tistory.com/100
