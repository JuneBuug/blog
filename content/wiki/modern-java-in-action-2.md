---
title   : '모던자바인액션: 스트림 소개와 사용' 
slug  : '/modern-java-2'
layout  : wiki 
excerpt : 
date    : 2020-07-01 11:29:27 +0900
updated : 2020-07-03 15:11:29
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

## 4.2 스트림 시작하기

### 컬렉션 스트림
자바8 컬렉션에는 스트림을 반환하는 stream 메서드가 추가됐다. 즉 List, Set등에서 Stream을 얻을 수 있다는 뜻이다. 추가로, 내가 임의로 정한 숫자 범위나 I/O 자원에서도 Stream을 얻을 수 있다. 

스트림은 
- 데이터처리연산을 지원하도록:스트림은 함수형에서 일반적으로 지원하는 연산, 그리고 DB와 비슷한 연산을 지원한다. filter, map, reduce, find, match, sort 등으로 데이터 조작이 가능하다.
- 소스에서 추출된: 스트림은 컬렉션, 배열, I/O 자원 등의 데이터 제공 소스로부터 데이터를 소비한다. 
- 연속된 요소: 컬렉션과 마찬가지로 특정 요소로 이루어진 연속된 값집합의 인터페이스를 제공한다. 컬렉션은 자료구조이므로 주제가 데이터이고, 스트림은 표현 계산으로 데이터 조작을 하는데 주를 두므로 스트림의 주제는 계산이라고 할 수 있다. 

를 말한다.


스트림은 아래처럼 두가지 특징이 있다. 
- 파이프라이닝 : 스트림은 연산끼리 연결해서 커다란 파이프라인을 구성할 수 있도록, **스트림 자신을 반환한다**. 그 덕분에 laziness, 쇼트서킷과 같은 최적화도 얻을 수 있다. 

- 내부 반복 : 스트림은 내부 반복을 지원한다. (콜렉션은 반복자로 명시적으로 반복 / iterator().next 등)


## 4.3 스트림 vs 컬렉션 

아까 위에서 `스트림과 컬렉션은 특정 요소로 이루어진 연속된 값 집합`이다. 차이는 주제가 데이터이냐 계산이다라고 말했다. 이를 좀더 알아보자! 🤔
**연속된** 이라는 말은 랜덤하게 아무 값에나 접근하는 것이 아니라 순차적으로 값에 접근한다는 것이다. 

스트림과 컬렉션의 가장 큰 차이는 **데이터를 언제 계산하느냐**이다. 컬렉션은 현재 자료구조가 포함하는 모든 값을 메모리에 저장하는 자료구조다. 즉, 컬렉션의 모든 요소는 컬렉션에 추가하기 전에 계산되어야한다. 

반면 스트림은 이론적으로는, 요청할 때만 요소를 계산하는 고정된 자료구조다. (스트림에 요소를 추가하거나, 제거할 수 없다.) 이런 특성은 프로그래밍에 큰 도움을 준다. 사용자가 요청하는 값만 스트림에서 추출한다는 것이 핵심이다. 결과적으로, 스트림은 생산자와 소비자 관계를 형성한다. 소비자 중심의 스트림은 요청을 받을 때만 만든다(즉석 제조)

컬렉션은 생산자 중심으로, 소비자에게 생성되기전에 전에 모든 값을 저장해두는 형태를 갖는다. 무한한 소수를 포함하는 콜렉션을 만든다고하자. 이렇게 되면 계속 루프를 돌며 추가하는 과정때문에, 소비자는 영원히 결과를 알 수 없게 된다. 

### 4.3.1 한번만 탐색할 수 있다. 

반복자 (iterator)와 마찬가지고 스트림도 한번만 탐색할 수 있따. 다시 탐색하려면 초기의 데이터 소스에서 새로운 스트림을 만들어야한다. (이때 소스가 재사용이 가능한, 컬렉션 등 이어야한다. I/O 채널이라면 소스는 이미 지나갔으므로 스트림을 만들 수 없다.)

### 4.3.2 외부반복, 내부반복

컬렉션 인터페이스를 사용하려면 for-each 등을 사용하여 직접 사용자가 요소를 반복해야한다. 이를 외부 반복이라고한다. 반면 스트림 라이브러리는 반복을 알아서 처리하고, 결과 값을 어딘가 저장해주는 내부 반복을 사용한다. 

스트림 라이브러리의 내부 반복은 데이터표현과 하드웨어에 따라서 병렬성 구현을 자동으로 선택해준다는 이점도 있다. 반면 외부반복에서는 병렬성을 스스로 관리해야한다. (synchronized로 시작하는 병렬성 구현) 

## 4.4 스트림 연산 

스트림에서는 파이프라이닝이 가능하다고 했다. 그런데, 이렇게 파이프라이닝이 가능하도록 Stream을 반환하는 연산을 중간연산, 그리고 스트림을 닫는 연산을 최종 연산이라고 한다. 

### 4.4.1 중간 연산
filter와 sorted와 같은 연산은 다른 스트림을 반환한다. 중요한 특징은 단말 연산을 스트림 파이프라인에 실행하기 전까지는 아무 연산도 수행하지 않는 다는 것, 즉 lazy 하다는 것이다. 

```java
List<String> names = menu.stream()
        .filter(dish -> {
          System.out.println("filtering " + dish.getName());
          return dish.getCalories() > 300;
        })
        .map(dish -> {
          System.out.println("mapping " + dish.getName());
          return dish.getName();
        })
        .limit(3)
        .collect(toList());
    System.out.println(names);
```

이 프로그램의 실행결과는 다음과 같다. 

```
filtering::pork
mapping::pork
filtering::beef
mapping::beef
filtering::chicken
mapping::chicken
[pork, beef, chicken]
```

menus에는 300칼로리가 넘는 음식이 여러개가 있다. 그러나 limit(3)의 연산까지 고려되어, 모든 요리를 다 고려하는 것이 아니라 처음 3개만 선택되었다. 이는 쇼트서킷이라고 불리는 기법덕분이다. 또한 filer와 map은 서로 다른 연산이지만 한 과정으로 병합되었다. 이를 루프 퓨전이라고 한다. 

### 4.4.2 최종 연산

최종 연산은 스트림에서 결과를 도출한다. 최종 연산에 의해 보통 List, Integer, void 등 Stream이 아닌 결과를 반환한다. collect, count 등이 있다.

### 4.4.3 스트림 이용하기 

즉 스트림은 다음과 같이 이용할 수 있다. 

- 질의를 수행할 데이터 소스  (에서 스트림 만들기)
- 스트림 파이프라인을 구성할 중간 연산 연결
- 스트림 파이프라인을 실행하고 결과를 만들 최종 연산 


# 5장 스트림 활용 

## 5.1 필터링

필터링의 두가지 방법을 배워보자.

- Predicate 필터링
- 고유 요소 필터링 

### 5.1.1. Predicate 필터링 

스트림 인터페이스는 filter 메서드를 지원한다. filter에서는 Predicate(boolean을 반환하는 함수, T -> boolean!) 을 인수로 받아서 이와 일치하는 모든 요소를 반환하는 스트림을 반환한다. 

### 5.2.2 고유 요소 필터링, distinct 
스트림은 고유 요소로 이루어진 스트림을 반환하는 distinct 메서드를 지원한다! 고유의 여부는 객체의 hashCode와 equals 로 결정된다. 중복을 필터링할 때 유용하다.

## 5.2 스트림 슬라이싱 (스트림 요소 선택하기)

## 5.2.1 Predicate로 슬라이싱 
자바 9에 와서는, 스트림의 요소를 효과적으로 선택할 수 있도록 takeWhile, dropWhile의 새로운 메서드를 지원한다. (✨ 한번도 써본적이 없네요!) 

takeWhile은 정렬되어있는 stream에 대해서 filter를 할때 효과적으로 사용할 수 있다. 정렬되어있는 다음 예제를 보자.

```java
List<Dish> specialMenu = Arrays.asList(
        new Dish("season fruit", true, 120, Dish.Type.OTHER),
        new Dish("prawns", false, 300, Dish.Type.FISH),
        new Dish("rice", true, 350, Dish.Type.OTHER),
        new Dish("chicken", false, 400, Dish.Type.MEAT),
        new Dish("french fries", true, 530, Dish.Type.OTHER));
    System.out.println("Filtered sorted menu:");
    List<Dish> filteredMenu = specialMenu.stream()
        .filter(dish -> dish.getCalories() < 320)
        .collect(toList());
    filteredMenu.forEach(System.out::println);

    System.out.println("Sorted menu sliced with takeWhile():");
    List<Dish> slicedMenu1 = specialMenu.stream()
        .takeWhile(dish -> dish.getCalories() < 320)
        .collect(toList());
    slicedMenu1.forEach(System.out::println);
```

이 예제에서는 칼로리가 낮은 순으로 정렬되어있으므로, 이를 이용해서 반복 작업을 줄일 수 있다. 큰 리스트에서는 상당한 차이를 보이는데, takeWhile을 이용하면 정렬 스트림에 대해서 프리디케이트를 적용하여 스트림을 슬라이스 할 수 있다. 


dropWhile은 takeWhile과 정반대의 작업을 수행한다. 즉 dropWhile은 프리디케이트가 처음으로 **거짓**이 되는 지점까지의 요소를 버린다. 

```java
System.out.println("Sorted menu sliced with dropWhile():");
    List<Dish> slicedMenu2 = specialMenu.stream()
        .dropWhile(dish -> dish.getCalories() < 320)
        .collect(toList());
    slicedMenu2.forEach(System.out::println);
```

### 5.2.2 스트림 축소 limit 

스트림은 주어진 값 이하의 크기를 갖는 스트림을 반환하는, limit(n) 메서드를 지원한다.  정렬되지 않은 스트림과 정렬된 스트림에 모두 사용할 수 있으며, 소스가 정렬되지 않았다면 limit의 결과도 정렬되지 않은 상태로 반환한다. 

```java
// 요소 3개(이하)만 갖도록 스트림 반환
 List<Dish> dishesLimit3 = menu.stream()
        .filter(d -> d.getCalories() > 300)
        .limit(3)
        .collect(toList());
```


### 5.2.3. 요소 건너뛰기 skip

스트림은 처음 n개 요소를 제외한 스트림을 반환하는 skip(n) 메서드를 지원한다. 
``` java
  List<Dish> dishesSkip2 = menu.stream()
        .filter(d -> d.getCalories() > 300)
        .skip(2)
        .collect(toList());
```

## 5.3 매핑 (변환)
특정 객체에서 특정 데이터를 선택하는 작업을 매핑이라고 한다. 스트림 API의 map과 flatMap 메서드는 특정 데이터를 선택하는 기능을 제공한다. 

### 5.3.1 스트림 각 요소에 함수 적용하기 map 

스트림은 함수를 인수로 받는 map 메소드를 지원한다. 예를 들어 다음은 `Dish::getName` 함수를 map의 인자로 전달해서 요리명을 추출한다. 
```java
// map
List<String> dishNames = menu.stream()
    .map(Dish::getName)
    .collect(toList());
System.out.println(dishNames);
```

스트림은 파이프라이닝이 가능하므로, 다른 map 메소드를 연결하는 것도 가능하다. 다음은 요리명의 길이를 반환하는 코드이다. 
요리명 추출 -> 길이 추출의 과정을 거친다. 

```java
// map
    List<Integer> dishNamesLength = menu.stream()
        .map(Dish::getName)
        .map(String::length)
        .collect(toList());
    System.out.println(dishNamesLength);
```

### 5.3.2 스트림 평면화 flatMap 

리스트에서 고유한 문자로 이루어진 리스트를 반환해보자. 즉, `["Hello", "World"]` 리스트의 결과로는 `["H", "e","l","o","W","r","d"] 리스트가 나와야한다. 

map을 사용해서 푼다고 해보자. String리스트인 words의 stream을 받아, 하나하나 `split` 함수를 적용하고 distinct 를 하는 방법으로 접근해보자.

```java
words.stream()
     .map(word -> word.split(""))
     .distinct()
     .collect(toList());
```

이 경우 map 의 함수는 `String[]` 을 전달한다. 그런데 우리가 원하는 것은 Stream<String>이므로, 문자열 배열이 와서는 안된다. 여기에서 distinct를 적용하면, 앞의 String 배열과 뒤의 String 배열은 다른 배열이므로 distinct를 한다고 해도 각각의 글자가 필터링되지는 않는다.

flatMap을 사용하면 이 문제를 해결 할 수 있다.

```java
 words.stream()
      .flatMap((String line) -> Arrays.stream(line.split("")))
      .distinct()
      .forEach(System.out::println);
```
flatMap은 각 배열을 스트림이 아니라 스트림의 요소로 매핑한다. 즉, flatMap이 끝나면 하나의 평면화된 스트림을 반환한다. 
![flatmap](./flatmap.png)

## 5.4 검색과 매칭 
특정 속성이 데이터 집합에 있는지 여부를 검색하는 데이터 처리도 자주 사용된다. 

## 5.4.1. anyMatch Predicate가 적어도 한 요소와 일치하면~ 

```java
if (menu.stream().anyMatch(Dish::isVegetarian)) {
   // 이 식당은 비건 메뉴가 있는 식당이다를 출력 
}
```


## 5.4.2. allMatch Predicate가 모든 요소와 일치하면 ~ 

```java
if (menu.stream().allMatch(Dish::isVegetarian)) {
   // 이 식당은 완벽한 비건 식당이다를 출력 
}
```

반면 NoneMatch도 있다. NoneMatch는 allMatch(~Predicate)와 같은 역할을 한다. 즉 주어진 Predicate와 일치하는 요소가 없는지 확인한다. 

위 세 메서드는 쇼트서킷 기법을 활용하는데, 이는 자바의 &&, || 연산과 같은 기법이다. 간단하게 말해서 쇼트서킷은 결과가 눈에 보일 때 뒤의 식을 평가하지않고 종료하는 방법이다. 예를 들어 false && 로 시작하는 식이 있다면, 뒤를 평가하지 않아도 무조건 false이다. true || 로 시작하는 식이 있다면 무조건 true이다. anyMatch 는 Predicate와 일치하는 것이 하나만 있어도 무조건 true이고, allMatch는 하나만 일치하지않아도 false이다. 이런 상황을 쇼트서킷이라고 부른다. 


## 5.4.3 findAny 요소 검색

findAny는 현재의 스트림에서 랜덤한 요소를 반환한다. 
```java
Optional<Dish> dish = menu.stream()
                          .filter(Dish::isVegetarian)
                          .findAny();
```

여기서 Optional을 마주하게 된다. Optional은 값의 존재나 부재 여부를 표현하는 컨테이너 클래스로, Optional 안에는 값이 있을수도 없을 수 도 있다. 자바8에는 null을 반환하거나 NPE를 막기위한 목적으로 Optional이 도입되었다. 

## 5.4.4 findFirst 첫번째 요소 찾기 
```java
Optional<Dish> dish = menu.stream()
                          .filter(Dish::isVegetarian)
                          .findFirst();
```


## 5.5 리듀싱 연산

리듀싱 연산은 모든 스트림 요소를 처리해서 값으로 도출해내는 연산을 의미한다. 함수형 프로그래밍에서는 이 과정이 마치 종이를 작은 조각이 될때까지 반복해서 접는것과 비슷하다고 해서 **폴드**라고 부른다. 

### 5.5.1 요소의 합

for-each를 이용해서 리스트의 숫자요소를 더하는 코드를 생각해보자. 
```java
int sum = 0;
for (int x: numbers){
   sum += x;
}
```
위에서 보면 sum 변수의 초깃값 0이 설정된 이후로, 리스트의 모든 요소를 조합하는 연산 + 가 사용되었다. 이 과정을 reduce로 표현해보자. 

```java
int sum = numbers.stream().reduce(0, (a, b) -> a+b);
```

![reduce](./reduce.png)

한편 초깃값이 없는 reduce도 있다. 그러나 이 reduce는 Optional 객체를 반환한다. 

```java
Optional<Integer> sum = numbers.stream().reduce((a,b) -> (a+b));
```

스트림에 아무값도 없는 경우, 초깃값이 없으므로 합계를 반환할 수 없다. 따라서 합계가 없음을 가리킬 수 있도록 Optional 객체로 감싼 결과를 반환한다. 

### 5.5.2 reduce로 할 수 있는 작업 : 최댓값, 최솟값 

```
Optional<Integer> max = numbers.stream().reduce(Integer::max);
Optional<Integer> min = numbers.stream().reduce(Integer::min);
```

> reduce의 장점은 무엇일까? reduce를 이용하면 내부 반복이 추상화되면서 내부 구현에서 **병렬로** reduce를 실행할 수 있게 된다. 반복적으로 합계를 더하면 sum 변수를 공유해야하므로 쉽게 병렬화하기가 어렵다. 강제적으로 동기화시켜도, 병렬화로 얻을 수 있는 이득이 스레드간 경합때문에 상쇄되어버린다.


## 정리 

다양한 스트림 연산을 살펴보았다. 간단하게 정리해보자. 

- map, filter등은 입력스트림에서 요소를 받아 0 또는 결과를 출력 스트림으로 보낸다. 따라서 (람다나 메소드가 내부적인 가볍 상태가 따로 없다면) 상태가 없는, stateless 연산이라고 한다. 

- 반면 reduce, sum, max 등은 결과를 누적할 내부 상태가 필요하다. 내부 상태는 요소 수와 관계없이 크기가 한정되어있다. 

- 또한 sorted와 distinct 같은 연산은 filter, map처럼 스트림을 받아 스트림을 내보내는 것 처럼 보일 수 있다. 그러나 정렬이나 중복 제거의 연산은 과거의 이력을 알고 있어야한다. 그래서 이 역시 내부 상태를 갖는 stateful한 연산이라고 한다. 이런 경우, 데이터 스트림의 크기가 크거나 무한이라면 문제가 생길 수 있다. 


## 5.7 숫자 스트림

자바 8 에서는 박싱 비용을 세가지 기본형 특화 스트림을 제공한다. 바로 `IntStream`, `DoubleStream`, `LongStream`이다. 각 인터페이스는 sum, max와 같이 숫자관련 리듀싱 연산 메서드를 제공한다. 특화스트림은 박싱 효율성을 제외하고는 일반 스트림과 같은 역할을 한다는 사실을 기억하자. 

Stream을 숫자스트림으로 변환하려면 `mapToInt`, `mapToDouble`, `mapToLong` 을 가장 많이 사용한다. 
```java

int calories = menu.stream()
                   .mapToInt(Dish::getColories) // IntStream 반환 
                   .sum();
```

반면 숫자스트림을 다시 Stream으로 변환하려면 `boxed` 메소드를 사용하면 된다. 

```java
Stream<Integer> stream = intStream.boxed();
```

특화된 스트림말고도, 특화된 Optional도 존재한다. OptionalInt, OptionalDouble, OptionalLong은 실제로 값이 없는 경우와 있는 경우를 구분하는데 사용된다. 

```java
OptionalInt maxCalories = menu.stream()
                              .mapToInt(Dish::Calories)
                              .max(); // menu가 비었다면, maxCalories는 null일 수 있다. 
```

이때 `orElse`를 사용해서 명시적으로 기본값을 설정해줄 수 있다. 

### 5.7.2 range로 숫자 Stream만들기 

IntStream과 LongStream에서는 range와 rangeClosed라는 두 가지 정적 메소드를 갖는다. range는 (시작값, 종료값)인 반면 rangeClosed는 [시작값, 종료값] 이라는 차이가 있다. 

```java
IntStream.range(1,100); // 2부터 99까지의 IntStream
IntStream.rangeClosed(1,100); // 1부터 100까지의 IntStream
```

## 5.8 스트림 만들기 

- Stream.of 

  정적메서드 Stream.of 를 사용해서 스트림을 만들 수 있다. 
  ```java
  Stream<String> stream = Stream.of("Modern", "Java", "In", "Action");
  ```
- Stream.ofNullable
  null이 될수도 있는 객체로도 스트림을 만들 수 있다. 
  ```java
  Stream<String> stream = Stream.ofNullable(System.getProps("home"));
  ```
  위에서 System 의 getter의 결과값은 null일수도, 아닐 수도 있다. 
  
- Arrays.stream
  배열을 스트림으로 만들 수 있다. 
  ```java
  int[] numbers = {2,3,5,7};
  int sum = Arrays.stream(numbers).sum(); 
  ```
- 파일로 스트림 만들기
  파일을 처리하는 I/O 연산등에 사용하는 자바의 NIO API도 스트림을 사용할 수 있게 업데이트 되었다. 
  예를 들어 Files.lines 는 주어진 파일의 행 스트림을 문자열로 반환한다. 
  ```java
  // package java.nio.file의 Files class 
   public static Stream<String> lines(Path path, Charset cs) throws IOException {
        // Use the good splitting spliterator if:
        // 1) the path is associated with the default file system;
        // 2) the character set is supported; and
        // 3) the file size is such that all bytes can be indexed by int values
        //    (this limitation is imposed by ByteBuffer)
        if (path.getFileSystem() == FileSystems.getDefault() &&
            FileChannelLinesSpliterator.SUPPORTED_CHARSET_NAMES.contains(cs.name())) {
            FileChannel fc = FileChannel.open(path, StandardOpenOption.READ);

            Stream<String> fcls = createFileChannelLinesStream(fc, cs);
            if (fcls != null) {
                return fcls;
            }
            fc.close();
        }

        return createBufferedReaderLinesStream(Files.newBufferedReader(path, cs));
    }

  ```

- Stream.iterate, Stream.generate
  
  함수에서 스트림을 만들수 있는 정적메서드이다. 두 연산을 이용해서 크기가 고정되지 않은 **무한스트림**을 만들 수 있다. 

  ```java
  Stream.iterate(0, n-> n+2)
        .limit(10)
        .forEach(System.out::println);
  ```
  iterate 메소드는 초깃값과 람다를 받아 새로운 값을 끊임없이 생산할 수 있다. 여기서는 이전 결과에 2를 더한 값을 반환한다. 결과적으로 위 스트림은 짝수 스트림을 생성한다. 0, 2, 4 ... iterate는 기본적으로 기존 결과에 의존해 순차적인 연산을 수행한다. 

  자바9의 iterate 메소드는 프리디케이트를 지원한다.  예를 들어 초기값, 정지조건, 생성조건을 지정할 수 있는 식이다. 
  ```java
  IntStream.iterate(0, n -> n< 100, n -> n+4)
           .forEach(System.out::println);
  ```
  이 메소드는 0에서 시작해서 4씩 더해가다가, 100보다 수가 크면 종료한다. 
   
  
  generate 메소드는 연속적으로 값을 계산하지않는다는 점에서 iterate와 차이가 있다. generate는 Supplier<T>를 인수로 받아서 새로운 값을 생성한다. 

  ```java
  Stream.generate(Math::random)
        .limit(5)
        .forEach(System.out::println);
  ```

  이 코드는 0과 1 사이 임의의 double 을 리턴한다. () -> T 를 리턴하니 Supplier이고, limit가 없다면 이 스트림은 언바운드 상태가 된다. 

  이 경우 무한한 크기를 가진 스트림을 처리하고 있으므로 limit를 이용해서 명시적으로 크기를 제한해야한다. 그렇지 않으면 최종 연산에서 아무런 결과도 계산되지 않는다. 마찬가지로 정렬하거나 리듀스도 할 수 없다. 

  
