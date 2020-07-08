---
title   : '유니버셜 링크 제공하기' 
slug  : '/universal-link'
layout  : wiki 
excerpt : 
date    : 2020-03-16 14:57:22 +0900
updated : 2020-07-08 11:55:48
tags    : 
parent  : 
---

## 히스토리 
팀에서 유니버셜 링크 담당하시던 분이 휴직하시면서 이번 프로젝트에서는 어떻게 제공해야하는지 내용을 남기고 가셨다. 추적하면서 서버입장에서는 어떻게 해야하는 건지 다시 또 정리해보고싶다. 

## 앱 스킴, 딥링크, 유니버셜 링크, 앱링크 

앱 스킴, 딥 링크, 유니버셜 링크, 앱 링크는 전부 다른 내용을 의미한다. 그러니까 하나하나 알아두는게 일단 좋다. 


### 앱 스킴 App Scheme 혹은 URL scheme

사실, https:// 와 같은 문자열 자체를 url scheme이라고 부르는데,  앱으로 이동하는 url scheme으로 만들려고하면 보통 이렇게 만든다.  
```bash
naversearchapp://명령어?파라미터=옵션&버전
```
이 링크를 클릭하면, 모바일에서는 이렇게 인식한다.
- 위 scheme이 링크된 하이퍼 링크를 클릭한다. scheme이 시스템에 전달된다. 
- 시스템에서 전달된 url scheme을 보고, '실행가능한 앱이 있나..? 🤔' 확인
- url scheme을 받을 수 있는 앱이 있다면 해당 앱을 실행시키며 url scheme을 전달
- 앱이 실행되면서 url을 참조해서 필요한 화면을 띄우거나 이동시킴

여기서 
- if 앱이 있으면 앱이 실행된다. (iOS, Android 공통) 
- else 앱이 없으면 
  - iOS : 해석불가능한 url scheme이므로 오류 팝업 혹은 페이지가 뜬다. 
    - 이 경우, appstore 링크로 이동해서 앱설치를 유도할 수있다. 
  - Android: intent scheme을 사용하면 자동으로 구글 플레이로 이동한다.
    - intent scheme에는 `intent://<내용>;scheme=naversearchapp;action..` 등으로 intent가 먼저 구성되어있다. 
    - 일반 scheme을 이용한 경우 iOS와 동일한 방식으로 예외처리 가능(구글 플레이로 링크해서 앱설치 유도)


### 딥링크 Deep Link 
    https://developer.android.com/training/app-links/deep-linking?authuser=0
    
### 앱링크 App Link 
https://developer.android.com/training/app-links/verify-site-associations?authuser=0#the-difference
개발자의 웹사이트라는게 확인된 웹사이트 URL 기반의 딥 링크입니다. 
이 링크 중 하나를 클릭하면 설치되어있는 앱이 즉시 열리며, 앱 선택 대화상자는 표시되지 않습니다. 
(인증된 것이기때문에) 







### universal link 
iOS에 해당하는 내용이다. 
링크를 클릭하는 경우 
1) 앱이 깔려있다 -> 앱으로 이동 
2) 깔려있지 않음 -> 웹으로 이동 / app store로 이동 
이 로직을 수행하는 것. 

이 작업을 위해서는 서버, 웹(bridge 페이지), 앱의 수정이 필요하다. 
[Apple 공식 가이드](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html) 를 보면 

1. apple-app-site-association 이라는 파일을 만들어주세요. json 내용이지만 json 확장자로 저장은 하지 않는다.
  - 예시는 https://gist.github.com/anhar/6d50c023f442fb2437e1 에 잘 나와있다. 
  ```json
  {
    "applinks": {
        "apps": [],
        "details": [
            {
                "appID": "<TEAM_DEVELOPER_ID>.<BUNDLE_IDENTIFIER>",
                "paths": [ "*" ]
            },
            {
                "appID": "<TEAM_DEVELOPER_ID>.<BUNDLE_IDENTIFIER>",
                "paths": [ "/articles/*" ]
            },
            {
                "appID": "<TEAM_DEVELOPER_ID>.<ANOTHER_APP_BUNDLE_IDENTIFIER>",
                "paths": ["/blog/*","/articles/*"]
            }
        ]
    }
}
  ```
  - TEAM DEVELOPER ID는 AABBB123CCC 라는 식으로, 숫자와 대문자가 혼재된 형태
  - apps는 empty list로 놔둘 것 
  - 위는 iOS 12, 혹은 그 이전에 해당
  - paths는 웹이 아니라 **앱이** 지원하는 문자열 배열이라고 한다. 모든 문자가 가능하면 그냥 *, 포함하고 싶지 않으면 `"NOT /videos/wwdc/2020/*"` 과 같이 표시하라고한다.
  
  
4. **HTTPS**인 웹서버 경로에 apple-app-site-association(aasa) 파일을 업로드하세요. 루트나, `.well-known` 서브 디렉토리에 올리세요.
   - 웹서버에 한번만 올릴거라면 `scp`로 파일을 업로드하고, 로그인한뒤 해당 파일을 `/var/www` 등 root 경로에 옮기자. 
   - nginx 설정을 살펴보자. 
     ```conf
     // conf.d/site.conf
     server {
     // 중략 
     listen 443; // https 에서 동작해야한다. 
     
     root <홈경로> 
     
     location /apple-app-site-association {
     	default_type application/json;
     }
     }
     ```
6. 이 범용 링크를 처리하도록 앱을 변경해주세요. <-- 여기는 내가 모르는 부분


## 참고 
https://developers.naver.com/docs/utils/mobileapp/
