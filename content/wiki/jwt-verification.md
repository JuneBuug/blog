---
title   : 'JWT, java에서 인증하기' 
slug  :  '/jwt-verification'
layout  : wiki 
excerpt : 
date    : 2021-10-31 10:23:53 +0900
updated : 2021-10-31 21:55:33
tags    : 
- Security
---

## 서론 
2018년, 인턴 프로젝트에서 github 인증 및 프로젝트 로그인을 위한 jwt를 발행했었다. 이때jwt 개념 자체를 몰라서, 글을 한번 썼었다.  참고: [토큰으로 토큰을 만들자 - pyjwt](https://juneyr.dev/2018-01-28/making-token-pyjwt)

이정도 공부였으면 충분할 줄 알았지만, jwt의 signature 부분을 완전히 `pyjwt` 의 라이브러리에 의존해서 인증했었기 때문에 signing을 상세하게 알지 못했다. 👀 그래서 오늘은 signature를 만드는 과정, 그리고 그 signature를 검증하는 과정을 하나하나 살펴보려고한다. 

## 간단하게 또 복습하자구 : JWT는 
Json Web Token 이라고 불리는 JWT는 [rfc7519](https://datatracker.ietf.org/doc/html/rfc7519) 에 정의된 구현체다. `header`, `payload`, `signature` 의 세 부분으로 나뉘어 간단하고 그 자체로 정보를 안전하게 담고 있다는 점이 특징이다. 
![jwt](./jwt.008.png)
jwt를 공부할 때는 항상 [jwt.io](https://jwt.io) 를 가까이하게 된다. 메인화면에 바로 jwt의 encoded(암호화된) 상태를, 오른쪽에는 decoded(복호화된) 상태를 표현하고 있다. 

각 부분의 복호화된, 즉 정보 데이터는 `BASE64_URL` 로 인코딩되어서 왼쪽처럼 하나의 string이 된다.  
> 참고 : base64와 base64 url 인코딩은 다르다. 여기서는 base64가 url-safe하게 변환하여, 정보에 url 이 들어가도 안전하다는 점을 알고 가면 된다.

또한 jwt 의 signature 를 만들때는 다양한 사이닝 알고리즘을 사용할 수 있는데, 이 알고리즘은 header의 `alg` 항목에 드러난다. jwt를 발급하는 쪽은 이 알고리즘과 키를 이용해서 서명을 만들고, 검증하는 쪽은 또한 이 알고리즘과 해당하는 키를 통해 서명이 정말 맞는지 검증하게 된다. 

## 잠깐 - 대칭키와 비대칭키 기억하나요
일전에 SSL 을 공부하면서 대칭키 알고리즘과 비대칭키 알고리즘을 다룬적이 있었는데, 이 부분을 기억하시는지? 참고: [SSL이 모요](https://juneyr.dev/2019-10-08/ssl) 

간단히 요약하면, 대칭키는 **하나의 키** 로 메시지를 잠그고, 그 키로 동일하게 연다는 개념이다. 일반적인 자물쇠를 생각하면 된다. 당연히 메시지를 잠근 키를 탈취당하면 바로 메시지를 열어볼 수 있기때문에 보안적으로는 약하다고 할 수 있다. 

그와 대비되는 비대칭키 (혹은, 공개키 방식) 은 수학적으로 깊은 연관이 있는 하나의 키 페어를 만든다. (이를 A,B 라고 하자.) A와 B는 수학적 연관성 때문에, A로 잠근 메시지는 B로 열 수 있고, B로 잠근 메시지는 A로 열 수 있는 관계성을 띄게 된다. 이 중 하나를 개인키 (private key), 다른 하나를 공개키(public key)로 설정하기도 하므로 공개키 방식으로 불린다. 

메시지가 있다고 하면, 공개키로 잠그고, 메시지를 열어야하는 사람이 갖고 있을 개인키로 여는 것이 통상적인 비대칭키 보안방식이다. 이때 공개키가 공개되고 탈취되어도, 개인키를 모르면 메시지를 복호화할 수 없으므로 상대적으로 안전하다. 
![전자서명](./jwt.018.png) 
그러면 반대의 경우는 어떨까? 메시지를 **개인키**로 잠그고, **공개키**로 여는 것이다. 이런 경우, 맥없이 메시지는 풀리겠지만 (공개키는 말 그대로 노출되어있는 경우가 많으므로) 그 행위 자체가 무언가를 증명한다. 바로 이 메시지를 **잠근 사람**이 공개키의 페어를 갖고 있는 유효한 주체라는 사실이다. 🙋‍♀️ 이 과정을 전자서명이라고한다. 

## 전자서명.. 왜 말했어 
JWT 사이닝 방식 알고리즘은 위에서 여러가지가 있다고 언급했다. JWT는 사이닝 알고리즘을 대칭키와 비대칭키 방식 모두 지원하고 있는데, 대표적인 HMAC-SHA256과 RSA-SHA256을 한번 살펴보려고 한다. 

HMAC-SHA256(HS256으로 표기하기도함) 은 대칭키 알고리즘 구현체중 하나다. 
![hs256](./jwt.015.png) 
위와 같은 `secret` 하나만을 가지고 암호화를 하고, 당연히 복호화할때도 이 secret만 알고 있으면 복호화가 가능하다. 

![rs256](./jwt.016.png)
반면 RSA-SHA256(RS256으로 표기하기도 함)은 **비대칭키** 알고리즘 구현체 중 하나다. RSA 자체는 전자서명이 가능한 최초의 공개키 알고리즘으로 알려져 있다. 한 벌의 키가 존재하고, 토큰을 발급할 때 private key 로 잠근다. 그리고 인증하는 쪽에서는 public key를 획득해서 이 signature를 복호화한다. 그러면 내용도 나올 뿐 아니라, **사이닝을 한 주체**가 publich key를 제공한, 즉 이 토큰을 제공한 측이라는걸 검증해 줄 수 있다.

## 시그니처를 만드는 구체적인 과정 
RSA-SHA256 기준으로 시그니처를 만드는 구체적인 과정을 한번 살펴보자. 
![signature-make](./jwt.017.png) 

- 인코딩된 header + `.` + payload를 SHA-256로 해시한다. 
- 해시된 값을 private key로 잠근다. 
- 잠긴 데이터를 다시 base64 url encode를 하면 signature 가 완성된다. 

## 그럼 시그니처 인증은? 
시그니처를 만드는 방법과 중간에서 만나면 된다. 즉 받은 jwt 토큰에서 
![signature-verify](./jwt.022.png) signature string 그대로를 `base64url` decode한 뒤 public key 로 연 값이, header + "." + payload string을 sha256 해시한 값과 값으면 된다. 

## java security 를 이용해서 인증해보자. 

```java
public static boolean verifySignature(String jwt, String keyString) throws NoSuchAlgorithmException,
                                                                               InvalidKeyException, SignatureException, InvalidKeySpecException {
        final String[] splitJwt = jwt.split("\\.");
        final String headerStr = splitJwt[0];
        final String payloadStr = splitJwt[1];
        final String signatureStr = splitJwt[2];

        final Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initVerify(createPublicKey(keyString));
        signature.update((headerStr + "." + payloadStr).getBytes());

        byte[] decoded = Base64.getUrlDecoder().decode(signatureStr);

        return signature.verify(decoded);
    }
```
위 코드처럼 세 부분으로 자르고, signature의 instance를 원하는 알고리즘으로 설정해준다. 그리고 verify init시 public key를 설정하고, 원래 encode하려고 했던 string 즉 (headerStr + "." + payloadStr) 의 bytes를 전달한다. 

signature verify에서는 decoded된 signature str 를 publich key로 푼 값이 `==` headerStr + "." + payloadStr의 SHA-256 해시한 버전이 같은지 내부적으로 테스트하게 된다. 

## java. security 를 쓰지않는 대안 
jwt.io 에는 언어별로 jwt 검증이 가능한 라이브러리를 소개하고 있다. 이 부분을 [참고](https://jwt.io/libraries?language=Java) 하자.

## 참고 
- [jwt.io](https://jwt.io) 

- [JWT를 소개합니다](https://meetup.toast.com/posts/239) 

- [JSON Web Token Structure](https://auth0.com/docs/security/tokens/json-web-tokens/json-web-token-structure
