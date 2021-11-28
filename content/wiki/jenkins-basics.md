---
title   : '나와라 만능 jenkins' 
slug  : '/jenkins-as-an-army-knife'
layout  : wiki 
excerpt : 
date    : 2021-11-28 10:15:53 +0900
updated : 2021-11-28 10:17:05
tags    : 
---

## 서론

jenkins 를 프로젝트 전반에 사용하고 있습니다. 제일 자주 사용되는 CI 부터, Spring Batch 까지도 Jenkins로 돌리고 있는데요. 최근 [jenkins 취약점](https://www.jenkins.io/security/advisory/2021-11-04/) 으로 인해 jenkins를 업데이트할 일이 생기면서 jenkins를 한번 더 들여다보게 되었습니다. 오늘은 jenkins가 무엇인지, CI, Batch에서는 어떻게 사용하는지를 간단하게 공유해봅니다. 


## Jenkins 뭔데? 

Jenkins 는 `빌드, 테스트, 배포와 관련된 모든 종류의 task를 할 수 있는 자동화 서버` 다. JRE 가 깔린 곳이면 어디든 깔 수 있어서, 일반적인 장비/머신 뿐 아니라 docker에도 설치할 수 있다. 

jenkins는 standalone 어플리케이션으로 사용하고, 이때 내장되어있는 서블릿 컨테이너인 `Jetty` 를 사용하는데, 물론 jenkins 서블릿을 우리에게 친숙한 서블릿 컨테이너인 tomcat 에서 돌리기도 한다!

만약에 Spring 애플리케이션을 만들고 배포한다고 하면, 해당 프로젝트에는 jenkins가 크게 세 곳에서 쓰일 수 있을 것 같다. 

![jenkins-purpose](./jenkins-purpose.png)

- Pull Request 시 CI 
  - 실제로 이 PR을 포함한 코드가 컴파일이 되는지? 
  - 테스트는 통과하는지? 

- 배포 시 
  - gradle / maven의 빌드툴의 명령어를 돌려서 jar 형태로 만들자! 

- 배치 운용 
  - 주기적으로 batch job을 돌리자!  
  - 주기가 cron 일수도, 직접 실행일 수도. 

## jenkins 설치하기 : on centOS! 

jenkins는 두 가지로 릴리즈를 관리하고 있다. 

- weekly : 매주 나오는 릴리즈.

- LTS(Long-Term Support): Jenkins 재단에서는 12주마다 한번씩 LTS를 발행하고 있다. LTS는 stable버전이니, 운영환경이라면 LTS설치 하자.(2021년 11월 19일 기준 2.303.3)

설치 자체는 운영체제별로 [공식 홈페이지](https://www.jenkins.io/doc/book/installing/)에 잘 설명되어있다. 여기에서는 centOS의 설치 과정을 잠깐 살펴본다. 

```bash 
 
sudo wget -O /etc/yum.repos.d/jenkins.repo \
https://pkg.jenkins.io/redhat-stable/jenkins.repo 
 
sudo rpm "-import https:"//pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
sudo yum install epel-release java-11-openjdk-devel # 자연스럽게 jdk11
sudo yum install jenkins
sudo systemctl daemon-reload
```

stable 버전의 jenkins 를 설치하면 자연스럽게 jdk11 을 함께 설치하는 것을 볼 수 있다. 
`systemctl` 로 jenkins를 시작해보자. 

```bash 
sudo systemctl start jenkins # jenkins 시작
sudo systemctl status jenkins # 구동된 서비스의 상태 확인
```

![실행](./jenkins-008.png)

아무런 설정을 하지 않았다면 브라우저에서 8080 포트로 접속하여 jenkins 구동을 확인할 수 있다. 

![구동된 jenkins](./jenkins-009.png)

jenkins 를 알아보기 위해 일단 제안된 plugin을 모두 설치하고 진입한다. 

## item 이란? 

![test-item](./jenkins-013.png)



## 참고

[Jenkins 공식 홈페이지](https://www.jenkins.io/doc/)