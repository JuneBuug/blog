---
title   : '스프링 배치 CLI, job parameter 재사용 오류'
slug  : '/spring-batch-job-params-reuse'
layout  : wiki 
excerpt : 
date    : 2021-07-08 09:57:48 +0900
updated : 2021-07-08 10:09:23
tags    : 
- Spring
---

## 문제상황 
같은 batch job A 가 있다. 
이 batch job의 job parameters 중 하나가 time 인데, 
time 은 꼭 있어야하는 parameter 중 하나다. 
하지만 코드 상에서는 time이 null 인 경우, 현재 시간을 넣도록 설정해두었다.

이 배치 job A 를 각각 jenkins 의 다른 item으로 설정해두었다. 
하나는 with parameter, 하나는 without parameter이다. 

without parameter를 단독으로 돌릴때는 무사히 현재 시간이 들어갔다. 
그러나 with parameter에서 `time=1200` 등의 형태로 값을 주자, 
without parameter item 에서 갑자기 1200으로 time이 세팅되어서 돌기 시작했다. 
## 원인 
spring job incrementer 를 사용했을 땐 이전 파라미터 목록에서 증분내용을 적용하기 때문에 스펙이라고 한다. 

하지만 내 입장에선 스펙이 아닌걸.. 버그가 아니기때문에 일단 spring batch 의 수정은 기대할 수 없을 것 같다. 
다행히 창천향로님 블로그에서 이 내용이 정리되어있어서 원인을 알 수 있었다. 

## 해결 
그러면 어떻게 해결해야할까? 
개발환경에서 이 문제를 관찰했는데..

- 기존 job 실행이력을 없애면 증분에 들어가지 않는게 아닐까? 
- without parameter에서 time 에 현재 시간을 줌 (jenkins 서버의 시간) (현재 임시방편으로 사용 중
  - 코드가 쓸모가 없다! 
- with parameter 를 먼저 돌리지 않는 이상 without parameter는 정상 작동한다.
  - 개발에서 관찰했고, 다시 확인 필요함 
- with parameter와 without parameter job을 분리한다 (?)



> 이전의 Job이 실행시 사용한 파라미터 중 하나가 다음 실행시 누락되면 누락된 파라미터를 재사용합니다.


## 참고 
https://jojoldu.tistory.com/487

