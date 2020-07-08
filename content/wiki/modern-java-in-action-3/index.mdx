---
title   : '모던 자바 인 액션: 6장, 7장'
slug  : 'modern-java-3'
layout  : wiki 
excerpt : 
date    : 2020-07-07 17:32:25 +0900
updated : 2020-07-08 11:35:27
tags    : 
   - Java
---

# 6장: 스트림으로 데이터 수집

이전에 배웠던 스트림의 중간 연산은 스트림의 요소를 소비하지 않는다. 반면 스트림의 **최종 연산**은 스트림의 요소를 소비해서 최종 결과를 도출한다. 🙂 이 장에서는 최종 연산 collect 사용에 있어서 다양한 인수를 받아서 처리하는 방식을 배운다. 
- Collection
- Collector 
- collect (함수)

는 다른 것이니 헷갈리지 말도록하자. collect를 사용하면 Map, List가 포함된 Map, Map을 포함한 Map 등 다양한 방식의 컬렉션을 반환할 수가 있다. 역시 자바8의 람다를 사용하면 이런 형식을 반환할 때 굉장히 간결하다는 걸 알 수 있다. 

## 6.1 컬렉터란 무엇인가? 
함수형 프로그래밍에서는 `무엇을 원하는지` 를 명시할 수 있어서 어떻게 얻을지는 고민할 필요가 없다. filter 에 조건만 넣으면 어떻게 순환하면서 리스트에 넣을지는 고민안해도 되는 것이 바로 이 지점이다. 대신 collect 를 사용해서, 스트림의 요소를 어떻게 도출할지 지정한다. 5장에서는 toList(각 요소를 리스트로 만들어주세요~) 를 이용해서 Collector 인터페이스의 구현체로 사용했다. 앞으로는 groupingBy를 사용해서 key-value가 구성되는 map으로 만들어라 라는 동작을 수행한다. 

### 6.1.1 고급 리듀싱의 기능을 수행하는 컬렉터 

컬렉터를 사용하면, 결과를 수집하는 과정을 간단하면서도 유연하게 정의할 수 있다. 보통 함수를 요소로 변환 (대개 toList 처럼 내용은 않고, 자료구조를 변환) 하는 경우 컬렉터를 적용한다. 이때 이 최종 결과를 저장하는 자료구조에 값을 누적한다. 컬렉터는 내부 자체적으로 리듀싱 연산을 사용해서 효율적으로 자료구조 변환을 진행한다. 


### 6.1.2 기존에 제공하는 컬렉터
Collectors에서 제공하는 메소드의 기능은 크게 세 가지로 구분할 수 있다.
- 스트림 요소를 하나의 값으로 리듀스 하고 요약
- 요소 그룹화
- 요소 분할 : Predicate를 함수로 사용한다.

지금은 무슨 말인지 잘 와닿지 않지만, 차근차근 알아보자.

## 6.2 리듀싱과 요약 

컬렉터로 스트림의 항목을 컬렉션으로 재구성할 수 있다. 예제로 살펴보자. 

### counting : 스트림 항목의 갯수를 세자

```java
long howManyDishes =  menu.stream().collect(counting());
```
이는 간단하게 이렇게 쓸 수 있다. 
```java
long howManyDishes = menu.stream().count();
```

### maxBy, minBy : 최댓값과 최솟값을 찾자. 
`Collectors.maxBy` 로 최댓값을, `Collectors.minBy` 로 스트림의 최솟값을 찾을 수 있다. 최대, 최소라는 값은 자의적이고 비교를 위해서는 기준이 필요하다. Comparator 가 그 기준이 되어준다. 

```java
Comparator<Dish> dishCaloriesComparator = Comparator.comparingInt(Dish::getCalories);
// 칼로리의 크기를 비교하는 comparator
Optional<Dish> mostCalorieDish = menu.stream().collect(maxBy(dishCaloriesComparator);
```
애초에 소스인 menu가 비어있다면 최대 칼로리 음식은 존재하지 않으므로, 두가지 상황을 모두 대응하기 위해서 `Optional<Dish>` 로 타입을 받는다. 

### 요약 연산 

Collectors 클래스는 summingInt 라는 특별한 메소드를 제공한다. 이 메소드는 `객체 -> int` 하는 함수를 인수로 받는다. 

```java
int totalCalories = menu.stream().collect(summingInt(Dish::getCalories));
```
이 summingInt는, 각 Dish에서 칼로리를 뽑아서.. 초기값 0에 누적해서 값을 더한다. 결과적으로는 menu에 들어있는 Dish의 칼로리 합, 즉 총 칼로리를 알 수 있다. 

- summingLong
- summingDouble 
역시 동일한 방식으로 동작하며, 최종값이 long, double 형식으로 떨어진다는 점만 다르다. 요런 단순 합계도 있으니 다른 연산도 존재하는데... 🌝 평균값이다. 

- averagingInt
- averagingLong
- averagingDouble 

로 평균을 낼 수 있다. 

이런 값을 종합적으로 한번에 볼 수도 있다. `summarazingInt` 는 스트림의 통계를 한번에 보여준다. ⚡️  

```java
IntSummaryStatistics menuStatistics = menu.stream().collect(summarzingINt(Dish::getCalories));
// 결과 
IntSummaryStatistics(count = 9, sum = 4300, min = 120 , average = 477.77778, max  = 800);
```
마찬가지로 

- summarizingLong : 결과값은 LongSummaryStatistics
- summarizingDouble  : 결과값은 DoubleSummaryStatistics
메소드 역시 존재한다. 

### 6.2.3 joining: 문자열 연결 
joining 을 사용하면 **객체에 toString**을 적용한 값을 모두 이어서 반환한다. 

```java
String shortMenu = menu.stream().map(Dish::getName).collect(joining());
// porkbeefchickenfrench friesrice
```
이러면 구분이 안되게 되므로 seperator를 지정해줄 수 있다. 

```java
String shortMenu = menu.stream().map(Dish::getName).collect(joining(",");
// pork,beef,chicken,french fries,rice
```
### 6.2.4 범용 리듀싱 연산 : reducing으로 위 연산을 요약해봐요

위에서 살펴본 summarzing, summing,averaging, joining 등은 `reducing` 메서드로 요약할 수 있다. 
> 헐 그러면 위에건 왜 써요? 😡 

프로그래밍적 편의성때문이다. reducing  + 함수를 하는 것보다 joining 등으로 명확하게 해주는게 보기도 좋고 알기도 쉽다. 

reducing은 인수를 세개 받는다. 


