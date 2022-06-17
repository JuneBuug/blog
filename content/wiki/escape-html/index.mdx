---
layout  : wiki
title   : 'html escape 생각해보기' 
slug : '/escape-html'
date    : 2022-06-17 14:13:38 +09:00
updated : 2022-06-17 14:13:38 +09:00
tags    : 
- Java
- Security
---


# 서론 
서비스 모니터링 하다가, 일부 특수문자가 제대로 표현되지 않는 영역이 있는걸 발견했다. html 특수문자 형태 그대로 나온 것인데,  예를 들어, < 가  `&lt`  와 같은 형태로 그대로 나왔다. 

특수문자는 html 상에서 위와 같은 형태로 표현될 때가 있다.
자주 쓰는 것 중 하나인 공백 (`&nbsp`) 도 이런 방식으로  표현되고. 
이 리스트는 [여기](https://mateam.net/html-escape-characters/) 를 참고하면 알 수 있다.


여기에는 당연히 é 와 같은 양음부호가 포함된 문자도 있고. 
이를 html 특수문자 (예를 들어, < 는 `&lt` ) 형태로 표시하는걸 escape 한다고 한다. 
영어로는 html escape character 라고 그대로 말하는 듯.

여러번 escape 라는 말을 써왔지만 이렇게 헷갈리기는 처음이다.


## 왜 escape 해야해?
유저가 입력한 데이터는 escape 된 형태로 저장하는 게 정석이다. 

이는 XSS 공격을 막기 위해서인데,
공격자가 일부러 서버에서 실행이 될 만한 코드를 입력하여 데이터를 탈취하는 것이다. 
```js
<script> </script>

```

데이터를 입력받았는데 위 같은 script 태그가 있어서 데이터가 탈취될 가능성도 있다. 

따라서 string 형태의 데이터를 받았을 때는 해당 값을 escape 해서 저장하는 것이 보통이다. 



## 자바에서 쓸 수 있는 : org.apacahe.commons.lang.StringEscapeUtils 의 escapeHtml


쭉 타고 올라가보면, html 문자로 사용될 수 있는 대부분을 담아두고 있다. 

```java:title=Entities.class

static final String[][] ISO8859_1_ARRAY = {"Aacute", "193"}, // 생략
```

이 array 모음을 참고하여, 만약 해당하는 특수문자가 있으면 escape 된 상태로 변경해준다.
단순하고 효과 좋은 방법. 


# 참고 

https://mateam.net/html-escape-characters/