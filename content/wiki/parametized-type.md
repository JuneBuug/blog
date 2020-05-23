---
layout  : wiki
title   : 'generic type 감싼 type : Parameterized Type'
excerpt : 'Response<T> 형태를 알아보자구'
date    : 2020-05-24 00:41:35 +0900
updated : 2020-05-24 01:52:29 +0900
tag     : 
toc     : true
public  : true
parent  : 
---

현재 있는 서비스에서는 DTO 를 List로 내려주는 것이 아니라, 항상 특정한 형태로 내려준다. 바로 **Response** 형태! 
이 Response class는, paging을 위해서 만들어진 커스텀 클래스인데 🙂 , 비단 DTO List 만 갖고 있지 않고 nextKey, hasmore 등의 값들을 통해 클라이언트가 페이징 판단을 쉽게 해준다. 항상 이 형태는 `Response<T>` 의 형태를 가진다. 이런 식으로 T (파라미터가 되는 클래스) 를 품고 있는 클래스(여기서는 Response)의 타입을 일반적으로 부를 때  Parameterized Type이라고 한다. 찬찬히 뜯어보면 꽤 논리적인 네이밍이다. 

아래 코드를 보자. 
```java
package com.linecorp.kao.core.web.common.response;

import static java.util.stream.Collectors.toList;

import java.util.Collections;
import java.util.List;
import java.util.function.Function;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;

import com.fasterxml.jackson.annotation.JsonGetter;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

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


	MvcResult result = mockMvc.get("/v1/users")
	       			          .andReturn();
	
	Response<UserDto> users = objectMapper.readValue(result.getResponse().getContentAsString(), Response<UserDto>.class) // 컴파일 에러 ! 
}
```
단일 결과를 받을 때는 결과 string 을 UserDto 로 쉽게 매핑할 수 있지만, 아래 `Response<UserDto>` 의 경우 에러가 발생한다. 이는 Response<UserDto>.class 혹은 Response<UserDto.class>.class 등으로 parametizedType을 유추할 수가 없기 때문이다. 

## 잠깐만.. 근데 나는 UserDto.class도 익숙하지 않은데? 

위에서 objectMapper 의 `readValue` 클래스가 그렇듯이, 클래스나 JavaType을 메소드의 파라미터로 받는 경우가 있다. 파라미터의 **종류** 를 이야기할 때 이를 **타입토큰** 이라고 하고, 그 값으로는 **클래스 리터럴** 을 넘긴다. 

![클래스리터럴과 타입토큰](./typetoken.png) 




## 참고 

https://homoefficio.github.io/2016/11/30/%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%A6%AC%ED%84%B0%EB%9F%B4-%ED%83%80%EC%9E%85-%ED%86%A0%ED%81%B0-%EC%88%98%ED%8D%BC-%ED%83%80%EC%9E%85-%ED%86%A0%ED%81%B0/

https://umbum.dev/925

