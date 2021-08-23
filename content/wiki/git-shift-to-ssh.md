---
title   : '깃헙 인증 id/pw 에서 ssh 로 변경하기' 
slug  :  '/github-ssh'
layout  : wiki 
excerpt : 
date    : 2021-08-24 07:53:38 +0900
updated : 2021-08-24 08:00:23
tags    : 
---

## 서론 

Github 의 인증 시스템이, 기존에 가능하던 id/pw 인증 방식을 제거했습니다. 아이디-패스워드 방식은 해당 키만 알면 로그인할 수 있다는 점에서 보안적으로 약하다고 보았고, 이를 개선하려고 한 것입니다. 

따라서 2021년 8월 13일 이후로, id/pw 인증되던 git repository 에 푸시하는 순간, 에러 메시지가 발생합니다. 

> 

## 액세스 토큰 방법과 ssh 방법 

액세스 토큰 방식은 특정 권한을 가진 토큰을 발급하여, github 과 관련된 액션을 할 때 해당 토큰을 사용하는 방식입니다. 

그리고 ssh 방식은 머신에서 ssh 토큰을 발급하고 github쪽에 등록해서, `해당 머신에서의 인증은 안전하다` 라고 알려주는 방식입니다. 

## ssh 토큰 발급과 등록하기 

## 기존 git repository 의 remote 삭제하고, ssh 형태로 다시 등록하기 
ssh 토큰 등록을 완료해서 신나게 푸시하러가보니까 안됩니다. 
기존의 레포지토리의 remote 설정이 https 로 되어있다면, 이 설정을 삭제하고 다시 ssh 방식으로 등록해줍니다. 

```bash 
git remote 
# origin 
# <remote명> 이 위와 같이 표시됨
```

```bash 
git remote rm <remote명> 
# git remote rm origin 
```

github 레포지토리에 가서 ssh url 을 복사합니다. 

```bash 
git remote add origin <ssh url> 
```

