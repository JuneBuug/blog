---
layout  : wiki
title   : 'generic type 감싼 type : Parameterized Type'
excerpt : 'Response<T> 형태를 알아보자구'
date    : 2020-05-24 00:41:35 +0900
updated : 2020-05-24 15:51:37 +0900
tag     : 
toc     : true
public  : true
parent  : 
---

현재 있는 서비스에서는 DTO 를 List로 내려주는 것이 아니라, 항상 특정한 형태로 내려준다. 바로 **Response** 형태! 
이 Response class는, paging을 위해서 만들어진 커스텀 클래스인데 🙂  항상 `Response<T>` 의 형식으로 사용한다.  이와 같이,  T (파라미터가 되는 클래스) 를 품고 있는 클래스(여기서는 Response)의 타입을 일반적으로 **Parameterized Type**이라고 한다. 비단 커스텀 클래스가 아니더라도, 우리가 자주 사용하는 `List<T>` 역시 Parameterized Type 이라고 할 수 있겠다.  찬찬히 생각해볼 수록 꽤 논리적인 네이밍이다. 

아래 코드를 보자. 
```java
@Getter
@ToString
@EqualsAndHashCode
public class Response<T> {
    private List<T> results;
    private String nextKey;

    public Response(List<T> results, String nextKey) {
        this.results = results;
        this.nextKey = nextKey;
	}
	
    @JsonGetter
    public boolean hasMore() {
        return StringUtils.isNotEmpty(nextKey);
    }
}
```


## 문제상황 

문제는, 이 Response를 가지고 테스트를 할 때 `Type`을 유추할 수 가 없다는 것이다. 일반적으로 controller 테스트에서 다음과 같이 mvc request를 하고, 그 결과를 다시 매핑해서 유효한 값인지 확인한다.  

```java

@Test 
void 테스트() {
   
    // 유저 하나의 정보를 호출하는 경우
	MvcResult result = mockMvc.get("/v1/users/123")
	       			          .andReturn();
							  
	UserDto user = objectMapper.readValue(result.getResponse().getContentAsString(), UserDto.class);
	// 간단하게 UserDto 의 타입을 유추할 수 있다. 


	MvcResult result2 = mockMvc.get("/v1/users")
	       			          .andReturn();
	
	Response<UserDto> users = objectMapper.readValue(result2.getResponse().getContentAsString(), 
	                                                 Response<UserDto>.class) // 컴파일 에러 ! 
}
```
단일 결과를 받을 때는 결과 string 을 UserDto 로 쉽게 매핑할 수 있지만, 아래 `Response<UserDto>` 의 경우 에러가 발생한다. 이는 `Response<UserDto>.class` 혹은 `Response<UserDto.class>.class` 등으로 parametizedType을 유추할 수가 없기 때문이다. 파라미터를 품었기때문에 일반적인 방식으로는 유추가 불가능한 것! 

## 잠깐..  근데 나는 UserDto.class도 익숙하지 않은데? 

더 진행하기 전에 UserDto.class 라는 형식에 대해서도 짚고 넘어가자. 

위에서 objectMapper 의 `readValue` 클래스가 그렇듯이, 클래스나 JavaType을 메소드의 파라미터로 받는 경우가 있다. 파라미터의 **종류** 를 이야기할 때 이를 **타입토큰** 이라고 하고, 그 값으로는 **클래스 리터럴** 을 넘긴다. 클래스 리털은 User.class, Product.class와 같이 `<클래스명>.class` 의 형식을 띄고 있다.

![클래스리터럴과 타입토큰](./typetoken.png) 


## 다시 돌아와서, parametized type 은 어떻게 하는데?

위에서 지적했듯이, 파라미터를 품은 형태는 `<클래스명<T>.class` 등의 방식으로는 유추가 불가능하다. 그러면 어떻게 objectMapper 가 원하는 `JavaType`으로 넘겨줄 수 있을까?

### 첫번째 방법 (jackson : typereference 사용) 

첫번째는 jackson 의 typereference를 사용하는 방법이다. 
```java
{
 // 중략
	MvcResult result2 = mockMvc.get("/v1/users")
	       			          .andReturn();
	
	Response<UserDto> users = objectMapper.readValue(result2.getResponse().getContentAsString(), 
	                                                 new TypeReference<Response<UserDto>>() { }) // 정상 컴파일 
}
```
`TypeReference<T>` 의 T 자리에 우리가 원하던 `Response<UserDto>` 를 넘겨주면, 자동으로 **타입을 유추**하여 진행해준다. 

- 편리하고 깔끔하다. 
- 하지만 `{ }` 로 클래스를 정의하는 것이라서 보기에 따라 깔끔하지 않을 수 있다. 
  
### 두번째 방법 

jackson의 Typefactory로 공통 type referencing 로직을 넣는 방법이다. 따로 유틸 클래스에 다음과 같은 메소드를 정의한다. 

```java
 protected static JavaType getParametizedType(Class<?> parametrized, Class<?>... parameterClasses) {
        return TypeFactory.defaultInstance().constructParametricType(parametrized, parameterClasses);
}
```

objectMapper는 `JavaType`을 받으므로, 해당하는 값을 맞춰주기 위해서 TypeFactory를 사용했다. 이 constructParametricType이라는 메소드는 parametized Type을 의미하는 JavaType을 만들어주는 팩토리 메소드이다. 우리의 예제에서는 parametrized 에 `Response.class`를 , 그리고 parameterclasses에는 `UserDto.class` 를 넘겨줄 수 있다. 

```java
{
 // 중략
	MvcResult result2 = mockMvc.get("/v1/users")
	       			          .andReturn();
	
	Response<UserDto> users = objectMapper.readValue(result2.getResponse().getContentAsString(), 
	                                                 Util.getParametizedType(Response.class, UserDto.class)) // 정상 컴파일 
}
```

### 결론 & TO-DO 

이렇게 간단하게 일단 parametized type과 그 타입 유추를 알아보았다.
사실 이 글을 작성하면서, 이 parametized type 의 타입 유추를 하는 과정에서 `슈퍼타입토큰`의 개념을 알게되었고, jackson에서 제공하는 슈퍼타입토큰이 `TypeReference` 이고 spring에서는 `ParametizedType`을 사용한다는 것을 알게 되었다. 제네릭 클래스를 매핑할 때 생기는 타입 erasure을 막고, 타입 안정성을 보장하는 과정이 super type token 이라고 하는데 요 개념을 추가해서 이 글을 개선하려고한다. 

## 참고 

https://homoefficio.github.io/2016/11/30/%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%A6%AC%ED%84%B0%EB%9F%B4-%ED%83%80%EC%9E%85-%ED%86%A0%ED%81%B0-%EC%88%98%ED%8D%BC-%ED%83%80%EC%9E%85-%ED%86%A0%ED%81%B0/

https://umbum.dev/925
https://multifrontgarden.tistory.com/135
