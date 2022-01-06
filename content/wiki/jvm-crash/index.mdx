---
title   : '[WIP] JVM Crush 분석하기 - 왜 갑자기 내 서비스 죽었지?' 
slug  : '/jvm-crush'
layout  : wiki 
excerpt : 
date    : 2022-01-06 16:14:27 +0900
updated : 2022-01-06 17:14:21
tags    : 
- JVM 
---

## 서론 
갑자기 애플리케이션이 죽었다. 🤔

Port Down 이길래 내가 모르는 배포가 있었던가 했더니 아니었다.

1) 애플리케이션 로그를 봤다. 일정 시간대 이후로 끊어진 것을 제외하고는 특이사항이 없었다. 
   
2) 서버 CPU, I/O 등 지표를 봤다. 갑자기 과다한 요청이 들어오거나 끊긴일도 없었다. 애플리케이션이 죽은 뒤에 (당연히) CPU 계산량이나 disk I/O 가 줄긴했지만 그건 애플리케이션을 다시 안살려서 그렇구. 
   
3) 결국 직접 권한을 얻어서 nginx log를 봤다. 

```bash 
2022/01/06 12:06:26 [error] 56154#0: *306691978 upstream prematurely closed connection while reading response header from upstream ... (중략) request: "GET ..."
```

어떤 요청을 하다가 끊겼다는 정보밖에 없다. 
그런데 자바 애플리케이션 로그에는 정상 응답으로 나가긴 했고 (200) ... 🥲  세상 오리무중... 

4) 서버 로그를 동태눈으로 뒤지다가 이상한걸 발견했다. 

`hs_err_pid<pid>.log` 형태의 파일이다. 만들어진 시간대가 매우 매우 수상해서 열어봤다. 
 
결론적으로 이 로그가 당시의 상황을 나타내주고 있었다. https://www.whatap.io/ko/blog/28/ 에 따르면, JVM 은 가상머신이므로 명백한 이유가 있을 때 멈추지만, 때로는 블루스크린처럼 이유없이 멈추기도 한다고 한다 ... 이를 크래시라고한다. 

JVM 이 이처럼 비정상 종료되면 떨구는 로그가 바로 **hs_err_pid** 로그다. (IBM에서는 `hotspot` 이라고함)  로그조차 남지 않는다면 그것 역시 크래시의 일부로... 이 상황에서는 원인 규명이 매우 어렵다.

### JVM 크래시 로그 뜯어보기 

로그를 뜯어보니 이렇게 시작한다. 
```bash 
  SIGSEGV (0xb) at pc=0x00007ff814d00791
```
**SIGSEGV** 는 JVM 이 segmentation fault 로 종료되었음을 의미한다. 물론, 전공에서 보던게 실제로 나타난 것도 처음, 이 개념이 생각날리 만무하다. 미래의 내가 첨언하길.

그 아래에는 아래와 같이 원인이 된 frame을 표기하고 있다. 

```bash 
# Problematic frame:
# V  [libjvm.so+0x7f5791]  G1ParScanThreadState::trim_queue_partially()+0x3
```
libjvm.so의 `0x7f5791` 위치에서 발생했다고 한다. 

아래로 내려가면 stack 에 뭐가 있는지 알 수 있다. 

## 참고 
매우 친절한 두 링크를 저장해둔다. 

-  https://www.whatap.io/ko/blog/28/

- https://d2.naver.com/helloworld/1134732
