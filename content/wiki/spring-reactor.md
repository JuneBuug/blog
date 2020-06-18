---
title   : 'Spring Reactor 101' 
slug  :  '/spring-reactor'
layout  : wiki 
excerpt : 
date    : 2020-06-05 13:14:48 +0900
updated : 2020-06-18 12:44:31 +0900
tags    : 
 - Spring
 - Reactive Programming
---

그날이 왔다. 여러가지 api 콜을 합쳐서 다시 하나의 응답으로 만들어 내보내주는 코드를 보는데, 이해를 전혀 못하겠는 때가.. 그래서 이번주는 Spring reactor 101이다. 

[Project Reactor](https://projectreactor.io/) 는 Spring 프레임워크를 만든 pivotal에서 제공하는 오픈소스 프로젝트다. [Reactive Stream](https://www.reactive-streams.org/) 규약을 기반으로, [Reactive X](https://reactivex.io/) 에서 영감받은 방식의 프로그래밍을 구현한 프로젝트다. 

즉 Reactive Stream은 규약이므로 인터페이스 같은 존재이다. 그러면  영감받았다는 Reactive X 는 뭔데? 홈페이지에서는 Reactive X 를 관찰가능한 흐름을 사용하여 비동기적, 이벤트 기반의 프로그램을 만들어주는 라이브러리 (a library for composing asynchronous and event-based programs by using observable sequences) 라고 말하고 있다. 

## 왜 사용해야해? 
[우아한형제들 기술블로그](https://woowabros.github.io/experience/2019/03/18/tech-toby-reactive.html) 에서는 간단한 예제로 사용 이유를 설명하고 있다. 

> 여러 API를 취합해서 전달해야하는 시스템에서는 SUM([각 API들의 경과시간]) 만큼 필요합니다. 반대로 리액티브로 진행할 경우, 여러 API 중 MAX([각 API들의 경과시간]) 이 필요합니다. 

즉, 이전에 사용하던 API 요청이 n개가 있으면 이를 하나 호출하고 받을 때까지 다른일을 할 수 없기때문에 n개의 요청 시간을 모두 합친만큼 걸린다. 하지만 리액티브 시스템을 사용하면 요청을 비동기적으로 **동시에** 보내기때문에 이 중 가장 긴 요청 시간만큼만 걸린다. 

스프링 5 이전 (리액티브 프로그래밍을 하기 이전) 오랫동안 자바 개발자에게 동시성 = `많은 쓰레드` 였다. 쓰레드 별로 다른 일을 하도록하면 쓰레드 갯수만 늘리면 동시에 여러 일을 처리하게 할 수 있었으니까. 




### async/sync vs blocking/non-blocking
 
비동기 (async) 적인 프로그래밍을 다루기 전에, 비동기/동기 그리고 블로킹 / 논-블로킹을 먼저 다뤄야한다. 

간단히 생각해보면 async와 논 블로킹이 같은 개념이고, sync와 블로킹이 같은 개념처럼 느껴진다. 비동기로 일을 던져주면, 호출한 함수 A는 호출된 함수 B가 응답할 때까지 기다리지 않고(non-blocking)하게 일할 수 있으니까. 반대로 동기로 일을 던지면 호출된 함수 B가 다시 결과값을 넘겨줄 때까지 호출한 함수 A는 기다리는(blocking) 상태가 된다. 

하지만 이 두가지 개념은 관점의 차이가 있다. 

![async](./async.png)

sync/async : 호출되는 함수 B의 작업완료 여부를 누가 신경쓰느냐가 주제다. 
   - 호출하는 함수 A가 호출된 함수 B의 작업 완료 후 리턴을 기다리거나, 혹은 바로 리턴받더라도 작업 완료 여부를 A가 직접 신경쓰면 sync
   - B에게 callback을 전달해서, B의 작업이 완료될 때 B가 callback을 실행하고, A는 그때서야 받는 구조. 즉 A가 작업의 완료 여부를 신경스지 않으면 async 
     
![blocking](./blocking.png)     

blocking/non-blocking: 호출되는 함수가 바로 리턴하느냐, 마느냐 
  - 호출된 함수 B가 바로 리턴해서 A에게 다시 제어권을 넘겨주고, A가 다른 일을 할 기회를 준다면 non-blocking
  - 호출된 함수가 자신의 작업을 마칠때까지 대기하게 만든다면 blocking 
    


## 참고 
https://woowabros.github.io/experience/2019/03/18/tech-toby-reactive.html
https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/

https://tech.kakao.com/2018/05/29/reactor-programming/

https://javacan.tistory.com/entry/Reactor-Start-1-RS-Flux-Mono-Subscriber

https://luvstudy.tistory.com/100
