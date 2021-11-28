---
title   : '나와라 만능 jenkins' 
slug  : '/jenkins-as-an-army-knife'
excerpt : 
date    : 2021-11-28 10:15:53 +0900
updated : 2021-11-28 14:47:51
tags    : 
banner  : './thumb.png'
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

jenkins 는 item / project 라고 불리는 설정을 통해서 일을 수행한다. 위와 같이 일반적인 item 의 형태를 구경해보자. 

- General 
  - 이 item에 관한 설명, 빌드 삭제 (빌드 기록을 주기적으로 삭제할것인지?), 매개변수를 사용할 것인지? 병렬빌드를 허용할 것 인지? 등 전반적인 설정에 관한 내용 

- 소스코드 관리 
  - 여기서 기반으로 사용할 소스코드의 repository 설정, credential 설정 

- 빌드 유발 
  - 빌드를 언제 시작할 것인지? 
  - e.g) PR 을 올렸을 때? 특정 시간대? 

- build 
  - 어떤 명령어를 사용해서 실제로 빌드 작업을 할 것인지? 
  - (빌드 작업이 아니더라도)

- 빌드 후 조치 
  - 빌드 후에 어떤 추가 액션을 할 것인지? 
  - e.g.) 테스트였다면, 테스트 리포트를 발행? slack 으로 노티? line 으로 노티?


즉, 설정을 제외하면 크게 세 덩어리로 나누어져있고, 그것도 하나를 중심으로 하고 있다. 
- 실제 일을 하는 빌드 
- 빌드를 실제 촉발하는 빌드 유발 
- 빌드 이후에 필요한 일들을 처리하는 빌드 후 조치

jenkins item 의 구조에 맞춰 끼워넣으면, 다양한 작업을 수행할 수 있다. 

### CI 의 item 구성하기 

CI 를 어떻게 돌려야할 지 생각해보자. 나는 

1. PR 이 올라갔을 때 (빌드 유발)
2. 나의 github 소스를 가지고 (소스코드 관리)
3. gradle의 test 명령어를 실행하고 싶다. `./gradlew test` (빌드)

CI 의 요구사항은 위와 같으니, 이를 쪼개서 item 의 항목에 넣어주면 된다.

![CI item](./jenkins-016.png)
![CI item](./jenkins-017.png)

빌드 유발에는 `Github Pull Request Builder` 플러그인을 사용했다. 이 플러그인을 사용하면, PR 이 생성되었을 때, 커밋이 추가되었을 때 등의 이벤트를 받아서 빌드를 유발할 수 있다. 또한 커스텀한 라벨이 붙은 PR만 하거나 특정 문구가 커멘트에 입력되었을 때 빌드하는 등의 기능도 할 수 있다. `고급` 버튼을 눌러서 관련 설정을 살펴보면 좋다. 

빌드에는 gradle 명령어가 그대로 들어간다. 사실상 jenkins가 설치되어있는 머신에서 gradle 명령어가 수행되는 것과 같다. 

### Spring batch를 돌리는 item 구성하기 
위에서 잠시 batch를 돌리는 item을 구성할 수 있다고 했다. 

한시간마다 돌려야하는 배치를 예로 들어보자. 

1. 1시간마다 (예를 들어, X시 5분 마다) (빌드 유발)
2. Spring batch의 job을 실행하고 싶다. (빌드)
3. 단, 이때 batch의 소스를 github소스에서 가져오지 않고, 배포된 버전을 기반으로 한다. 

3의 요구조건때문에 Spring batch의 jar 파일은 직접 서버에 배포한다. 
그때의 파일 트리구조는 다음과 같다. 

![file-tree](./jenkins-019.png)

추후 batch 소스코드에 변경점이 생겼을 때 , 이 jar를 업데이트해주는 것으로 버전관리를 한다. 

그리고 위 조건에 맞춰서 item 을 작성해보자. 

![빌드 유발](./jenkins-020.png)

이번 배치는 `periodically` 하게 돌아가야하는 배치다. ? 버튼을 누르면 주기를 어떻게 작성해야하는지 가이드가 나와있다. 예를 들어 위 그림에서 보이는 `3 * * * *`는 매 시간에 한번, 3분마다라는 뜻이다. 
10시 3분, 11시 3분, .... 등이다. 

다만 executor가 부족한 경우, 이 주기 배치가 겹치는 시간대에는 원하는대로 동작하지않을 수 있다. 실제로 아이템을 수행해줄 연산자가 없기때문이다. 

![빌드](./jenkins-021.png)
이번에도 execute shell 항목을 사용해 직접 `java -jar` 한다. batch job 옵션을 통해서 원하는 job만 돌릴 수 있다. 


## 빌드할 executor가 모자랄 때 : agent 추가

![executor](./jenkins-024.png)
위 그림에서 빌드 실행 상태 하위에 1, 2가 executor의 갯수와 상태를 의미한다. 현재는 빌드 중인 아이템이 없어서, 두 executor가 비어있다. 하지만 위에서 잠시 언급한 것처럼, batch 실행 시간이 겹친다면 어떨까? 그게 아니더라도 수많은 PR이 올라와서 CI 를 돌려야하는 갯수가 많아진다면? 

상상할 수 있겠지만, 현재 상태에서는 2개보다 많은 아이템이 실행되면 큐에 쌓였다가 순서대로 실행된다. 시간이 중요한 이슈인 배치라거나, CI가 빨리 완료되면 좋은 유저의 입장에서는 결코 바람직한 상황이 아니다. 그렇다고 무작정 jenkins 가 설치된 머신을 더 좋은 머신으로만 갈아끼워서 executor를 늘릴 수는 없는 상황일수도 있다. 

jenkins 는 이런 상황을 위해 `분산빌드 distributed build` 를 권장하고 있다. 맨 처음 jenkins를 설치하면 마주하게 되는 것 역시 **분산 빌드를 실행하세요!** 라는 메시지이다. 

jenkins에서는 최초로 jenkins가 설치되며, 나머지를 조율할 노드를 `controller` 
`controller`에서 일을 받아서 실행하는 노드를 `agent`라고 부른다. 
(구 용어에서는 master-slave 라고도 하는데, 요즘에는 사용하지않는 추세다.)

agent도 controller와 같이 물리머신, 가상 머신, 심지어 kubernetes cluster 등 설치 환경을 가리지않는다. 그리고 controller 가 agent들을 조율해서 일을 나눠주고 agent를 모니터링하는 역할을 맡는다. 

### agent - controller 연결 

그러면 이 노드의 연결은 어떻게 하면 좋을까? 연결 관점에서 크게 두 가지 방법이 있다. 

1. controller -> agent에 접속하기

이 방법은 agent 의 ssh key를 발급하고, controller쪽에 agent의 정보를 등록해주는 방법이다. 
agent 의 빌드 결과들이 표시될 dir, 그리고 발급된 ssh key를 controller에 등록하고, 
ssh 접속으로 controller가 agent에 붙는다. 

2. agent -> controller 에 붙기 

또다른 방법은 agent가 직접 controller에 붙는 방식이다. 보통 JNLP(Java Network Launching Protocol)을 많이 사용한다. JNLP 로 agent를 실행하면서, TCP 연결을 통해서 agent 가 controller에 접속한다. controller에서 agent를 직접 접근할 수 없을 때 (e.g. 보안상의 이유로 agent가 보안된 망에 있을 때) 유용하다고한다. 

자세한 부분은 나중에 따로 다루도록 하겠다! 


## 첨) jenkins 8080 포트 번호 없애는 법 

항상 그렇듯... 브라우저 상 어플리케이션의 포트번호를 없애주는 법은 http/https 기본 포트인 80/443에서 8080 포트에 떠있는 어플리케이션을 바라보게 해주는 것이다. 즉, 리버스 프록시 역할을 하는 웹서버를 하나 두도록 하자. 

이 또한 jenkis 홈페이지에서 nginx / apache 등 다양한 예제를 제공하고 있다. 

아래는 nginx 일부를 발췌한 것이다.

```nginx 
 upstream jenkins {
    keepalive 32; # keepalive connections
    server 127.0.0.1:8080; # jenkins ip and port
 }


 # Required for Jenkins websocket agents
map $http_upgrade $connection_upgrade {
 default upgrade;
 '' close;
}

server {
 listen          80;       # Listen on port 80 for IPv4 requests

 server_name     jenkins.example.com;  # replace 'jenkins.example.com' with your server domain name

 # this is the jenkins web root directory
 # (mentioned in the /etc/default/jenkins file)
 root            /var/run/jenkins/war/;
 access_log      /var/log/nginx/jenkins.access.log;
 error_log       /var/log/nginx/jenkins.error.log;
 }

```
[여기](https://www.jenkins.io/doc/book/system-administration/reverse-proxy-configuration-nginx/)를 참고하자. 


## 마치며 
이렇게 jenkins 에 대한 대략적인 설명을 마쳤다. 공식 홈페이지 설명을 제외하고는 그동안 야금야금 알아왔던 지식을 가볍게 풀어보았다. 기본에 해당하는 내용은 계속해서 이 글에, 그렇지 않은 경우는 별도의 아티클로 정리하도록 하겠다.


## 참고

[Jenkins 공식 홈페이지](https://www.jenkins.io/doc/)
