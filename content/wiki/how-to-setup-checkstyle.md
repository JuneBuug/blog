---
title   : 'intelliJ, Checkstyle 과 formatter 셋업하기' 
slug  :  '/checkstyle'
excerpt : 
date    : 2020-04-21 18:04:29 +0900
updated : 2022-04-08 19:08:56
tags    : 
 - IDEA
 - CheckStyle
 - Clean Code
---

## 서론
혼자만의 프로젝트든, 함께하는 프로젝트든, 기본적인 코드컨벤션이 있다면 코드의 가독성은 확 높아집니다. 
그런데 이런 코드 컨벤션을 세워도, 매번 기억하거나 유의하기 어려울 때도 있죠. 
PR 에 코드 컨벤션에 대한 코멘트만 적힌다면, 마음이 상하기도 쉽습니다. 

이런 부분은 코드의 정적분석으로 해결할 수 있는데요.
[sonarqube](https://docs.sonarqube.org/latest/) 같은 정적 분석기를 github에 붙일 수도 있겠지만, 
일단 개개인의 ide에서 코드 컨벤션을 잡아주고 수정해줄 수 있는 방법이 필요합니다. 

먼저 짚고 넘어가겠습니다! `code style` 과 `checkstyle` 은 다릅니다. 
**code style**은 intelliJ 의 기본 기능으로, intelliJ 설정에서 앞으로 작성될 코드가 어떻게 작성될 지 기본적인 룰을 정합니다. 이 값은 앞으로 에디터에 작성될 코드에 적용됩니다. code style은 intelliJ의 GUI 설정으로 수정할 수도 있지만, xml 파일로 관리할 수도 있습니다. 그리고 이 code style 을 정하면 이에 따라서 formatter 도 정해집니다. 따라서 code style을 정하면 formatter 도 정해진다!
![code style]](./3.png)

반면 checkstyle 은 별도의 플러그인으로서, checkstyle 에 따라서 코드 전체 혹은 일부를 원하는 때에 정적분석하면서 코드를 체크할 수 있는 플러그인입니다. 이 컨벤션은 code style과는 별도의 xml 로 관리됩니다. 

한 가지 유의할 점은, checkstyle 의 xml 을 code style 에 임포트하는 방법은 있지만 code style xml 을 checkstyle에 그대로는 호환이 안된다는 점입니다. 이 점을 유의해서 프로젝트의 스타일을 세팅하시면 좋을 것 같네요.

checkstyle 은 eclipse에도 존재하고, intelliJ 버전도 있습니다. 이번에는 intelliJ 버전의 checkstyle과 formatter 적용을 후다닥 알아봅니다.

## intelliJ에서 checkstyle 셋업하기

1. tab을 두번 눌러 actions 를 호출 

2. plugins 를 선택 
   
3. marketplace 에 checkstyle을 검색
![marketplace](./1.png)
4. 설치 후 intelliJ 자체를 리로드한다. 
   
5. System > Preferences > Tools > Checkstyle 
![checkstyle](./2.png)

Check Style 버전을 확인해줍니다. 
맞지 않는 버전을 사용하면, 어떤 xml은 읽지 못하니 주의해주세요!

여기서도 원하는 checktyle 을 따로 import하거나, 기본으로 포함된 값을 사용할 수 있습니다. 

- Sun Checks
- Google Checks

위 check style 외에 다른 값이 필요하다면, `Configuration File` 하단에 있는 + 버튼을 눌러서 추가합니다.

## checkstyle 은 어떻게 사용하나요? 

두가지 방법이 있습니다. 

1. intelliJ에서 원하는 파일에 돌리기 

![checkstyle-application](./6.png)

하단의 checkstyle을 누르면, 원하는 checkstyle로 현재 열린 파일을 검사할 수 있습니다. 
초록색 재생버튼을 눌러보세요!

checkstyle에 맞지 않는 부분이 경고로 뜹니다. 

위 사진의 경우에는 JavaDoc annotation으로 설명을 하지않았구나! 하고 경고를 띄워주네요.

2. commit 시에 checkstyle 검사하기

![checkstyle-commit](./7.png)
commit 옵션에는 `scan with checkstyle` 이 이제 생깁니다. 
이 부분을 체크해주시면, commit시에 전체적으로 파일을 검사해줍니다. 

![checkstyle-commit2](./8.png)
커밋전에 Review버튼을 눌러 고쳐주면 계속 신경쓰지 않아도 커밋전에 검토할 수 있어요! 

## formatter 셋업하기 

formatter를 사용하면 정해진 룰에 따라서 코드를 정리정돈해줍니다. 
formatter를 사용하고, 하지않고의 차이가 생각보다 커서 꼭 사용하기를 추천드립니다. 


1. System > Preferences > Editor> Code Style > Java

![formatter](./3.png)

`Scheme` 의 톱니바퀴를 눌러 직접 포매터 xml 파일을 임포트 해줄 수 있습니다. 

만약 팀 내에서 추천되는 스타일이 없다면, google style을 추천드립니다. 
참고: [Google Java Formatter Guide](https://google.github.io/styleguide/javaguide.html)

- [intellij-java-google-style.xml](https://raw.githubusercontent.com/google/styleguide/gh-pages/intellij-java-google-style.xml) 을 다운받아 해당 프로젝트 경로에 저장합니다.
- `Scheme` 톱니 바퀴 > Import Scheme > IntelliJ Style IDEA Code Style xml 

![formatter-2](./4.png)



## Formatter 사용하기 

OS X 기준으로 `cmd + alt + L` 을 누르면 format이 됩니다. 

![formatter-3](./5.png)

> 참고 : 위에서 언급한대로  checkstyle 과 formatter가 사용하는 xml 이 달라서, checkstyle에는 잡히지만 formatter에서 고쳐주지 않는 경우도 있습니다. 



## 덧: import organize 

이렇게 formatter를 설정해두면 아주 편리합니다! 
더불어 저는 import 의 순서와 불필요한 import 를 제거해주는 명령어도 저장만큼 많이 누르곤하는데요,
여기에 붙여지면 좋을 것같아서 남겨둡니다. OS X 기준으로 `ctrl + alt + o` 입니다. 

## 마치며

사실 위에서도 언급했듯이 개개인의 코드 정리도 필요하지만, 팀에서 이런 부분을 맞출 때는 PR에서 잡아주는 것도 필요합니다. 
이 부분은 sonarqube 를 많이 사용하게 되는데요, 
github 에서 sonarqube를 셋업하고 사용하는 부분도 차후에 다뤄보도록하겠습니다. 
