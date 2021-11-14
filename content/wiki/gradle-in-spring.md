---
title   : '딱, 스프링만큼의 gradle' 
slug  : '/gradle-in-spring'
excerpt : 
date    : 2021-11-14 16:15:21 +0900
updated : 2021-11-14 23:29:08
tags    : 
- Build
- CI 
- Gradle
---

## 서론 
gradle! 이 블로그로 이전한 뒤 첫 글이 gradle facts 였을 정도로 오랫동안 내 머리에 있었던 주제였다. 그러나 번번히 공부에 실패했었다. 그런데 최근 [jar SDK 를 로컬에서 적용](https://juneyr.dev/local-lib) 하고 + 멀티 모듈에 모듈을 추가할 일이 생기면서, 아주 최소한의 공부는 필요하겠구나.. 🙃 하는 마음이 생겨서 적게 되었다. 딱, 스프링만큼의 gradle! 

## gradle 은?
maven 과 더불어서, spring 프로젝트를 사용할 때 가장 자주 언급되는 **빌드 자동화 툴**이다. 물론 spring 프로젝트에 국한된 것은 아니고, 안드로이드 프로젝트 등 JVM 기반의 개발을 할때면 어김없이 언급된다. 

gradle은 JVM 기반이고, 사용하려면 JDK 를 깔아야한다. 또한 gradle은 거의 모든 애플리케이션을 빌드할 수 있다고 [자부](https://docs.gradle.org/current/userguide/what_is_gradle.html) 하고 있다. 

기본적인 모델은 DAG(Directed Acyclic graph) 형태로 이루어져있다. 
![gradle DAG](./gradle.004.png)

어떤 taskA 를 실행하고자 하면, 그 taskA 가 의존하고 있는 task B와 task C 를 순차적으로 먼저 실행한다. task C 는 또한 다른 task 에 의존성이 있으므로, 그래프를 끝까지 타고 가서 더 이상 자식 노드가 없는 task 부터 순차적으로 실행하게 된다. 

### task? 
task를 이야기 했으므로 잠깐 짚고 넘어가자. task 는 프로그래밍에서 말하는 함수의 개념과 거의 유사하다. task는 아래 세가지로 구성된다. 

- actions: 행위 
  - 파일을 복사한다든지, 소스를 컴파일 한다든지 

- inputs
  - 파일, 디렉토리, 값 

- outputs
  - 최종 결과 파일 혹은 디렉토리 

이렇게, inputs을 가지고 어떤 actions 을 하면 outputs 이 나오는 일반적인 함수의 형태를 띄고 있다. 간단한 예제와 함께 살펴보자!

```groovy
tasks.register('hello') {
    doLast{
        println 'Hello June!'
    }
}

task.register('bye') {
    dependsOn tasks.hello 
    doLast {
        println "And GoodBye!"
    }
}

```

위와 같은 tasks를 gradle 파일에 두가지 정의했다. 
```bash 
gradle -q bye
```
이를 위 gradle 명령어로 실행한다면, 'bye' 로 등록된 task 를 실행한다. 이때 `bye` 는 task `hello` 에 의존성이 있으므로, DAG 모델에 따라서 `hello` 를 먼저 실행하고 마지막에 And GoodBye! 를 프린트한다. 결과는 다음과 같다. 

![tasks결과](./gradle.015.png)


## 설치와 gradle wrapper 
좀 늦었지만 설치를 살펴보자. 위 task 를 gradle 명령어로 돌리려는데, 다음과 같은 메시지가 날 괴롭혔다. 

> Spring boot plugin requires Gradle 6.8.x, 6.9.x , or 7.x. The current version is Gradle 4.10 

그래, 원하는 대로 업데이트 해주마하며 gradle 을 다시 설치했다. 

```bash 
gradle -v 
# -----------
# Gradle 4.10
# -----------
```

OS X 기준으로 우리 친구 brew로 손쉽게 설치 가능하다. 
```bash 
brew install gradle
```

그런데 잠깐 생각해보니, 로컬의 gradle이 그렇게 버전이 낮다면 여태까지의 spring + gradle 프로젝트는 왜 아무런 문제없이 돌아갔던 것일까? 🤔 바로 `gradle wrapper` 덕분이다. 

gradle 홈페이지에서는 당당하게 gradle build는 gradle wrapper의 도움을 받으라고 [안내](https://docs.gradle.org/current/userguide/gradle_wrapper.html#sec:upgrading_wrapper)하고 있다. gradle wrapper는 **지정된 버전의 gradle**을 실행하도록 되어있는 스크립트다. 버전을 지정하므로, 버전을 표준화해서 팀이 공유할 수 있고, 나아가 새로운 서버에 앱을 깔아도 매번 gradle 버전을 신경쓰지 않아도 된다. 

gradle wrapper 는 `gradle` 폴더의 하위로 생성할 수 있다. 처음 생성할 때는 gradle의 기본 task중 `wrapper` 를 실행하면 된다. 
```bash
gradle wrapper 
```
자세한 내용은 [Adding the Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html#sec:adding_wrapper)를 참고하자. 

wrapper는 아래와 같이 spring 루트 디렉토리의 gradle 폴더로 생성된다.
![gradle wrapper](./gradle.010.png)
여기서

- gradle-wrapper.jar는 실제로 다운받아진 gradle 파일이다. 

- gradle-wrapper.properties는 어떤 gradle 버전을 받고, 어디에 받을 것인지 등을 정의한 설정 파일이다. 실제로 gradle 버전업이 있을 때는, 이 파일만 변경하면 자동으로 원하는 gradle 파일이 다운로드 된다. 

다시 돌아가서, 즉 나는 로컬에 gradle 버전이 낮으면서도 gradle wrapper 를 사용해서 원하는 task 를 실행했다. gradle wrapper 의 executable은 linux 환경에서는 `gradlew`, windows 는 `gradlew.bat`이다. 아래와 같이 사용한다. 

```bash 
./gradlew -q hello 
# q는 gradle 로그가 나오지 않도록하는 옵션
```

## gradle 로 스프링의 멀티모듈 프로젝트 구성하기 

사실 gradle을 다룰 때 제일 어려웠던 것 중 하나가 멀티모듈 프로젝트의 구성이었다. 멀티모듈 개념도, gradle 개념도 잘 모를 때 프로젝트를 열어봤으니 당연하다. 멀티모듈은 한 프로젝트에 모듈을 여러개로 나누어서 프로젝트를 관리하는 방식을 의미한다. 예를 들어, 

- api 모듈 
- admin 모듈
- common 모듈 

이렇게 나누어두고, api와 admin 에서 공통적으로 사용하는 entity, client 파일들을 넣어둔다. 그리고 api 에서 common 모듈을, admin 에서 common 모듈을 각각 참조하고 api <-> admin 간에는 코드 상 간섭이 없도록 한다. 이렇게 하면 코드의 재사용성을 높이면서 깔끔한 코드를 구성하는 데 무척 큰 도움이 된다. 더불어 공통적인 로직을 하나로 뺄 수 있기때문에 변경에도 용이하면서 일관성을 가져갈 수 있는 방법이 된다.이에 대해서는 [우아한 형제들 블로그 - 멀티모듈 설계이야기](https://techblog.woowahan.com/2637/)를 추가로 참고하면 좋다. 🙋‍♀️

이런 멀티모듈을 어떻게 gradle 로 구성할 수 있을까? 

먼저 이런 모듈을 gradle에서는 multi-project라고 표현한다. 멀티 모듈은 하나의 root project가 있고, 여러개의 subproject가 있는 형태다. 

![gradle multimodule](./gradle.018.png)

이때 gradle 파일은 root project에만 `settings.gradle` 이 존재한다. 그리고 각 모듈(subproject) 별로도 `build.gradle` 이 존재! 

root proejct의 `settings.gradle` 에는 다음과 같은 설정이 들어가게 된다. 

```groovy:title=settings.gradle
rootProject.name = 'basic-multiproject'
include 'app'
```

앞선 예제처럼, 프로젝트(모듈) 간 의존성을 표현하려면 이렇게도 가능하다. 
```bash 
.
├── buildSrc
│   ...
├── api
│   ├── src
│   │   └──...
│   └── build.gradle
├── admin
│   └── person-service
│       ├── src
│       │   └──...
│       └── build.gradle
├── common
│   ├── src
│   │   └──...
│   └── build.gradle
└── settings.gradle
```


```groovy:title=api/build.gradle 
api/build.gradle
plugins {
    id 'myproject.java-conventions'
}

dependencies {
    implementation project(':common')
}
```

독자적인 `build.gradle`을 지니고 있는 만큼, 아래와 같이 각 모듈별로 원하는 task를 실행할 수 있다는 점도 짚고 넘어가자. 물론, root project에서 모든 모듈에 대해 같은 task 를 실행하는 것도 가능하다.
![intellij mulitimodule build](./gradle.021.png)


```bash 
gradle :api:test
# gradle :<모듈명>:<task명>
```

## gradle + spring 프로젝트에서의 의존성 관리 

gradle 을 가장 많이 건드릴 때가 바로 의존성을 추가할 때다. 의존성을 관리하는 방법을 간단하게 알아보자. 

![gradle dependencies](./gradle.023.png)

gradle은 다음과 같이 build 시에 

- Local File Repository 
- Network 를 통해 Maven Repository / Ivy Repository / 지정하는 저장소 

를 접근해서 `artifacts`를 가져온다. artifacts는 빌드에 의해 생성되는 파일이나 디렉토리로, JAR, ZIP, executable등이 될 수 있다. 이렇게 접근한 artifcats 를 gradle 의 cache에 저장하고, 필요한 경우 cache를 먼저 뒤져 의존성을 찾아온다. 

```groovy
repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.hibernate:hibernate-core:3.6.7.Final'
    api 'com.google.guava:guava:23.0'
    testImplementation 'junit:junit:4.+'
}
```
build.gradle의 예제를 하나 들고 왔다. 여기서 repositories 에 정의되어있듯, 원하는 라이브러리를 찾을 때 `mavenCentral` 을 먼저 참고하게 된다. mavenCentral은 [여기](https://mvnrepository.com/repos/central) 다. 

여기서 원하는 라이브러리는 

- hibernate 
- guava
- junit

의 세가지를 원하고 있는데, 각각 가져오는 방식이 다르다. 하나씩 살펴보자. 

- **implementation** : 프로젝트의 결과물에 컴파일되어 포함되어야하는 의존성. 드러나는 API 가 아니다. 
  - hibernate 는 내부의 persistence layer에만 존재하면 되는 라이브러리이므로, implementation을 사용했다. 

- **api**: implementation 과 동일하게 프로젝트의 결과물에 컴파일되어 포함되어야하는 의존성. 프로젝트에서 드러나는 API 로 포함된다는 점이 차이점이다. 
  - guava는 guava 라이브러리 내부의 클래스가 이 어플리케이션이 사용하는 메소드 시그니처에 나타나는 등 드러나는 역할을 담당할 예정이다. 

- **testImplementation** : 컴파일하는데 필요하고, 프로젝트의 테스트 소스이다. 
  - junit은 대표적인 테스트 라이브러리 중 하나로, 테스트 시에만 필요하다. 

만약 api 를 사용해야하는데, implementation을 사용한다면 당연히 컴파일 시에 오류가 난다. 이 케이스에서는 guava 파일을 메소드 시그니처에 사용할 수 없다고 오류가 날 것이다. 반대로 implementation으로 충분한데 api 를 사용한다면, 적절하게 캡슐화 & 추상화되지 못하고 외부의 사용자가 필요없는 라이브러리를 직접 참조할 수 있게 되므로 깔끔한 코드가 아니라고 할 수 있다. 😭

참고로, dependencies 를 이렇게 정의하고 `dependencies` task (네, 이것도 task 에요!) 를 돌린다고 해서 바로 jar 나 라이브러리 파일을 가져오지는 않는다. 이 task는 단순히 메타정보만 가져오고, 실제로는 compile task 나 `reload All gradle projects` 를 통해서 가져오니, 유의하도록 하자! (+maven 에서는 의존성만 가져오는 방법이 있었다고 한다. stackoverflow를 찾아보니 직접 이런 task를 정의해서 사용하는 경우도 있다.) 

### 의존성만 관리하는 gradle 파일을 만들자 !

그런데... 우리가 만약 멀티모듈 프로젝트를 사용하고, 모듈마다 dependencies 를 관리한다면 어떨까? 작은 모듈, 그리고 적은 의존성일 때는 상관없지만 어플리케이션이 점점 커짐에 따라 이런 부분을 깔끔하게 정리해야할 필요성이 생긴다. A라는 라이브러리를 1번 모듈에서는 1.0.2 를 참조하는데, 2번 모듈에서는 (딱히 이유가 없음에도 불구하고) 1.0.4 를 참조할 수도 있다. 이때 A는 1.0.2, 1.04 두가지 버전으로 따로 fetch 되어 관리되지 않을까? 

비슷한 상황을 방지하기 위해서 의존성은 하나의 파일로 깔끔하게 들고와서 관리할 수 있다. 바로 `io.spring.dependency-management` plugin 을 사용하는 방법이다. 의존성을 하나로 묶어줄 파일명은 `dependecies.gradle`이라고 하고 하나 생성하자. 

```groovy:title=dependecies.gradle
apply plugin: 'io.spring.dependency-management'

dependencyManagement {
    dependencies {
        dependency 'org.springframework:spring-core:4.0.3.RELEASE'
    }
}
```

이 플러그인을 사용하면 위와 같이 `dependencyManagement` 하위에 의존성을 정의한다. 이 아래에 평범하게 의존성을 정의하면, 다른 곳에서는 **버전 명시없이 이름만으로 똑같은 라이브러리를 사용가능**하다. 

일단 그런데 이 `dependecies.gradle` 을 포함시켜주자! 

```groovy:title={rootProject}/build.gradle
apply from: "$rootDir/dependencies.gradle"
```

그리고 다른 모듈에서 이렇게만 정의하면 버전정보를 명시하지 않아도 동일하게 4.0.3 을 가져올 수 있다. 

```groovy:title=api/build.gradle
dependencies {
    implementation 'org.springframework:spring-core'
}
```
이렇게 전체 프로젝트에 라이브러리 일관성을 가져갈 수 있어서 매우 편리한 방법이다! 

### 마치며 

이렇게 spring project 에 필요한 gradle을 가볍게 훑어보았다. gradle에 대해서는 지식이 파편적으로 나뉘어있어서, 기회가 된다면 본격적인 공부글을 작성해보도록 하겠다. 



## 참고 

- [gradle wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html#sec:upgrading_wrapper)

- [what is gradle](https://docs.gradle.org/current/userguide/what_is_gradle.html)

- [우아한 형제들 블로그 - 멀티모듈 설계이야기](https://techblog.woowahan.com/2637/)

- [dependency-management-plugin](https://docs.spring.io/dependency-management-plugin/docs/current-SNAPSHOT/reference/html/)
