---
title   : 'JWT, java에서 인증하기' 
slug  :  '/jwt-verification'
layout  : wiki 
excerpt : 
date    : 2021-10-31 10:23:53 +0900
updated : 2021-10-31 21:00:27
tags    : 
- Security
---

## 서론 
JWT, 지겹다. jwt로 한번 블로그 글도 썼었다.[토큰으로 토큰을 만들자 - pyjwt](https://juneyr.dev/2018-01-28/making-token-pyjwt)
이정도 공부였으면 충분할 줄 알았지만, jwt의 signature 부분을 완전히 `pyjwt` 의 라이브러리에 의존해서 인증했었기 때문에 signing을 상세하게 알지 못했다. 👀 그래서 오늘은 signature를 만드는 과정, 그리고 그 signature를 검증하는 과정을 하나하나 살펴보려고한다. 

## 간단하게 또 복습하자구 : JWT는 
Json Web Token 이라고 불리는 JWT는 [rfc7519](https://datatracker.ietf.org/doc/html/rfc7519) 에 정의된 구현체다. `header`, `payload`, `signature` 의 세 부분으로 나뉘어 간단하고 그 자체로 정보를 안전하게 담고 있다는 점이 특징이다. 
![jwt](./jwt.008.png)
jwt를 공부할 때는 항상 [jwt.io](https://jwt.io) 를 가까이하게 된다. 메인화면에 바로 jwt의 encoded(암호화된) 상태를, 오른쪽에는 decoded(복호화된) 상태를 표현하고 있다. 

각 부분의 복호화된, 즉 정보 데이터는 `BASE64_URL` 로 인코딩되어서 왼쪽처럼 하나의 string이 된다.  
> 참고 : base64와 base64 url 인코딩은 다르다. 여기서는 base64가 url-safe하게 변환하여, 정보에 url 이 들어가도 안전하다는 점을 알고 가면 된다.

또한 jwt 의 signature 를 만들때는 다양한 사이닝 알고리즘을 사용할 수 있는데, 이 알고리즘은 header의 `alg` 항목에 드러나게된다. jwt를 발급하는 쪽은 이 알고리즘과 키를 이용해서 서명을 만들고, 검증하는 쪽은 또한 이 알고리즘과 해당하는 키를 통해 서명이 정말 맞는지 검증하게 된다. 



## 참고 
- [jwt.io](https://jwt.io) 

- [JWT를 소개합니다](https://meetup.toast.com/posts/239) 

header는 알고리즘이나 
