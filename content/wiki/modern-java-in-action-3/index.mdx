---
title   : '모던 자바 인 액션: 6장, 7장'
slug  : 'modern-java-3'
layout  : wiki 
excerpt : 
date    : 2020-07-07 17:32:25 +0900
updated : 2020-07-08 17:27:33
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

reducing 함수는 시그니처가 다른 세가지가 있다. 기본형은 인수를 세개 받는다. 

- 첫번째: 리듀싱 연산의 시작값이거나, 스트림에 인수가 없을때는 반환값 
- 두번째 : 변환함수
- 세번째 : 같은 종류의 두 항목을 하나로 만드는 BinaryOperator 
  
```java
public static <T, U>
    Collector<T, ?, U> reducing(U identity,
                                Function<? super T, ? extends U> mapper,
                                BinaryOperator<U> op) 
```

하나의 인수를 갖는 reducing 을 이용해서 고칼로리 요리를 찾는 방법도 존재한다. 
```java
Optional<Dish> mostCalorieDish = menu.stream().collect(reducing( (d1, d2) -> d1.getCalories() > d2.getCalories()? d1 : d2)); 
```

이 경우 `reducing(스트림의 첫번째 요소, Function::Ientity)` 하는 상황이다.

이렇게 함수형 프로그래밍에서는 하나의 연산을 다양한 방법으로 해결할 수 있다. 

## 6.3 그룹화 
데이터 집합을 하나 이상의 특성으로 분류하는 그룹화 연산도 DB에서 많이 수행되는 액션이다. 자바8의 함수형을 사용하면 가독성 있는 한 줄의 코드로 그룹화를 구현할 수 있다. 

메뉴 예제를 보자. 고기를 포함하는 그룹, 생선을 포함하는 그룹, 나머지 그룹으로 메뉴를 나눌 수 있다. 

```java
Map<Dish.Type, List<Dish>> dishesByType = menu.stream().collect(groupingBy(Dish::getType));
// {FISH=[prawns, salmon], OTHER=[fries, rice], MEAT=[pork, beef]}
```
스트림의 각 요리에서 Dish.Type과 일치하는 모든 요리를 추출하는 함수를 groupingBy 메서드로 전달했다. 
더 복잡한 분류 기준이 필요한 상황에서는 메소드 참조 (::로 구성되는) 를 사용할 수가 없다. 칼로리를 400 이하를 diet, 700이상을 fat, 그 사이를 normal로 구분한다고 하자. 이를 구분하는 map을 만들려면 람다 표현식을 사용해야한다. 

```java
public enum CaloricLevel { DIET, NORMAL, FAT } 

Map<CaloricLevel, List<Dish>> dishesByCaloricLevel = menu.stream().collect(
	groupingBy(dish -> { 
	   if (dish.getCalories <= 400) return CaloricLevel.DIET; 
	   else if (dish.getCalories < 700) return CaloricLevel.NORMAL;
	   else return CaloricLevel.FAT;
	}));
```

이렇게 하나의 기준으로 분류하는 방법은 쉽다. 혹시 두 가지 기준으로도 그룹화 할 수 있을까? 👀

### 6.3.1 그룹화된 요소 조작 

고기, 생선, OTHER 요리 그룹에서 500 칼로리가 넘는 요리만 필터하고 싶다. 바로 filter를 적용하는 방법을 떠올릴 수 있다. 

```java
Map<Dish.Type, List<Dish>> res = menu.stream().filter(dish -> dish.getCalories > 500)
				              .collect(groupingBy(Dish::getType));
```
이 경우, fish 에는 500 칼로리가 넘는 음식이 없으므로 이미 그 메뉴는 사라진 뒤에 map으로 그룹핑하게 된다. 결과적으로 `OTHER = [fries], MEAT=[pork]` 와 같이 fish 키가 사라진다. 

#### filtering 
이 경우 `groupingBy` 메소드에 필터조건을 넘겨서 해결할 수 있다. 

```java
menu.stream().collect(
        groupingBy(Dish::getType,
            filtering(dish -> dish.getCalories() > 500, toList())));
```

#### mapping 

매핑함수를 이용해 요소를 변환할 수도 있다. 지금 오브젝트 형인 Dish를 이름만 뽑아서 list에 넣어보자. 다음과 같이 할 수 있다. 
```java
menu.stream().collect(
        groupingBy(Dish::getType,
            mapping(Dish::getName, toList())));
```

#### flatMapping 
filter, map을 했으니 flatMapping도 가능하다.  
다음처럼 요리에 태그를 붙였다고 하자. 

```java
  public static final Map<String, List<String>> dishTags = new HashMap<>();
  static {
    dishTags.put("pork", asList("greasy", "salty"));
    dishTags.put("beef", asList("salty", "roasted"));
    dishTags.put("chicken", asList("fried", "crisp"));
    dishTags.put("french fries", asList("greasy", "fried"));
    dishTags.put("rice", asList("light", "natural"));
    dishTags.put("season fruit", asList("fresh", "natural"));
    dishTags.put("pizza", asList("tasty", "salty"));
    dishTags.put("prawns", asList("tasty", "roasted"));
    dishTags.put("salmon", asList("delicious", "fresh"));
  }
```
flatMapping을 사용하면 '음식 종류마다 어떤 태그가 있는지' 간편하게 계산할 수 있다. 

```java
Map<Dish.Type, Set<String>> res = 
menu.stream().collect(
        groupingBy(Dish::getType,
            flatMapping(dish -> dishTags.get(dish.getName()).stream(), toSet())));
```

![flatmapping](./flatmapping.png)

### 6.3.2 Map 이 포함된 Map으로 그룹화하기 
Groupingby를 두번 사용해서 level 이 두단계인 map을 만들어낼 수 있다. 
```java
 private static Map<Dish.Type, Map<CaloricLevel, List<Dish>>> groupDishedByTypeAndCaloricLevel() {
    return menu.stream().collect(
        groupingBy(Dish::getType,
            groupingBy((Dish dish) -> {
              if (dish.getCalories() <= 400) {
                return CaloricLevel.DIET;
              }
              else if (dish.getCalories() <= 700) {
                return CaloricLevel.NORMAL;
              }
              else {
                return CaloricLevel.FAT;
              }
            })
        )
    );
  }
```

groupingBy 의 연산을 버킷 개념으로 생각하면 쉽다. 첫번째 groupingBy는 key 라는 버킷을 만든다. 그리고 준비된 각각의 버킷을 서브스트림 컬렉터로 채워가기를 반복해서 n-level의 그룹화를 달성한다. 

## 6.4 분할 

분할은 분할 함수라고 불리는 predicate를 분류함수로 사용하는 특수한 기능이다. 결과적으로 그룹화 맵은 최대 두개의 그룹으로 분류된다. 예를 들어 채식요리를 분리하는 경우를 생각해보자. 

```java
  private static Map<Boolean, List<Dish>> partitionByVegeterian() {
    return menu.stream().collect(partitioningBy(Dish::isVegetarian));
  }
// false = [pork, beef], true =[fries, rice]
```
이제 partitionByVegeterian.get(true) 로 모든 채식요리를 얻을 수 있다. 

## 6.5 Collector 인터페이스 
지금까지 toList나 groupingBy 등 Collector 인터페이스를 구현하는 컬렉터를 살펴보았다. 당연하게도 이미 구현되어있는 컬렉터를 제외하고 직접 인터페이스를 구현해서 효율적으로 문제를 해결하는 컬렉터를 만들 수 도 있다. 

```java
public interface Collector<T, A, R> {
   Supplier<A> supplier();
 
   BiConsumer<A, T> accumulator();

   BinaryOperator<A> combiner();

   Function<A, R> finisher();

   Set<Characteristics> characteristics();
```
Collector 인터페이스는 다음과 같다. 

- T 는 스트림 요소의 타입이다. 

- A는 누적자의 형식이다. 즉 수집과정에서 중간 결과가 어디에 저장되는지 생각해보자.

- R 은 결과 객체의 형식이다. 
  
예를 들어 toList를 간결하게 적어보면 다음과 같다. 
```java
public class ToListCollector<T> implements Collector<T, List<T>, List<T>>
```

-   Supplier<A> supplier();
    - Supplier, 즉 인수를 받지않고 결과가 튀어나오는 클래스를 반환해야한다.
    - toList에서는 `return () -> new ArrayList<T>` 로 표현된다. 
    - `ArrayList::new` 로 간단히 할 수도 있다.
    
-   BiConsumer<A, T> accumulator();
    - 리듀싱 연산을 하는 함수를 반환한다. 
    - toList에서는 다음과 같다. 
      ```java
       return (list, item) -> list.add(item);
      ```
-   BinaryOperator<A> combiner();
    - 스트림을 병렬 처리할 때, 누적자는 어떻게 이 결과를 처리해야하는가
    - toList에서는 다음과 같다. 병렬처리과정 1에서 받은것은 그냥 list에 추가로 add하면 된다.
      ```java
      return (list1, list2) -> list1.addAll(list2); return list1;
      ```

-   Function<A, R> finisher();
    -  중간 누적자를 최종 결과로 변환할 때 사용 
    - List에서는 누적된 것을 그대로 반환하므로 다음과 같다. 
      ```java
      return Function.identity();
      ```
-   Set<Characteristics> characteristics();
    - Characteristics 는 enum이다. 
    - 이 컬렉터의 연산이 어떤 특성을 가지고 있는지를 정의한다. 
    - UNORDERED : 리듀싱 결과가 스트림 요소의 방문 순서나 누적 순서에 영향을 받지 않는다. 
    - CONCURRENT : 다중 스레드에서 accumulator 함수를 동시에 호출해도 되고, 병렬 리듀싱을 수행할 수 있다. 
    - IDENTITY_FINISH : finisher 메서드가 반환하는 함수가 항등함수(IDENTITY, 즉 Function.identity()) 이다. 
    - toList의 경우 IDENTITY_FINISH이면서.. 또한 리스트의 순서가 상관이 없으므로 UNORDERED, CONCURRENT 이므로 세가지 속성을 다 가지고 있다. 

# 7장: 병렬데이터 처리와 성능 


