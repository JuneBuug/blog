---
title   : intelliJ + Spring Boot + gradle 에서 로컬 jar lib 넣는 방법 
slug  : '/local-lib'
layout  : wiki 
excerpt : 
date    : 2021-11-10 18:06:36 +0900
updated : 2021-11-10 18:22:54
tags    : 
- Java
---

## 원하는 jar 다운로드 하기 
- maven central 에 올라가지 않은 jar

- 버전업이 필요없는 (^^!!) jar 

- 더이상 지원하지 않는 jar 
  
인 경우 jar 파일 라이브러리를 직접 임포트해줄 일이 발생한다. 

경로는 원하는 모듈의 src 와 같은 계위에 `libs` 폴더 (이름은 딱히 상관없지만 convention) 을 만들고 그 하위에 넣어준다. 

![tree](./scrn3.png)

## jar libs 로 만들기 
Project Structure > Project Settings > Libraries >  `+` 버튼을 눌러 해당 jar를 라이브러리로 인식하게 한다. 

## build.gradle에 포함 
```groovy
dependencies {
    # 중략, 다음 줄 추가
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    # 혹은 해당 jar만 넣고 싶다면 files('<jar경로>') 
}
```
## reload all gradle projects 
매번 gradle 파일 변경점마다 import 하는 기능을 꺼두어서, 필요할 때는 gradle project reload를 통해서 lib를 가져온다. 이 모듈이 이 라이브러리를 필요로 한다는 점을 알려줘야하기때문에, reload 한다. 

![reload all](./scrn4.png)
