---
title   : '나는 nginx 가 정말 싫다구요' 
slug  :  '/nginx-basics'
layout  : wiki 
excerpt : '근데 어쩌냐 해야하는데'
date    : 2020-05-08 11:07:10 +0900
updated : 2020-05-08 13:48:37 +0900
tags    : 
---

## nginx 

apache 와 함께, 세계에서 가장 많이 쓰고 있는 웹서버. 가볍고, 여러 요청을 한번에 처리할 수 있다는 장점때문에 급등하는 추세다. apache 보다 동작이 단순하고 전달자 역할만 하기 때문에, **동시접속**에 특화되어있다.

### 왜.. 사용해야해? 

비단 nginx 의 이야기는 아니고, 웹서버를 왜 사용해야하는지를 소개한다. 일반적으로 웹서버는 

1. 정적파일을 서빙하는 서버로서의 역할
  - 웹 어플리케이션 서버가 직접 html, css, javascript 같은 정보를 내려주면, 비즈니스 로직을 그만큼 처리할 수 없게 된다. 만약 클라이언트에서 정적파일만 요구하는 요청이라면 웹서버가 직접 내려줄 수 있다. 
    
2. 리버스 프록시로서 역할 
  - 프록시는, 클라이언트와 서버 통신 중간에서 **대신** 통신을 해주는 서버를 의미한다. 
  - 포워드 프록시는, 내부망에 함께 있는 클라이언트가 인터넷을 통해 어딘가에 있는 서버로 요청을 보내려고하면 이 요청을 받아 연결해준다. client 앞단에서의 처리! 
  - 리버스 프록시는, 내부망의 **서버** 앞단에서 요청을 처리한다. 
    🤔 내부 서비스가 직접 서비스를 제공해도 되지만.. 이렇게 구성하는 이유는 보안때문이다. WAS(웹어플리케이션서버)는 대부분 DB 서버와 연결 되어있으므로, WAS 가 최전방에 있으면 보안에 취약해진다. 그때문에 리버스 프록시를 두고 사용한다면 WS 가 WAS 와 통신해서 결과를 클라이언트에 제공하는 방식으로 서비스를 하게 된다. 기본정책을 일정한 포트에만 연결가능하게 하면, 웹 서버가 해킹당해도 해당 권한으로는 내부망 연결이 불가능하다. 
    
    또한 프로세스 응답 대기를 막고, 요청을 배분하는 역할을 할 수 있다는 장점도 있다. 
    
## 설정 

설치는 다양한 방법으로 할 수 있다. 
```bash 
sudo apt-get install nginx # debian 계열 (ubuntu 등)
sudo yum install nginx # redhat 계열 (centos등)
```

단 centos등에서 yum repository 를 생성해야하는 등의 사전 준비가 있을 수 있으니, 정확한 것은 http://nginx.org/en/linux_packages.html#stable 를 참고하자.
    
패키지매니저를 활용하기 어려운 상황이라면, 직접 압축파일을 내려받아서 푸는 방법도 있다. 

```bash 
NGINX_VERSION=1.14.2 # 최신 버전이나 stable 버전으로 설정
wget -q http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz
tar xvzf nginx-${NGINX_VERSION}.tar.gz

# 이후에 configure 후 make 하는 과정이 필요
```

## 설정 파일 살펴보기 

nginx 가 설치된 경로를 찾아보자. 

```bash 
find / -name nginx.conf
```

[nginx conf](./1.png)

일단 기초에서는 크게 
- `nginx.conf` 파일 
  - nginx의 설정이 들어가는 핵심 파일. 
    
- `conf.d` 폴더 
  - nginx.conf에서 include로 불러올 수 있는 conf 파일 저장 폴더.

를 알아두자. 

## nginx.conf 의 설정 알아보기

생활코딩 페이지에 있는 예제로 설정을 알아보자.

```bash 
worker_processes  1;
events {
    worker_connections  1024;
}
http { 
    include       mime.types;
    server {
        listen       80;
        location / {
            root   html;
            index  index.html index.htm;
        }
    }
}
```
 
- worker_processes : 몇개의 워커 프로세스를 생성할 것인지 지정하는 지시어. 1이면 모든 요청을 하나의 프로세스로 실행하겠다는 뜻. CPU 멀티코어 시스템에서 1이면 하나의 코어만으로 요청을 처리하는 셈이다. auto로 놓는 경우가 많다. 
  - 이와 같은 설정을 **core 모듈** 설정이라고 한다. nginx 자체의 값을 정하는 경우가 이에 해당한다. 
    
- events 블록 : 이벤트 블록은 네트워크 동작방법과 관련된 설정이다. 
    - worker_connections : 하나의 프로세스가 처리할 수 있는 커넥션의 수
    - 즉 최대 접속자수는 worker_processes X worker_connections가 된다. 

- http 블록 : 하위에 server 블록, 그리고 location 블록을 갖는 **루트 블록** 이다. 여기서 선언된 값은 하위 블록에 상속된다. 서버의 기본값이 된다. 
  - include : server 블록에서도 사용할 수 있다. `conf.d` 에 정의해놓은 파일들을 적용하는데 사용된다. 
 - upstream 블록: origin 서버라고도 한다. 여기서는 WAS 를 의미하고, nginx는 downstream에 해당한다고 할 수 있다. 여러 서버를 지정해두고, weight 을 정할 수 있다. 
    - server : 값으로 `host주소:포트` 가 온다. 
    - 자세한 값은 [공식 홈페이지](http://nginx.org/en/docs/http/ngx_http_upstream_module.html) 를 참고한다. 
    ![upstream](./upstream.png)


- server 블록: 하나의 웹사이트를 선언하는데 사용된다.  server 블록이 여러개이면, 한대의 머신(호스트)에 여러 웹사이트를 서빙할 수 있다. 
  
  - 이런 개념을 가상 호스트라고 한다. 호스트는 한대지만, 가상으로 호스트를 여러 개 만들어 마치 호스트가 여러개 존재하는 것처럼 동작하게 할 수 있다. 
    
    ![virtualhost](./virtualhost.png)
    
  - listen : 이 웹사이트가 바라보는 포트를 의미한다. 
  - server_name: 클라이언트가 접속하는 서버uri를 의미함. 

 




## 참고 

https://whatisthenext.tistory.com/123

https://opentutorials.org/module/384/4526


