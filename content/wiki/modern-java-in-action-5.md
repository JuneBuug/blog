---
title   : 'Java 8, 9 Optional 사용하기' 
slug  :  '/optional'
layout  : wiki 
excerpt : 
date    : 2020-07-28 15:26:34 +0900
updated : 2020-07-30 18:19:29
tags    : 
---

# 11장. null 대신 Optional 클래스 
NPE는 모든 자바 개발자를 괴롭히는 예외중 하나다. null 참조를 처음 설계할 때는 null 구현으로 값이 없는 상황을 가장 단순하게 구현할 수 있다고 판단했다. 
후에 null 을 설계한 호어는 이를 10억달러짜리 실수라고 표현했다. 💵🦋

## 11.1 값이 없는 상황을 어떻게 판단할까?

```java
person.getCar().getInsurance().getName();
```

Car 필드가 `@NotNull` 로 설정되어있지 않은 이상, 위 코드에서 car가 null 일 때가 있을 것이다. `getCar()` 이 null 인 경우, 여기까지는 코드가 에러없이 작동한다. 그러나 null 에 대해서 `getInsurance` 를 호출하는 순간 NPE 가 발생하면서 프로그램 실행이 중단된다. 

이런 경우 NPE를 막으려면 어떻게 해야할까? 간단하게는  null 확인 코드를 추가하는 방법이 있다. 

```java
if (person ! = null) {
   if (person.getCar() != null) {
    // 반복 
   } 
}
```

위 코드에서는 모든 순간마다 null 체크 코드를 추가한다. 확실히 알고 있는 도메인을 모델링할 때는 null 체크를 생략하도록, 즉 notnull 하게 설정할 수 있지만 현실적으로는 모든 필드에 대해서 이를 알기는 어렵다. 따라서 위와같은 반복패턴이 만들어지는데, **코드의 구조도 엉망이 되고 가독성도 떨어지는** 방법이다. 

```java
if (person == null) {
  return "Unknown";
}

if (person.getCar() == null) {
  return "Unknown"; 
}
// .. 반복
```
이 방식은 조금 다른 방식으로 중첩을 없앴다. null 인 경우 바로 반환하여 출구를 만들어준 것이다. 하지만 이 방법 역시 좋은 방법은 아니다. return 할 여지가 4개나 생겼기때문에 코드의 유지보수성이 떨어진다. 

### 11.1.2. null 때문에 발생하는 문제 

- 에러의 근원이다 : NPE는 자바에서 **가장 흔하게 발생하는 에러다.** 

- 코드를 어지럽힌다. : 중첩 null 체크 코드를 추가해야해서 코드가 가독성이 떨어진다. 
  
- 아무 의미가 없다. : null은 아무 것도 표현하지 않는다. 특히 정적 타입 언어에서 `값이 없음`을 표현하는 방법으로는 적절하지 않다.

- 자바 철학에 위배된다 : 자바는 개발자로부터 모든 포인터를 숨겼지만, `null 포인터` 는 숨기지 못했다. 
  
- 형식 시스템에 구멍을 만든다: null은 무형식이며 정보가 없으므로 모든 참조 타입에 null을 할당할 수 있다. (Object 타입) 이런 식으로 null이 할당되면 시스템의 다른 부분으로 null이 넘어갔을 때 애초에 무슨 의미로 사용되었는지 알 수 없다. 
  
### 11.1.3. 다른 언어는 null 대신 뭘 쓰나요?

그루비에서는 안전 내비게이션 연산자 `?` 을 도입해서 null  을 해결했다. 
```groovy
def carInsuranceName = person?.car?.insurance?.name
```
이 체인 호출에 null이 있으면 중간에 null을 반환하고 끝낸다.  자바 7에서도 이와 같은 제안이 있었지만 채택하지 않았다. 하스켈, 스칼라등의 함수형 언어는 완전히 관점을 달리해서 null을 접근한다. 하스켈은 Maybe, 스칼라는 Option이라는 `값을 갖거나 갖지않는` 구조를 제공하여 이 문제를 해결한다. 그리고 이 구조에서 제공하는 연산을 사용해서 값이 실제로 있는지를 명시적으로 확인해야한다. 

자바 8에서는 후자인 `선택형 값` 개념의 영향을 받아 `Optional` 이라는 새로운 클래스를 제공한다. 

## 11.2 Optional 클래스 소개 

Optional은 값을 갖고 있거나 갖지않는 클래스이다. 값이 있으면 그 값을 감싼 Optional을 반환하고, 없으면 `Optional.empty` 라는 팩토리 메서드로 특별한 싱글턴을 반환한다. null은 NPE가 바로 나지만 empty는 객체 상태이므로 활용하기가 더 편리하다.

#### 빈 Optional 
```java
Optional<Car> optCar = Optional.empty(); 
```

정적 팩토리 메서드 empty로 빈 optional 객체를 얻을 수 있다. 

#### null 아닌 값으로 Optional

```java
Optional<Car> optCar = Optional.of(car);
```
이때 car가 null이라면 즉시 NPE을 발생시킨다. 

#### null로 Optional 만들기 
```java
Optional<Car> optCar = Optional.ofNullable(car);
```
car가 null이면 빈 Optional 객체가 반환된다. 

#### Optional의 값을 추출하기 : map 

Optional은 Stream과 그 사용이 닮은 점이 많다. 편하게 생각하면, Optional은 0-1개의 값만 가질 수 있는 Stream이라고 생각하면 된다. Optional 역시 Stream에서 사용했던 map 함수를 사용할 수 있고, 이를 통해 값을 꺼낼 수 있다. 

```java
Optional<Insurance> optInsurance = Optional.ofNullable(insurance); 
Optional<String> name = optInsurance.map(Insurance::getName);
```
#### Optional 객체를 체이닝하자 :  flatMap

다음 코드는 동작하지 않는다. 
```java
Optional<String> name = optPerson.map(Person::getCar)
                                 .map(Car::getInsurance)
				 .map(Insurance::getName);
```

변수 optPerson의 형식은 `Optional<Person>` 이므로, map을 호출할 수 있다. 하지만 여기에서 getCar가 `Optional<Car>` 을 반환하므로.. `Optional<Optional<Car>` 가 된다. (person이 `Optional<Car>` 형식으로 변함) 

flatMap을 사용하면 이차원의 optional을 일차원의 optional로 평평하게 만들 수 있다. 
```java
String name = person.flatMap(Person::getCar)
      		    .flatMap(Car::getInsurance)
        	    .map(Insurance::getName)
      		    .orElse("Unknown");
```

### 11.3.4 Optional 스트림 조작

자바 9에서는 Optional을 포함하는 스트림을 쉽게 처리할 수 있도록 Optional 에 stream() 메서드를 추가했다.

Optional을 포함하는 스트림을 사용하고 값을 얻을 때는 다음과 같이 접근할 수 있다. 
```java
Stream<Optional<String>> stream = ... 
Set<String> result = stream.filter(Optional::isPresent)
                           .map(Optional::get) 
			   .collect(toSet());
```

### 11.3.5 디폴트 액션, Optional unwrap 

- get() 은 값을 읽는 가장 간단한 메서드지만 제일 위험하기도 하다. 값이 없는 경우 **NoSuchElementException**을 발생시킴! 
  
- orElse를 사용하면 디폴트 값을 제공할 수 있다. 
  
- orElseGet(Supplier) 를 사용하면 lazy 하게 값을 처리할 수 있다. Optional에 값이 없는 경우에만 실행되기때문이다. 만약 디폴트 값을 만들기 위해서 시간이 걸린다고 하면 이 메서드를 사용하는게 이득일 수 있다. 
  
- orElseThrow 값이 없는 경우, 예외를 발생시킨다. 단, 원하는 예외를 선택해서 발생시킬 수 있다. 
  
- ifPresent 를 사용하면 값이 존재할 때 인수로 넘겨준다. 
  
Java9 에서는 다음 메서드가 추가되었다. 

- ifPresentOrElse : Optional이 비었을 때 실행할 수 있는 runnable을 추가로 받는다. 

### 11.3.6 두 Optional을 합치기 
두 Optional을 받아서 Optional을 반환하는 null-safe한 메서드를 구현해야한다고 하자. 두 인수 중 하나라도 비었으면 빈 Optional을 반환한다. 
```java
public Optional<Insurance> nullsafeMethod(Optional<Person>, Optional<Car> car) {
   return person.flatMap(p -> car.map(c-> findCheapstInsurance(p, c)));
}
```
첫번째 Optional에 flatMap을 호출했으므로, 첫 Optional이 비어있다면 람다 표현식이 실행되지 않고  그대로 빈 Optional 을 반환한다. 두번째 Optional은 map을 호출하는데 이때 car가 비어있다면 Function은 빈 Optional을 반환하므로 결과적으로 이 method가 null-safe하게 optional을 반환한다. 

### 11.3.7 필터로 특정값 거르기 

Optional에 filter 메서드를 사용하면, 값이 있는 경우 **해당하는 값을 반환하고** 없는 경우나 filter의 Predicate 와 일치하지 않는 경우  빈 Optional 객체를 반환한다.

### 참고할 Optional facts 🏷

**기본형 Optional을 사용하지 말아야하는 이유** 
> Optional도 특화된 OptionaInt, OptionalLong등을 제공한다. Stream에서는 많은 요소를 가질 때 unboxing 비용을 절약할 수 있다고했으나, Optional은 최대 하나 이므로 성능을 개선할 수 없다. 기본형은 더불어 map이나 flatMap, filter등을 지원하지 않으므로 권장하지 않는다.



## 참고 

https://www.daleseo.com/java8-optional-after/ 

내가 제일 좋아하는 optional설명 글은 이거 
  
