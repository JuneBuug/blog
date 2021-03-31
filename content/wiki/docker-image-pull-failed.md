---
title   : 'docker desktop 정리 후 testcontainer image pull 실패' 
slug  :  '/docker-testcontainer-image-pull-failure'
layout  : wiki 
excerpt : 
date    : 2021-03-30 10:20:11 +0900
updated : 2021-03-30 10:22:23
tags    : 
---

## 서론없이 결론만 

docker desktop 정리 (안쓰는 이미지 정리) 후, 갑자기 
testcontainer에서 사용하는 redis 이미지를 찾을 수 없다며 테스트가 오류를 뱉기 시작했다. 

cannot find image 가 오류 명이여서, 레포지토리가 만료되었나? 생각했지만 찾아봐도 docker 자체의 문제라는 이야기뿐.. 

> 결국, 도커에 할당된 메모리가 적어서 생긴 문제였다. 원래 4GB 로 해줬는데 리셋하면서 1GB로 자동할당된 모양. 

이를 다시 늘려주니까 해소되었다. grade build 야 의심해서 미안하다 
