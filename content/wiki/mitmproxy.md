---
layout  : wiki
title   : 'mitmproxy' 
slug : '/mitmproxy'
date    : 2022-02-04 14:05:40 +09:00
updated : 2022-07-06 16:25:04
tags    : 
- Tech
---

charles 는 한번도 써보지 않았고, 받아서 쓰는 것도 귀찮아서 다시 mitmproxy 를 깔았다. 
아웃사이더님의 블로그가 아주 충분했는데 오늘 다시 들어가보니 이미지가 깨지는게 몇개 있어 🥲 직접 이미지를 첨부해보기로 ㅎㅎ 

## 설치 & 설정 

macOS 에서의 설정
```bash 
brew install mitmproxy
```

실행 
```bash 
mitmproxy
```


### 아이폰 기준 설정 

핸드폰과 노트북이 같은 네트워크에 연결되어 있다는 걸 상정할 때 

설정 > Wi-Fi > 해당하는 네트워크 i 아이콘 > 프록시 구성 >  수동 

서버에 노트북의 ip, 포트는 8080 (mitmproxy  기본), 인증은 하지 않았음 


연결 이후 아이폰에서  [http://mitm.it](http://mitm.it/) 들어가서 인증서를 다운받음
https 연결 인증서를 바꿔치기 위함임 

설정 > 정보 > 인증서 신뢰설정  > mitmproxy on 

원하는 앱에 접속하면 보내는 요청을 가로채서(?) 볼 수 있다.


## 연결 된 이후 

기본적으로 방향키를 이용해서 원하는 요청을 탐색가능
enter 를 누르면 상세한 요청 내용을 볼 수 있다.

![scrn](./scrn.png)


그런데 너무 요청이 많아서 필터가 필요하다 . `?` 를 그냥 누르면 헬프를 볼 수 있다. 
`f` 를 누르면 필터가 가능한데, 헬프페이지에서 사용가능한 필터 옵션을 볼 수 있다. 
아래처럼 
`f d 'dev.apis'` 형식으로 요청하면 host 가 dev.apis 를 포함(?) 하는 요청만 걸러서 볼 수 있음.
![filter](./filter.png)


## 참고 

https://blog.outsider.ne.kr/1514

https://mitmproxy.org/#mitmdump

https://github.com/mitmproxy/mitmproxy

https://stackoverflow.com/a/63003493


## 별첨:  ln 이 안먹힌 이유.. 

```bash
ln -s /usr/local/opt/python@3.7/bin/python3.7 /usr/local/opt/python/bin/python3.7
ln: /usr/local/opt/python/bin/python3.7: No such file or directory
```

해결 : mkdir 해주었다.

https://jhnyang.tistory.com/269
