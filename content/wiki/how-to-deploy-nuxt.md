---
title   : 'nuxt-web 배포'
slug  : '/nuxt-deploy'
layout  : wiki 
excerpt : 
date    : 2020-04-22 10:50:31 +0900
updated : 2020-04-22 10:58:19 +0900
tags    : 
---


## 참고
[nuxt.js 소개](https://kdydesign.github.io/2019/04/10/nuxtjs-tutorial/)
- nuxt는 vue 애플리케이션을 쉽게 생성하고 만들수 있는 프레임워크.
- 클라이언트와 서버 배포를 추상화해줌
- SSR 애플리케이션 개발을 위한 구성이 되어있음
- SPA 를 신속하게 만들수있음 / 이 요소가 이미 준비되어있다.


[SPA와 SSR 소개](https://medium.com/aha-official/%EC%95%84%ED%95%98-%ED%94%84%EB%A1%A0%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EA%B8%B0-1-spa%EC%99%80-ssr%EC%9D%98-%EC%9E%A5%EB%8B%A8%EC%A0%90-%EA%B7%B8%EB%A6%AC%EA%B3%A0-nuxt-js-cafdc3ac2053)

- nuxt는 SPA 모드와 universal 모드 지원 
- univsersal 모드는 isomorphic, 즉 서버와 클라이언트가 동일한 코드로 동작 
  - service-side rendering, client side navigation 


```bash 
npm i nuxt # 일반적인 nuxt 단독 설치 
```

[pm2 적용](https://engineering.linecorp.com/ko/blog/pm2-nodejs/)

- pm2는 nodejs 프로세스 매니저 
- 싱글 스레드로 도는 node js 를 멀티프로세스로 늘릴 수 있는 방법을 제공 (클러스터 모듈, 최대 CPU 코어수만큼)


## 의문
- 같은 웹서버에 배포하는 건지 
   - 같은 서버에 배포하는게 맞는것 같다.
   - PKG deploy 에 같음. 
    

- voyager(ssl 인증서)
  - https://voyager.linecorp.com/apps/certificates?filter=all
- filebeat? 
   - 로그 밀어주는 거고.. 

- deploy 경로가..
    - spa 파일 자체는 delploy/web-nuxt-spa
    - universal link용인가..? 이건 /deploy/web-nuxt
    - doc_base 갈아끼우고
    - web-nuxt 경로 의 doc_base는 tar 해제해주고
    - nuxt 스크립트 doc_base 로 복사해서 stop and start
 
## 해결  & 정리


