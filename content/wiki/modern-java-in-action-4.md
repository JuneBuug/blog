---
title   : '모던자바인액션-CompletableFuture' 
slug  :  '/modern-java-4'
layout  : wiki 
excerpt : 
date    : 2020-07-14 14:03:46 +0900
updated : 2020-07-15 13:14:09
tags    : 
---

# 15장 CompleteableFuture와 리액티브 프로그래밍 컨셉의 기초 
  
소프트웨어 개발방법은 나날이 발전하고 있다. 그 중에서도  뚜렷하게 보이는 추세는 이 두가지이다.

- 멀티코어 프로세서의 발전
  - 멀티코어 프로세서가 발전하면서, 이를 가장 **잘 활용**하도록 소프트웨어를 개발하는 경향이 늘어났다. 포크/조인, 그리고 병렬 스트림이 이 경향을 반영한다.
  
- 애플리케이션 구성 방법 
  - 예를 들면, 마이크로서비스 (<-> 모놀리틱) 아키텍처의 선택이 늘어났다. 하나의 거대한 서비스 대신 작은 서비스로 애플리케이션을 나누고, 서비스 간 **통신**하여 정보를 주고 받고록 했다. 따라서 앞으로 어플리케이션은 여러 소스에서 정보를 가져와서 합치는 매시업 형태가 되어가고 있다. 
    
이런 애플리케이션을 구현하려면 네트워크(인터넷)을 통해서 여러 웹 서비스에 접근해야한다. 그러나 서비스의 응답을 기다리는 동안 연산이 블록되거나, CPU 클록 사이클 자원을 낭비하는 것이 우리가 바라는 바는 아니다 😭 

이 점에서 멀티태스크 프로그래밍의 양면성이 돋보인다. 7장에서의 포크/조인 그리고 병렬 스트림은 병렬성의 귀중한 도구다. 하지만 병렬성이 아니라 동시성이 필요한 상황, 즉, 조금씩 연관된 작업을 같은 CPU에서 동작하는 것이 목표라면 원격 서비스나 데이터베이스 결과를 기다리는 스레드를 블록해서 자원을 낭비하지는 말아야한다. 

앗, 그런데 동시성과 병렬성이 헷갈린다. 동시성은 단일 코어 머신에서 발생할 수 있는 프로그래밍 특성으로, 실행이 서로 겹치는 경우가 있다. 반면 병렬성은 하드웨어 수준에서 다른 코어에서 작업이 도는 것을 의미한다. 

자바는 동시성 환경에서 사용할 수 있는 주요 도구를 두가지 제공한다. 

- Future 인터페이스. 자바8의 CompletableFuture를 사용

- 자바9의 pub-sub 프로토콜, 그리고 리액티브 프로그래밍에 기반한 Flow API 
  
여기서는 `CompletableFuture`에 대한 내용을 먼저 살펴보자. 

## 15.1 동시성을 구현하는 자바 support의 진화

자바에서의 동시성 프로그래밍은 계속 발전해왔다. 처음에 자바는 Runnable과 Thread를 동기화된 클래스와 메서드를 이용해서 lock 했다. 2004년, 자바 5는 ExecutorService 인터페이스, 그리고 Runnable과 Thread 등을 반환하는 `Callable<T>`, `Future<T>`, 제네릭 등을 지원하기 시작했다. ExecutorService는 Runnable과 Callable을 둘다 실행할 수 있다. 이런 기능이 생겨서, 멀티코어 CPU 에서 쉽게 병렬 프로그래밍을 구현할 수 있게되었다. 

멀티코어 CPU에서 더 효율적으로 프로그래밍할 이유가 생기면서, 이후 자바에서는 동시성 지원이 더 개선되었다. 자바 7에서는 divide-and-conquer 즉 포크-조인을 지원하는 RecursiveTask가 추가되었고 자바8에서는 스트림, 람다를 기반으로한 병렬 처리가 추가되었다. 

자바는 Future를 조합할 수 있는 기능을 추가하면서, 동시성을 강화했다. (CompletableFuture). 자바8에서는 분산 비동기 프로그래밍을 명시적으로 지원했다. 이 API들은 매쉬업 어플리케이션을 개발하는데 필수적인 모델과 toolkit을 지원한다. 이 과정을 **리액티브 프로그래밍** 이라고 부른다. 자바 9에서는 pub-sub 프로토콜로 이 과정을 추가 지원한다. 

### 15.1.1 스레드와 높은 수준의 추상화 

운영체제 시간에 배웠을 테지만, 단일 CPU 에서도 여러 사용자가 존재할 수 있다. 이는 OS 가 각 사용자에 프로세스 하나를 할당하기때문이다. OS는 두 사용자가 각각 자신만의 공간에 있다고 생각할 수 있도록 가상 주소 공간을 각 프로세스에 제공한다. [참고 - 가상메모리](https://velog.io/@pa324/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EA%B0%80%EC%83%81-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B0%9C%EB%85%90-4dk2q3ivff) 프로세스는 다시 OS에, 스레드 (자신과 같은 주소공간을 공유하는 프로세스) 를 요청하여, task를 동시에 혹은 협력하여 사용이 가능하다. 

멀티코어인 경우, 스레드의 도움이 없이는 컴퓨팅 파워를 모두 활용할 수 없다. 각 코어는 한개 이상의 프로세스는 스레드에 할당되지만, 프로그램이 스레드를 사용하지 않는다면 효율성을 고려해 코어 하나만 사용할 것이다. 

앞서 말했던 것 처럼 스트림을 사용해서 스레드의 사용을 **추상화** 할 수 있다.
즉
```java
long sum0 = 0; 
for (int i=0; i<250_000; i++) {
  sum0 += stats[i];
}
```
위와 같은 코드를 실행하는 네개의 스레드를 관리하는 코드가 있다면, 

```java
sum = Arrays.stream(stats).parallel().sum(); 
```
으로 쉽게 변경할 수 있다. 

스레드 추상화를 더 살펴보기전에, 기초에 해당하는 자바 5의 ExecutorService 개념과 스레드 풀을 알아보자. 

### 15.1.2 Executor와 스레드 풀 

자바 5는 Executor  프레임워크와 스레드 풀을 통해, 스레드의 파워를 높이는 기능을 제공했다. 

#### 스레드의 문제 
자바 스레드는 직접 운영체제 스레드에 접근한다. 운영체제 스레드를 만들고 종료하려면 비싼 비용을 치러야하며, 운영체제의 스레드의 숫자는 제한되어있다. OS가 지원하는 스레드 수를 초과하여 사용하는 경우 예상치 못한 방식으로 애플리케이션이 크래시 될 수 있다. 🔥 그러므로 기존 스레드가 실행되는 중에 계속 새로운 스레드가 만들어지는 상황은 없도록 해야한다. 

보통 OS 와 자바스레드 개수가 하드웨어 스레드 개수보다 많다. [참고](https://velog.io/@dvmflstm/CPU-%EC%8A%A4%EB%A0%88%EB%93%9C-%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EC%8A%A4%EB%A0%88%EB%93%9C) 
> CPU 스레드(물리스레드, 하드웨어스레드)는 물리적 코어갯수가 아닌 논리적 코어개수를 뜻한다. 통상적으로는 1코어 1스레드가 일반적이지만, 코어 사용률을 높여서 1코어당 여러 스레드를 동시에 돌리는 하이퍼 스레딩 기법이 등장했다. 

> 소프트웨어 스레드 (자바스레드) - 하나의 프로세스가 실행되는 세부 작업들의 단위를 말한다. OS 스케쥴링 시 동시 실행한 스레드 수는 정해져있다. 하지만 메모리가 허용하는 소프트웨어적 스레드 수는 더 많을 수도 있다. OS가 실행하고 있지않은 스레드는 잠들어 있을 수도 있고, OS는 이들 중 물리적 스레드가 허용 가능한 만큼의 스레드를 할당하여 동시에 실행시킨다. 

#### 스레드풀이 더 좋은 이유 
자바 ExecutorService는 task를 제출하고 나중에 결과를 돌려받는 인터페이스를 제공한다.  프로그램은 `newFixedThreadPool` 와 같은 메서드를 이용해 스레드 풀을 만들어 사용할 수 있다. 

```java
ExecutorService newFixedThreadPool(스레드갯수)
```
이 메서드는 워커 스레드를 포함한 ExecutorService를 만들고 이를 스레드 풀에 저장한다. 

스레드풀에서 놀고 있었던 스레드에 할당된 task를 먼저 온 순서대로 실행하고, 이 task 실행이 종료되면 스레드는 풀에 반납된다. 

이 방식의 장점은 하드웨어 스레드에 맞는 수의 task를 유지하면서, 동시에 수천 수백개의 태스크를 스레드 풀에 할당할 수 있다는 점이다. 여기서의 task는 Runnable혹은 Callable의 형태를 띈다. 

스레드 풀이 비-스레드풀보다 대부분의 경우 바람직하지만, 두가지 사항을 주의해야한다. 

- k 개의 스레드를 가진 풀은 오직 k 만큼의 스레드를 동시 실행할 수 있다. 초과 제출된 task는 큐에 저장되며, 노는 스레드가 생기기 전까지는 할당하지 않는다. 만약 잠을 자거나 I/O를 기다리거나 네트워크 연결을 기다리는 task가 있다면, 블록 상황이 되고 이 task는 스레드에 할당되어있지만 실제로는 아무 작업도 안하고 기다리고 있게 된다. 먼저 실행된 task가 나중 task의 결과를 기다리기라도 하면 🤢 데드락에 걸리게 된다. 
  
- 보통 자바 프로그램은 main이 반환하기 전에 모든 스레드의 작업이 끝나기를 기다린다. 따라서 프로그램을 종료하기 전에 모든 스레드 풀을 종료하는 습관을 가져야한다. 
  
### 15.1.3 스레드의 다른 추상화 

메서드를 호출한 쪽에 바로 리턴되고, 메서드 내에서 만들어진 task 실행은 계속되는 메서드를 **비동기 메서드** 라고 한다. 이들 메서드를 사용할 때는 다음을 주의해야한다. 

- 스레드 실행은 메서드를 호출한 다음 코드와 동시에 실행되므로 race condition을 유의한다. 

- 기존 스레드가 종료되지않은 상태에서 `main()` 이 끝나면 어떻게 될까? 
   - 종료를 못하고 모든 스레드가 끝나길 기다린다. 
   - 종료를 방해하는 스레드를 kill 하고 애플리케이션을 종료한다. 
     
위 둘다 안전한 방법도 아니고, 크래시로 인해 데이터의 일관성이 파괴될 수 있다. 

자바 스레드는 데몬과 비 데몬으로 구분해서 지정할 수 있다. 데몬 스레드는 애플리케이션이 종료될때 강종되므로, 디스크의 일관성을 파괴하지 않는 동작에 유용하다. main은 보통 비데몬 스레드가 종료될때까지 기다린다. 

## 15.2 동기와 비동기 API 

다음과 같은 예제를 보자. 
```java
int f(int x);
int g(int x);

int y = f(x);
iny z = g(x);
System.out.println(y+z);
```
f와 g는 물리적 결과를 반환하므로 동기 API라고 부른다. 아래의 print 는 두 메서드의 결과를 합쳐서 반환하는 코드다. f,g를 실행하는데 오랜 시간이 걸린다고 가정하자. 만약 f,g가 상호작용을 안한다고 알고있다면, 걸리는 시간이 `time(f) + time(g)` 가 아니라 `max(time(f), time(g))` 가 되도록 별도 CPU 코어로 실행할 수 있다. 

```java
 public static void main(String[] args) throws InterruptedException {
    int x = 1337;
    Result result = new Result();

    Thread t1 = new Thread(() -> {
      result.left = f(x);
    });
    Thread t2 = new Thread(() -> {
      result.right = g(x);
    });
    t1.start();
    t2.start();
    t1.join();
    t2.join();
    System.out.println(result.left + result.right);
  }

  private static class Result {
    private int left;
    private int right;
  }
```
runnable 대신에 future api 를 사용하면 더 단순화 할 수 있지만 여전히 길고 불필요한 코드가 있다. 

```java
 public static void main(String[] args) throws ExecutionException, InterruptedException {
    int x = 1337;

    ExecutorService executorService = Executors.newFixedThreadPool(2);
    Future<Integer> y = executorService.submit(() -> fo(x));
    Future<Integer> z = executorService.submit(() -> go(x));
    System.out.println(y.get() + z.get());

    executorService.shutdown();
  }
```

이 문제는 비동기 API 기능으로 해결이 가능하다. 

### 15.2.1 Future 형식 API 

먼저 f,g 의 시그니처가 변경되어야한다. 

```java
Future<Integer> f(int x);
Future<Integer> g(int x);


Future<Integer> y = f(x);
Future<Integer> z = g(x);
System.out.println(y.get() + z.get());
```

메서드 f는 호출 즉시 자신의 원래 바디를 평가하는 task를 들고 있는 Future를 반환한다. 

### 15.2.2 리액티브 형식 API 
future 방식이 아니라 다른 방식으로도 가능하다. 콜백 형식의 프로그래밍을 하는 것이다. 

```java

  public static void main(String[] args) {

    int x = 1337;
    Result result = new Result();

    f(x, (int y) -> {
      result.left = y;
      System.out.println((result.left + result.right));
    });

    g(x, (int z) -> {
      result.right = z;
      System.out.println((result.left + result.right));
    });
  }

  private static class Result {
    private int left;
    private int right;
  }

  private static void f(int x, IntConsumer dealWithResult) {
    dealWithResult.accept(Functions.f(x));
  }

  private static void g(int x, IntConsumer dealWithResult) {
    dealWithResult.accept(Functions.g(x));
  }
```
그러나 위 방식은 

- f와 g의 호출 합계를 정확하게 출력하지 않고 상황에 따라 먼저 계산된 결과를 출력한다

는 문제가 있다. 따라서 다음 두가지 방법으로 이 문제를 보완한다. 

- `if-then-else` 를 사용하여 적절한 락으로 두 콜백이 모두 호출되었는지 확인한 다음 println을 출력한다. 
  
- 리액티브 형식의 API는 대개 한 결과가 아니라 일련의 이벤트에 반응하도록 설계되었으므로 future를 이용하는 것이 더 바람직하다. 
  
### 15.2.3 sleep과 블로킹은 해롭다

스레드는 잠들어도 시스템 자원을 점유한다. 스레드 풀에서 잠자는 task는 다른 task가 실행되지 못하게 막으므로 자원을 소비하게 된다. 블록동작도 마찬가지다. 

// 보충 필요 

### 15.2.4 현실성 확인 

새 시스템을 설계할 때 블록이 있는 모든 동작을 비동기로 구현한다면 병렬 하드웨어를 최대한 활용할 수 있다. 그러나 현실적으로는 어렵다. 실제로는 자바의 개선된 동시성 API 를 이용해 이득이 있는지 검토해보고, 개선된 동시성 API를 사용해보길 권장한다. Netty같은 새로운 라이브러리를 사용하는 것도 도움이 된다. 


### 15.2.5 비동기 API 에서 예외 
비동기에서 어떻게 예외를 처리할 수 있을까? Future의 구현체인 CompletableFuture에서는 `get()` 런타임에 예외를 처리할 수 있는 기능을 제공한다.

리액티브형식 비동기 API 는 기존 콜백이 호출되므로, 예외가 발생할 때 처리할 추가 콜백을 만들어줘야한다. 
```java
void f(int x, Consumer<Integer> dealWithResult, Consumer<Throwable> dealWithException);
```

위처럼 콜백이 여러개면 이를 따로 제공하는 것보다는 한 객체로 이 메서드를 감싸는게 좋다. 자바 9에서는 여러 콜백을 `Subscriber<T>` 로 감싼다. 
```java
void onComplete()
void onError(Throwable throwable)
void onNext(T item) 
```

## 15.3  박스와 채널 모델 box-and-channel model 

동시성을 표현한 다이어그램이다. 


## 15.4 CompletableFuture와 콤비네이터를 이용한 동시성 

CompletableFuture는 `complete()` 메서드를 이용해 나중에 다른 스레드가 이를 완료하고, `get()` 을 통해 값을 얻을 수 있도록 한다. 이때문에 Composable이 아니라 Completable이라고 부른다. 
다음과 같이 코드를 구현할 수 있다. 

```java
public class CFComplete {

  public static void main(String[] args) throws ExecutionException, InterruptedException {
      ExecutorService executorService = Executors.newFixedThreadPool(10);
      int x = 1337;

      CompletableFuture<Integer> a = new CompletableFuture<>();
      executorService.submit(() -> a.complete(f(x)));
      int b = g(x);
      System.out.println(a.get() + b);

      executorService.shutdown();
  }
}
```
위 코드는 f(x) 의 실행이 끝나지앟는 경우 a의 get을 기다려야하므로 프로세싱 자원을 낭비할 수 있다. 이를 어떻게 해결 할 수 있을까? CompletableFuture에 theCombine을 사용해서 더 효율적으로 두 연산 결과를 조합할 수 있다. 

```java
public class CFCombine {

  public static void main(String[] args) throws ExecutionException, InterruptedException {
      ExecutorService executorService = Executors.newFixedThreadPool(10);
      int x = 1337;

      CompletableFuture<Integer> a = new CompletableFuture<>();
      CompletableFuture<Integer> b = new CompletableFuture<>();
      CompletableFuture<Integer> c = a.thenCombine(b, (y, z)-> y + z);
      executorService.submit(() -> a.complete(f(x)));
      executorService.submit(() -> b.complete(g(x)));

      System.out.println(c.get());
      executorService.shutdown();
  }

}
```

Future a와 b의 결과를 알지 못한 상태에서 thenCombine은 두 연산이 끝났을때 스레드 풀에서 실행될 연산을 만든다. 결과를 추가하는 c 연산은 앞선 두 작업이 끝나기전에는 실행되지 않는다 (블록 X). 따라서 기존의 코드에서 발생했던 블록 문제가 일어나지 않는다. 

## 15.5 pub-sub 그리고 리액티브 프로그래밍 

Future와 CompletableFuture은 독립실행과 병렬석이라는 모델에 기반한다. 연산이 끝나면 get이 Future의 결과를 주고, 따라서 한번만 실행해 결과를 제공한다. 

반면 리액티브 프로그래밍은 시간이 흘러감에 따라 여러 결과를 제공해야한다. 매 초마다 온도값을 제공하는 온도계를 생각하면 쉬울 것이다. 이런 상황에서 여러분은 스트림을 떠올릴 것이다. 프로그램이 스트림에 잘맞으면 사용하면 된다. 그러나 스트림은 두개의 파이프라인으로 값을 분리하거나 분리된 스트림에서 다시 결과를 합치기도 어렵다. 

자바9에서는 Flow 인터페이스에 pub-sub 모델을 사용해서 리액티브 프로그래밍을 제공한다. 

- subscriber가 구독할 수 있는 publisher
- 이 연결 자체를 subscription이라고 한다.
- 연결을 이용해 메시지(혹은 이벤트) 를 전송한다. 
  
## 15.5.1 두 flow를 합치는 예제 

두 정보 소스로 부터 발생하는 이벤트를 합쳐서, 구독자가 볼 수 있도록 하는 예를 보자. 사실 이 예제는 엑셀에서 C3=C1+C3 수식을 사용하는 예제와 동일하다. C1에 변경이 일어나면, 이 사실이 C3에도 반영되어야하기 때문이다. 
```java
public class SimpleCell implements Publisher<Integer>, Subscriber<Integer> {

  private int value = 0;
  private String name;
  private List<Subscriber<? super Integer>> subscribers = new ArrayList<>();

  public static void main(String[] args) {
    SimpleCell c3 = new SimpleCell("C3");
    SimpleCell c2 = new SimpleCell("C2");
    SimpleCell c1 = new SimpleCell("C1");

    c1.subscribe(c3);

    c1.onNext(10); // C1의 값을 10으로 갱신
    c2.onNext(20); // C2의 값을 20으로 갱신
  }

  public SimpleCell(String name) {
    this.name = name;
  }

  @Override
  public void subscribe(Subscriber<? super Integer> subscriber) {
    subscribers.add(subscriber);
  }

  public void subscribe(Consumer<? super Integer> onNext) {
    subscribers.add(new Subscriber<>() {

      @Override
      public void onComplete() {}

      @Override
      public void onError(Throwable t) {
        t.printStackTrace();
      }

      @Override
      public void onNext(Integer val) {
        onNext.accept(val);
      }

      @Override
      public void onSubscribe(Subscription s) {}

    });
  }

  private void notifyAllSubscribers() {
    subscribers.forEach(subscriber -> subscriber.onNext(value));
  }

  @Override
  public void onNext(Integer newValue) {
    value = newValue;
    System.out.println(name + ":" + value);
    notifyAllSubscribers();
  }

  @Override
  public void onComplete() {}

  @Override
  public void onError(Throwable t) {
    t.printStackTrace();
  }

  @Override
  public void onSubscribe(Subscription s) {}
}
```

c1와 c2의 값이 변경되었을 때 c3가 그 사실을 알아야한다. 그리고 c1과 c2은 c3에 전파해야한다. 따라서 simple cell은 publisher이면서 subscriber 이므로 이 두가지를 상속한다. 여기의 main에서는 c3가 직접 c1을 바라본다.  위 결과에서는 다음과 같이 출력된다. 
```
C1: 10
C3: 10 
C2 : 20
```

합산은 어떻게 할까? 합산결과를 저장할 c3은 다음 셀로 교체한다. 
```java
public class ArithmeticCell extends SimpleCell {

  private int left;
  private int right;

  public static void main(String[] args) {
    test1();
    System.out.println("------------");
    test2();
  }

  private static void test1() {
    ArithmeticCell c3 = new ArithmeticCell("C3");
    SimpleCell c2 = new SimpleCell("C2");
    SimpleCell c1 = new SimpleCell("C1");

    c1.subscribe(c3::setLeft);
    c2.subscribe(c3::setRight);

    c1.onNext(10); // C1의 값을 10으로 갱신
    c2.onNext(20); // C2의 값을 20으로 갱
    c1.onNext(15); // C1의 값을 15로 갱신
  }

  private static void test2() {
    ArithmeticCell c5 = new ArithmeticCell("C5");
    ArithmeticCell c3 = new ArithmeticCell("C3");
    SimpleCell c4 = new SimpleCell("C4");
    SimpleCell c2 = new SimpleCell("C2");
    SimpleCell c1 = new SimpleCell("C1");

    c1.subscribe(c3::setLeft);
    c2.subscribe(c3::setRight);

    c3.subscribe(c5::setLeft);
    c4.subscribe(c5::setRight);

    c1.onNext(10); // C1의 값을 10으로 갱신
    c2.onNext(20); // C2의 값을 20으로 갱신
    c1.onNext(15); // C1의 값을 15로 갱신
    c4.onNext(1); // C4의 값을 1로 갱신
    c4.onNext(3); // C4의 값을 3으로 갱신
  }

  public ArithmeticCell(String name) {
    super(name);
  }

  public void setLeft(int left) {
    this.left = left;
    onNext(left + right);
  }

  public void setRight(int right) {
    this.right = right;
    onNext(right + left);
  }

}
```
계속해서 test2 처럼, 셀 간의 구독 그래프 관계를 만들어 나갈 수가 있다. 

리액티브 프로그래밍은 pub-sub과 관련이 있다. 자바 9 flow api의 subscriber에서는 실제로 onError와 onComplete를 지원한다. 기존의 옵저버 패턴보다 이런 부분이 강화되었다. 

Flow 인터페이스에서 주의해야할 두 가지 기능이 있는데, 바로 **압력** 그리고 **역압력**이다. 예를 들어 온도계에서 매초마다 온도를 보고했는데, 기능이 업그레이드 되면서 ms 마다 온도를 보고한다고하자. 이렇게 빨리 발생하는 이벤트를 아무 문제없이 처리할 수 있을까? 이런 상황을 **압력**이라고 부른다. 

이런 상황에서는 통과할 수 있는 이벤트의 수를 제한하는 역압력과 같은 기법이 필요하다. 좀더 자세히 알아보자. 

### 15.5.2 backpressure(역압력)

위에서 간단하게 살펴본것처럼, 어떤 상황에서는 정보의 흐름 속도를 backpressure(흐름제어)로 제어 해야할 필요가 있다. 즉 subscriber가 publisher로 "좀 천천히 보내줘" 라든지 "이만큼만 보낼 수 있다" 라고 알려줄 필요가 있는 것이다. publisher는 여러 subscriber를 가질 수 있으므로 backpressure 요청이 해당 연결에만 딱 영향을 미쳐야하는 것이 문제가 될 수 있다. Flow API 는 이를 위해 `onSubscribe` 메서드를 제공한다. 

```java
void onSubscribe(Subscription subscription);
```

### 15.5.3 실제 역압력 

한번에 한개의 이벤트를 처리하도록 구성하려면... 

- subscriber가 onSubscribe로 전달된 subscription 객체를 로컬로 저장 
- subscriber가 수많은 이벤트를 받지않도록 onSubscribe, onNext, onError의 마지막 동작에 channel.request(1)을 추가하기 
- 요청을 보낸 채널에만 onNext, onError 이벤트를 보내도록 publisher의 notifyAllSubscriber 코드를 바꾼다

# 16장 : CompleteableFuture: 안정적 비동기 프로그래밍 
  
## 16.1 Future의 단순 활용 


