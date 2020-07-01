---
title   : '모던자바인액션: 스트림' 
slug  : '/modern-java-2'
layout  : wiki 
excerpt : 
date    : 2020-07-01 11:29:27 +0900
updated : 2020-07-01 11:42:57 +0900
tags    : 
---

# 4장 스트림 소개 
  
## 4.1 스트림이란 무엇인가? 

Stream은 자바 8 API 에 새로 추가된 기능이다. 스트림을 사용하면 선언형으로 컬렉션 데이터를 처리할 수 있다. 선언형은 SQL 과 같이, 데이터를 직접 처리하는 코드를 작성하지 않고 질의로 명백히 표현하는 것을 말한다. for 문을 돌면서 매번 이 값이 100을 넘는 지 검사하는 것은 선언형이 아니지만, `100을 넘는 값만 찾아라` 라고 값을 넘기면 선언형이다. 

스트림을 이용하면 멀티스레드 코드를 구현하지 않아도 데이터를 투명하게 병렬로 처리할 수 있다. 예제를 한번 보자. Java 7 , Java 8 로 저칼로리의 음식만을 반환하는 예제를 살펴본다. 

```java
public static List<String> getLowCaloricDishesNamesInJava7(List<Dish> dishes) {
    List<Dish> lowCaloricDishes = new ArrayList<>();
    for (Dish d : dishes) {
      if (d.getCalories() < 400) {
        lowCaloricDishes.add(d);
      }
    }
    List<String> lowCaloricDishesName = new ArrayList<>();
    Collections.sort(lowCaloricDishes, new Comparator<Dish>() {
      @Override
      public int compare(Dish d1, Dish d2) {
        return Integer.compare(d1.getCalories(), d2.getCalories());
      }
    });
    for (Dish d : lowCaloricDishes) {
      lowCaloricDishesName.add(d.getName());
    }
    return lowCaloricDishesName;
  }
```

```java
public static List<String> getLowCaloricDishesNamesInJava8(List<Dish> dishes) {
    return dishes.stream()
        .filter(d -> d.getCalories() < 400)
        .sorted(comparing(Dish::getCalories))
        .map(Dish::getName)
        .collect(toList());
  }
```

일단 길이의 차이를 보시라! java 7에서는 직접 내용을 구현했지만, java8에서는 조건을 명시하고 적절한 stream API 를 사용하는 것만으로 내용을 처리했다. 더불어 java 8 코드를 멀티코어환경에서 병렬로 실행하고 싶다면, **stream()을 parallelStream()** 으로 바꿔서 처리할 수 있다. 

이런 스트림의 형태는 명시적으로 다음과 같은 이득을 준다. 

- 선언형으로 코드를 구현할 수 있다. 즉, 루프와 조건문 등 제어 블록을 사용해서 어떻게 구현할지 지정할 필요가 없이, '동작의 수행을 어떻게 할지'만 정해주면 된다.  이렇게 되면 변하는 요구사항에 쉽게 대응할 수 있다. 기존의 코드를 복사 붙여넣기 하지않고, 람다를 이용해서 저칼로리 대신 고칼로리의 요리를 필터링하도록 할 수 있다. 
  
- 위에서처럼 여러 빌딩블록 연산을 연결해서, **복잡한 데이터 처리 파이프라인을** 만들 수 있다. 여러 연산을 파이프라인으로 연결해도 여전히 가독성과 명확성이 유지된다. 이 예제에서 filter의 결과는 sorted로, 이 결과는 map으로 ... 계속 연결된다. 

즉 자바8의 스트림API 의 특징을 다음처럼 요약할 수 있다. 
- 선언형 : 더 간결하고 가독성이 좋다.
- 조립할 수 있음: 유연성이 좋아진다. (파이프)
- 병렬화: 성능이 좋아진다.

> filter (혹은 sorted, map, collect) 와 같은 연산은 **하이레벨 빌딩 블록** 이므로, 특정 스레딩 모델에 제한되지 않고 자유롭게 어떤 상황이든 사용할 수 있다. 내부적으로 단일 스레드 모델에 사용할 수 있지만, 멀티코어 아키텍처를 최대한 활용하게 되어있다. 결과적으로 우리는 데이터 처리과정을 병렬화 하면서도 ... 스레드와 락을 걱정할 필요가 없다! 

> 컬렉션을 제어하는데 도움되는 다른 라이브러리들 : 구아바, 아파치, 람다제이 구아바는 구글에서 만든 라이브러리로, 멀티맵, 멀티셋등 추가적인 컨테잌너 클래스를 제공한다. 아파치 라이브러리도 비슷한 기능을 제공한다. 람다제이는 선언형으로 컬렉션을 제어하는 다양한 유틸을 제공한다. 

## 4.2 스트림 시작하기. 
