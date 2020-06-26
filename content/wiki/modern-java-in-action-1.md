---
title   : '모던자바인액션 1장, 2장, 3장' 
slug  :  '/modern-java-1'
layout  : wiki 
excerpt : 
date    : 2020-06-26 15:25:52 +0900
updated : 2020-06-26 21:46:55 +0900
tags    : 
---

# 1. 자바 8,9,10,11 : 무슨일이 일어나고 있는가? 

자바8는 자바 버전을 통틀어서 가장 큰 변화다. 자바 8 이전의 대부분 프로그램은 멀티코어 머신에서도 하나의 코어만을 지원했다. 나머지 코어를 활용하려면 **스레드**를 활용하는 것이 일반적인 방법이었다. 하지만 스레드는 관리하기가 어렵고, 많은 문제가 발생할 수 있다는 단점이 있다. 

이 부분을 보완하기 위해서 자바는 다양한 방식으로 발전해왔다. 1 버전에서는 스레드, 락, 메모리 모델까지 지원했고, 자바 5에서는 스레드 풀, 자바 7에서는 포크/조인 프레임워크를 제공했다. 그러기를 반복해 자바 8에서는 이런 병렬 실행을 효율적으로 하는 방법을 알아냈다. 

- 스트림 API
- 메서드에 코드를 전달하는 기법(메서드 참조, 람다)
- 인터페이스의 디폴트 메서드

자바 8은 병렬 연산을 지원하는 **스트림**이라는 새로운 API 를 제공한다. 우리가 SQL 을 사용하면 DBMS에서 알아서 최적의 실행계획을 짜주는 것처럼, 스트림 역시 최적의 병렬 실행 방법을 알아서 선택해준다. 

그러면 메서드에 코드를 전달하는 기법이 왜 중요한가? 이를 위해서는 자바의 배경을 간략하게 짚고 넘어가야한다. 

자바는 대중적이고 잘 설계된 객체지향 언어로 시작했다. 캡슐화 덕분에 C에 비해 엔지니어링적인 문제가 훨씬 적었고, 객체지향이라는 정신적 모델 덕분에 윈도우 95 및 그 이후의 프로그래밍 모델에 쉽게 대응할 수 있었다. 또한 write-once, run-everywhere를 지원하는 JVM 언어의 특징도 있었다. 

하지만 생태계에 변화가 생겼다. 프로그래머는 빅데이터를 맞이하면서, 멀티코어나 컴퓨팅 클러스터를 이용해서 **많은 양의 데이터를 효과적으로** 처리해야할 필요성이 늘었다. 이런 생태계에서 자바는 어떻게 대응해야했을까? 

자바 8은 세가지 개념을 사용해서 이런 현상을 대응하고, 시장에서 요구하는 기능을 효과적으로 제공한다. 

### 1.2.2  스트림 처리 

첫번째 프로그래밍 개념은 스트림 처리다. **스트림**이란 한번에 한개씩 만들어지는 연속적인 데이터 항목들의 모임이다. 이론적으로, 프로그램은 입력 스트림에서 데이터를 하나씩 읽어 들이며 마찬가지로 출력 스트림으로 데이터를 한 개씩 기록한다. 

스트림의 처리 방식은 자동차 생산라인에 비유할 수 있다. 각 작업장에서는 자동차를 받아서 작업한 뒤, 다음 작업장에서 처리할 수 있도록 넘겨준다. 컨베이어 벨트 자체는 자동차를 물리적인 순서로 **한개씩 운반** 하지만, 각각의 작업장에서는 **동시에 작업을 처리한다**. 

우선은 자바의 Stream API 역시, 컨베이어 벨트 조립 라인처럼 어떤 항목을 연속으로 제공하는 기능이라고 생각하자.  핵심은 기존에는 한번에 한 항목을 처리햇찌만 이제 자바8에서는 우리가 하려는 작업을 추상화해서, 일련의 스트림으로 만들고 처리할 수 있다는 것이다. 또한 스트림 파이프라인을 사용해서 입력 부분을 여러 CPU 코어에 쉽게 할당할 수 있다는 부가적인 이득도 얻을 수 있다. 스레드라는 복잡한 작업을 사용하지 않고도 공짜로 병렬성을 얻을 수 있다. 

### 1.2.3 동작 파라미터화로 메서드에 코드 전달하기

두번째 개념은 코드 일부를 API로 전달하는 기능이다. 예를 들어 sort를 생각해보자. 2020KR0001, 2019US0002, ... 등의 송장 ID가 있다고 생각해보자. 이는 세가지 방법으로 sort할 수 있다. 처음 부분인 연도, 그다음 부분인 나라, 그다음 부분인 고객ID로 말이다. sort의 동작은 이렇게 구체적이지 않으므로 원하는 대로 정렬하도록하려면 sort에 따로 코드를 제공해야한다. 

자바 8에서는 메서드를 다른 메서드의 인수로 넘겨주는 기능을 제공한다. (즉 함수가 first citizen으로서 기능함) 이 기능을 이론적으로 **동작 파라미터화**라고 부른다. 

### 1.2.4 병렬성과 공유 가변데이터 

세번째 개념은 '병렬성을 공짜로 얻을 수 있다'는 말에서 시작된다. 그럼 우리는 병렬성을 얻는 대신 무엇을 포기해야할 까? 스트림 메서드로 전달하는 코드의 동작 방식을 바꿔야한다. 스트림 메서드로 전달될 수 있는 코드는 다른 코드와 동시에 실행하더라도 **안전하게 실행될 수 있어야한다**. 

안전한 코드를 만들려면 공유된 가변 데이터에 접근하지 않는 함수여야한다. 이런 함수를 순수 함수(= 부작용 없는 함수, 상태 없는(stateless) 함수) 라고 부른다. 하지만 공유된 변수가 객체가 있는 상태에서는 문제가 발생한다. 

가변데이터를 공유하지 않는 것, 그리고 메서드를 다른 메서드로 넘기는 기능 이 두 가지는 함수형 프로그래밍 패러다임의 핵심이기도 하다.

>  자바 8에 추가된 새로운 개념들 살펴보기 💪

## 1.3  자바 함수 

자바 8 이전까지 자바의 일급시민은 객체였다. 프로그래밍 언어의 핵심은 값을 바꾸는 것이고, 이 바꿀수 있는 값은 일급시민이라고 부른다. 자바에서 바꿀 수있는 값은 primitive type인 int, double 그리고 **객체**이니까. 전달하고 (메서드의 파라미터로서) 변경할 수 없는 값은 이급시민이다. 

그러므로 오랫동안 객체와 기본값은 자바에서 일급시민이엇지만 메서드와 클래스 등은 이급 시민이었다. 자바 8 설계자들은 런타임에 메서드를 전달하여 (메서드의 일급 시민화) 사용한다면 유용하다는 점을 깨닫고 그런 기능을 추가했다. 

### 1.3.1 메서드와 람다를 일급 시민으로

이를 위한 첫번째 기능은 **메서드 참조** 이다. 디렉터리에서 모든 숨겨진 파일을 필터링한다고 가정하자. File 클래스는 isHidden 메서드를 제공한다.  

```java
// 자바 8이전
File[] hiddenFiles = new File(".").listFiles(new FileFilter() {
     public boolean accept(File file) {
        return file.isHidden();
     }
})
```

자바 8이전에는  이미 File에 isHidden 메서드가 있는데도 FileFilter를 사용해서 복잡하게 감싸서 사용해야했다. 

```java
// 자바 8 이후 
File[] hiddenFiles = new File(".").listFiles(File::isHidden); 
```

`::` 라는 자바의 메서드 참조를 이용해서 준비된 함수를 전달했다. 기존에 비해 문제를 명쾌하게 설명한다는 것이 자바8 코드의 장점이다. 

**람다:익명함수** 역시 메서드 일급 시민만들기의 일부이다. 메서드를 직접 정의할 수 도 있지만, 당장 쓸만한 클래스나 메서드가 없을 때 익명함수인 람다를 간단하게 구현할 수 있다. 람다는 다음과 같은 형식을 띈다. 
```java
(int x) -> x + 1 
```

### 1.3.2 코드 넘겨주기의 예제 

코드를 넘겨준다, 즉 메서드를 일급시민으로 취급하는 예제를 살펴보자. 

사과 클래스가 있다. 그리고 두가지 일을 하고 싶다. 

- 초록 사과만 분류하고싶다. 
- 무게가 150g이 넘는 사과만 분류하고 싶다. 
  
여기에서 초록사과, 무게가 150g이 넘는 사과는 조건에 해당한다. 분류하는 작업, 다시 말해 특정 항목을 선택해서 반환하는 동작은 필터(filter) 라고한다. 만약 코드 넘겨주기가 없다면 우리는 사과 클래스 안에 두가지 메소드를 만들어야할 것이다. 

```java
public static List<Apple> filterGreenApples(List<Apple> inventory)  {
    List<Apple> result = new ArrayList<>(); 
    // 새로운 리스트 결과에 green apple만 add하는 코드
}

public static List<Apple> filterHeavyApples(List<Apple> inventory)  {
    List<Apple> result = new ArrayList<>(); 
    // 새로운 리스트 결과에 Heavy Apple만 add하는 코드
}
```
이렇게 반복되는 코드를 작성하다보면...  견딜 수 없는 수준에 이른다 😭. 다행히 자바 8에서는 코드를 인수로 넘겨줄 수 있으므로 filter 부분을 중복으로 구현할 필요가 없다.  

```java
public static boolean isGreen(Apple apple) {
 return GREEN.equals(apple.getColor());
}

public static boolean isHeavy(Apple apple) {
 return apple.getWeight() > 150;
}

static List<Apple> filter(List<Apple> inventory, Predicate<Apple> p) {
   List<Apple> result = new ArrayList<>();
   // 조건 p 에 맞는 사과만 result에 add
}
```
Predicate는 수학에서 인수로 값을 받아 boolean을 반환하는 함수를 말한다. `Function<T, Boolean>` 과 같은 개념이다. (T는 임의의 타입) 

### 1.3.3 메서드 전달에서 람다로 

위의 isHeavy나 isGreen은 한두번만 사용될 메소드이다. 이를 매번 정의하는 것은 귀찮은 일이다. 이를 람다로 치환하여 사용할 수 있다. 

```java
filter(inventory, (Apple a) -> GREEN.equals(a.getColor());
```
즉 한번만 사용할 메서드는 따로 정의를 구현할 필요가 없다. 다만, 람다가 몇 줄 이상으로 길어진다면 이름을 가진 메서드를 정의하고 메서드 참조를 활용하는 방향이 바람직하다.

위에서는 직접 정의한 filter 메서드를 사용했지만, 자바 8은 스트림 API 내부에 filter 와 비슷한 연산 집합을 포함하는 기능을 제공한다. 스트림을 한번 살펴보자. 

## 1.4 스트림 

자바 어플리케이션은 컬렉션을 만들고 활용한다. 그런데 컬렉션을 자바 8 이전 버전으로 다루려면 조금 많은 코드가 필요하다. 😭 예를 들어, 리스트에서 조건에 맞게 필터링한다음 멤버로 그룹화 해야한다고 하자. 그러면 매번 거대한 for 문을 돌아야한다.

```java

for (Transaction transaction: list) {

    if ( ... ) {} // 필터링 
    // 추출
    if ( ...) {} // 그룹화 맵 
    
    // 탐색된 것을 리스트에 추가
}

```

스트림 API를 사용하면 간단하게 문제를 풀수 있다. 

```java

Map<Currency, List<Transaction>> result = transactions.stream()
                                                      .filter(t -> t.getPrice() > 1000) // 필터링
                                                      .collect(groupingBy(Transaction::getCurrency)) // 그룹화, map으로 만들기

```

위의 for-each 방식 반복을 외부반복이라고하고, 스트림 API 방식은 내부반복이라고 한다. 내부반복을 사용하면 라이브러리 내부에서 모든 데이터가 처리된다. 외부 반복처럼 처리하는 것은 단일 CPU, 단일 코어로 처리하는 일이다. 따라서 거대한 데이터가 들어왔을 때 감당하기 어려울 수 있다. 스트림API를 사용하면 다른 코어에 일을 할 당할 수 있으므로 이론상 8개 코어 컴퓨터에서 병렬로 8배 빠르게 작업을 처리할 수 있다.


### 1.4.1 멀티스레딩은 어렵다. 

멀티스레딩은 어렵다. 이 환경에서 각 스레드는 공유 데이터에 동시에 접근하고 갱신할 수 있어서, 잘 제어하지 못하면 데이터가 엉망이 된다. 그래서 순차적인 모델보다 다루기가 훨씬 어려워진다. 

자바8은 스트림 API로 
- 컬렉션을 처리하면서 발생하는 모호함과 반복
- 멀티코어 활용 어려움 😭

이라는 두가지를 해결했다. 기존 컬렉션에서는 데이터 처리할 때 반복되는 패턴이 너무 많았다. 즉 대부분 데이터를 
- 필터링
- 추출
- 그룹화 

하는 동작이다. 

## 1.6 함수형 프로그래밍에서 가져온 다른 유용한 아이디어 

- Optional은 여태까지의 NPE를 효과적으로 풀어내줄 클래스이다. `Optional<T>`는 값을 갖거나 갖지 않을 수 있도록하는 컨테이너 클래스이다. 
- 구조적 패턴 매칭 기법

# 2. 동작 파라미터화 코드 전달하기 

요구사항이 바뀌는 건, 소프트웨어 엔지니어링에서 피할 수 없는 문제다. 시시각각 변하는 요구에는 어떻게 대응해야할까? 비용이 최소화되면 좋겠다. 또한 추가 기능은 쉽게 구현하고 장기적으로 유지보수가 쉬우면 좋겠다.

**동작 파라미터화**를 이용하면 변하는 요구사항에 효과적으로 대응할 수 있다. 동작 파라미터화는, 아직은 어떻게 실행할 건지 결정되지 않은 코드 블록을 의미한다. 

## 2.1 변화하는 요구사항에 대응하기
녹색 사과만 필터링하는 요구 사항이 있다고 해보자. 그러면 사과 리스트를 받아서, 녹색 사과를 분류하는 코드를 작성하면된다. 

```java
 public static List<Apple> filterGreenApples(List<Apple> inventory) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
      if (apple.getColor() == Color.GREEN) {
        result.add(apple);
      }
    }
    return result;
  }
```

그럼 빨간 사과는 어떻게 분류할까? 색을 파라미터로 함께 받으면 된다. 
```java
public static List<Apple> filterApplesByColor(List<Apple> inventory, Color color) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
      if (apple.getColor() == color) {
        result.add(apple);
      }
    }
    return result;
  }
```

이번엔 색 말고 무게라는 요구 사항이 생겼다고해보자. 

```java
 public static List<Apple> filterApplesByWeight(List<Apple> inventory, int weight) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
      if (apple.getWeight() > weight) {
        result.add(apple);
      }
    }
    return result;
  }
```

... 이런식으로 무한히 가다보면, 가능한 모든 속성으로 필터링하는 메소드가 등장한다. 문제가 잘 정의되어있는 상황이라면 유효한 방법일 수도 있다. 하지만 불특정하게 요구사항이 계속 늘어난다면? 


## 2.2 동적 파라미터화 

위의 내용을 아주 추상화해보자.

> 사과의 어떤 속성에 기초해서 boolean 값을 반환하는 방법을 만들자.

 T -> boolean인 함수를 프레디케이트라고 한다. 선택조건을 정의하는 인터페이스를 만들자. 
```java
interface ApplePredicate {
    boolean test(Apple a);
  }
```

```java
 public static List<Apple> filter(List<Apple> inventory, ApplePredicate p) {
    List<Apple> result = new ArrayList<>();
    for (Apple apple : inventory) {
      if (p.test(apple)) {
        result.add(apple);
      }
    }
    return result;
  }
```

이제 우리가 전달한 ApplePredicate 객체에 의해 filterApples 메서드의 동작이 결정된다.
지금까지 살펴본것처럼 컬렉션 탐색 로직자체와, 각 항목에 적용할 **동작**을 분리할 수 있다는 것이 동적 파라미터화의 장점이다. 

### 2.3.1 익명 클래스 

그런데 위처럼 사용하려면 ApplePredicate를 implements한 다음 클래스들을 추가해줘야한다. 
```java
 static class AppleColorPredicate implements ApplePredicate {

    @Override
    public boolean test(Apple apple) {
      return apple.getColor() == Color.GREEN;
    }

  }
```

또한 매번 AppleColorPredicate()라는 형식으로 인스턴스화해주어야한다. 클래스의 선언과 인스턴스화를 간단하게 할 방법이 없을까? 

**익명 클래스**는 자바의 지역 클래스와 비슷한 개념이다. 이름이 없는 클래스로, 선언과 인스턴스화를 동시에 할 수 있다. 

```java
 List<Apple> redApples2 = filter(inventory, new ApplePredicate() {
      @Override
      public boolean test(Apple a) {
        return a.getColor() == Color.RED;
      }
    });
```

하지만 여전히 익명클래스로도 공간을 많이 차지하고, 프로그래머들이 익명 클래스의 사용에 익숙하지 않다. 

자바의 람다 표현식을 사용하면 위 예제를 훨씬 간단하게 구현할 수 있다. 


```java
List<Apple> result = filterApples(inventory, (Apple apple) -> RED.equals(apple.getcolor()));
```


# 3. 람다 표현식 

## 3.1 람다란 무엇인가?

람다 표현식은 익명 함수를 단순화한 것이라고 할 수 있다. 이름은 없지만, 파라미터 리스트, 바디, 반환 형식, 발생할 수 있는 예외 리스트는 가질수도 있다.

- 익명 : 보통 메서드와 달리 이름이 없으므로 익명이라 표현한다.
- 함수 : 특정 클래스에 종속되지 않으므로 메서드 대신 함수라고 표현한다.
- 전달 : 람다 표현식을 메서드 인수로 전달하거나 변수로 저장할 수 있다.
- 간결성 : 익명 클래스처럼 많은 코드를 구현할 필요가 없다. 

위 세가지는 알겠는데, 간결성은 무슨 얘기일까? 바로 예제로 보자. 

기존 코드는 다음과 같다. 
```java
Comparator<Apple> byWeight = new Comparator<Apple>() {
    public int compare(Apple a1, Apple a2) {
        return a1.getWeight().compareTo(a2.getWeight());
    }
}
```
람다를 이용한 코드는 아래와 같다. 

```java
Compartor<Apple> byWeight = (Apple a1, Apple a2) ->  a1.getWeight().compareTo(a2.getWeight());
```

위와 같이, 람다 표현식은 세 부분으로 이루어진다. 

- 파라미터 리스트
- 화살표 : 파라미터 리스트와 바디를 구분한다
- 바디 : 람다의 반환값에 해당한다.

## 3.2 어디에 람다를 사용할까?

함수형 인터페이스를 기대하는 곳에서만 람다 표현식을 사용할 수 있다. 

### 3.2.1 함수형 인터페이스 

`Predicate<T>` 를 기억하는지? `Predicate<T>`가 바로 함수형 인터페이스이다. 오직 하나의 추상 메서드만 지정하기때문이다. 
```java
public interface Predicate<T>{
    boolean test (T t);
}
```
함수형 인터페이스는 정확히 **하나의 추상메서드를** 지정하는 인터페이스이다. 예로는 Comparator, Runnable 등이 있다. 
람다로 함수형 인터페이스의 실제 구현을 전달할 수 있으므로, 람다는 사실상 함수형 인터페이스의 인스턴스로 취급할 수 있다. 

```java
Runnable r1 = () -> System.out.println("스터디 길어ㅠㅠ"); // 람다 사용 

Runnable r2 == new Runabble() {
    public void run() {
        System.out.println("아이고아이고");
    }
}
```

### 3.2.2 함수 디스크립터 

함수 디스크립터는 람다에서의 메소드 시그니처를 표현하는 메서드를 말한다. 예를 들어 Runnable 인터페이스의 유일한 메서드 run은 인수와 반환값이 없고, 이를 구현하는 람다도 따라서 () -> void의 형태를 띈다. 

## 3.3 람다 활용: 실행 어라운드 패턴

예를 들어 파일을 열고 처리하고 닫는 패턴을 생각해보자. 이 경우 매번 파일을 처리하는 부분만 달라지고, 열고 닫는 부분은 **재사용**이 가능하다. 즉 setUp - processFile - tearDown의 과정이 있을 때, processFile의 동작만 파라미터화 하여 다른 동작을 수행하도록 할 수 있다. 


람다를 이용해서 동작을 전달할 수 있다. processFile 메서드가 한번에 두 행을 읽게 하려면 어떻게 할까?
```java
String result = processFile((BufferedReader br) -> br.readLine() + br.readLine());
```

즉 최종적으로는 위와 같이 `processFile` 메소드가 람다를 받도록하고 싶다. 

람다는 함수형 인터페이스 자리에만 사용이 가능하므로, BufferedReader를 받아 String을 리턴하는 함수형 인터페이스를 만들어줘야한다. 이 인터페이스 이름을 BufferedReaderProcessor라고 하자. 

```java
@FunctionalInterface
public interface BufferedReaderProcessor {
    String process(BufferedReader b) throws IOException;
}
```

이제 이 인터페이스를 processFile 메서드의 인수로 받도록 하자. 

```java
public String processFile(BufferedReaderProcessor p) throws IOException {
        // 여기에서 p.process를 실행하여 동작을 그대로 전달한다.
}
```

이제 이렇게 되면, 원래 의도했던 것처럼 동작을 파라미터화하여, 변경사항에 맞춰서 사용이 가능하다. 
```java
// 한행만 처리하자 

String oneLine = processFile(br -> br.readLine());

String twoLines = processFile(br -> br.readLine() + br.readLine());

```

## 3.4 함수형 인터페이스의 사용  

이미 자바 API는 다양한 함수형 인터페이스를 포함하고 있다. 여기서는 다음 세 가지 인터페이스를 알아본다. 

- Predicate
- Consumeer
- Function

### 3.4.1 Predicate 

`Predicate<T>` 인터페이스는 test라는 추상 메서드를 정의한다. 이는 제네릭 T를 받아 -> boolean을 리턴한다. 
```java
@FunctionalInterface
public interface Predicate<T> {

    /**
     * Evaluates this predicate on the given argument.
     *
     * @param t the input argument
     * @return {@code true} if the input argument matches the predicate,
     * otherwise {@code false}
     */
    boolean test(T t);
```

### 3.4.2 Consumer

`Consumer<T>` 인터페이스는 제네릭 T -> void이다. consume이 아니라 accept이라는 메소드를 사용한다. 
```java
@FunctionalInterface
public interface Consumer<T> {

    /**
     * Performs this operation on the given argument.
     *
     * @param t the input argument
     */
    void accept(T t);
```

### 3.4.3 Function

`Function<T,R>`은 제네릭 T -> 제네릭 R를 반환한다. apply 메소드를 사용한다. 
```java
@FunctionalInterface
public interface Function<T, R> {

    /**
     * Applies this function to the given argument.
     *
     * @param t the function argument
     * @return the function result
     */
    R apply(T t);
```

## 3.5 형식 검사, 형식 추론, 제약 

람다가 함수형 인터페이스를 구현한다고 했지만... 일반적인 구현체처럼, 추상형에 대한 정보가 들어있지는 않다. 
그럼 어떤 함수형 인터페이스를 가져가는지 어떻게 아느냐? 그것은 바로 람다의 context를 사용해서 알게 되는 것이다. 

```java
filter (inventory, (Apple apple) -> apple.getWeight() > 150)
```

- 가장 먼저 filter의 정의를 확인한다. 확인해보니 filter 메소드의 두번째에는 Predicate<T>가 들어간다.
- T는 여기서 Apple이군!
- `Predicate<Apple>` 의 추상 메서드는?
- `boolean test(Apple apple)` 이 되겠구만.

### 3.5.2 같은 람다, 다른 함수형 인터페이스 

여기서 람다는 input과 output만 형식이 같으면 얼마든지 다른 함수형 인터페이스로 사용될 수 있다. 

```java
Callable<Integer> c = () -> 42;
PrivilegedAction<Integer> p = () -> 42;
```

같은 람다지만 다른 함수형 인터페이스로 사용되었다.

### 3.5.3 형식 추론

위의 과정을 통해 람다가 어떤 함수형인터페이스를 구현하는지 알게되었으므로, 사실 

```java
filter (inventory, (Apple apple) -> apple.getWeight() > 150)
```
에서의 Apple 등의 형은 생략이 가능하다. 즉 

```java
filter (inventory,  apple -> apple.getWeight() > 150)
```
로 쓰는 것이 가능하다. 

### 3.5.4 지역 변수 사용

람다 역시, 받은 인수가 아닌 외부 변수를 사용하는 것이 가능하다. 단, 이 경우 변수가 사실상 상수(final) 이어야한다. 

```java
// 가능 
int port = 1337;
Runnable r = () -> System.out.prinln(port); 


// 불가능 
int port2 = 8080;
Runnable r2 = () -> System.out.prinln(port2); 
port2 = 8090;  // 재할당되었기 때문이다. 
```

## 3.6 메서드 참조 

메서드 참조를 이용하면 기존의 메서드 정의를 재활용해서 람다처럼 전달할 수 있다. 
```java
inventory.sort((a1, a2) -> a1.getWeight().compareTo(a2.getWeight)); // 기존 코드 
inventory.sort(comparing(Apple::getWeight)); // 기존 코드 
```

- 정적 메서드 참조 : Integer의 static 메소드 parseInt는 `Integer::parseInt`
- 인스턴트 메서드 참조: String의 length 메서드는 `String::length`
- 기존 객체의 인스턴스 메서드 참조 : User user = new User(); 일때, `user::getName` 으로 표현할 수 있다. 


### 3.6.2 생성자 참조 

`ClassName::new` 처럼 클래스명과 new 키워드를 이용해서 기존 생성자의 참조를 만들 수 있다. 

```java
Supplier<Apple> c1 = Apple::new; 
// 이는 Supplier<Apple> c1 = () -> new Apple(); 과 같다. 
```

## 3.8 람다 표현식을 조합할 수 있는 유용한 메서드

Predicate를 잘 살펴보면, 다음과 같은 디폴트 메서드가 있다 (추상 메서드가 아님, 즉 함수형 인터페이스의 정의에서 벗어나지 않는다.)

```java
 default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }
```

이를 이용해서, 초록색이면서 무거운 사과를 선택하도록 **두 람다를 조합할 수 있다.** 

```java
Prediacte<Apple> green = a -> a.getColor.equals(GREEN);
Predicate<Apple> greenAndHeavy = green.and(apple -> apple.getWeight() > 150);
```

이런 식으로, 조합을 사용할 수 있다. 즉, 단순한 람다표현식을 조합해서 더 복잡한 람다 표현식을 만들 수 있다.

이런 조합은 Comparator, Predicate, Function 등 다양한 함수형 인터페이스에서 찾아 볼 수 있다.

Function의 `andThen`을 잠깐 볼까? 이는 수학의 g(f(x)) 처럼 동작한다. 

```java
Function<Integer, Integer> f = x -> x+1; 
Function<Integer, Integer> g = x -> x * 5; 
Function<Integer, Integer> h = f.andThen(g);
int result = h.apply(1);
// 이는 h(1) = g(f(1)) = g(2) = 10 처럼 동작한다. 
```

