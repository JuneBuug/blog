---
title   : '유니버셜 링크 제공하기' 
slug  : '/universal-link'
layout  : wiki 
excerpt : 
date    : 2020-03-16 14:57:22 +0900
updated : 2020-08-31 11:14:33
tags    : 
parent  : 
---

## 히스토리 
팀에서 유니버셜 링크 담당하시던 분이 휴직하시면서 이번 프로젝트에서는 어떻게 제공해야하는지 내용을 남기고 가셨다. 추적하면서 서버입장에서는 어떻게 해야하는 건지 다시 또 정리해보고싶다. 

## 앱 스킴, 딥링크, 유니버셜 링크, 앱링크 

앱 스킴, 딥 링크, 유니버셜 링크, 앱 링크는 전부 다른 내용을 의미한다. 그러니까 하나하나 알아두는게 일단 좋다. 


### 1️⃣  앱 스킴 App Scheme 혹은 URL scheme

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
눌렀을 때 앱으로 연결되도록하는 URI 입니다. (일반 http 링크 혹은 앱스킴의 형태를 가집니다.) 

즉 `https://www.example.com` 혹은 `app://open.my.app` 두 형태를 모두 지원합니다. 눌렀을 때 필요한 앱을 직접 선택할 수 있도록 한다는 특징이 있습니다. 

![딥링크 대화상자](https://developer.android.com/training/app-links/images/app-disambiguation_2x.png?authuser=0)

https://developer.android.com/training/app-links/deep-linking?authuser=0

    
### 앱링크 App Link 
https://developer.android.com/training/app-links/verify-site-associations?authuser=0#the-difference
개발자의 웹사이트라는게 확인된 웹사이트 URL 기반의 딥 링크입니다. 
이 링크 중 하나를 클릭하면 설치되어있는 앱이 즉시 열리며, 앱 선택 대화상자는 표시되지 않습니다. 이는 인증된 것이기때문에 바로 연결되는 것 같네요. 

- Android 6.0 이상에서만 호환됩니다. 
- Google의 verify 과정을 거쳐야하기때문에, public 도메인에서만 사용이 가능합니다. 

### universal link 

https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html

- iOS 9+ 에서 동작 
- url 형태로 동작 
- 해당 url 상위 페이지에 `apple-app-site-association` 파일을 서빙해주어야함. 이 파일은 app이 처리할 수 있는 URL을 json 형태로 명시해둔 것.
- 보통 root 와 `.well-known` 디렉토리에 둘다 서빙  
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


### Adjust 에서 설명하는 deep link (deferred) 
https://www.adjust.com/blog/dive-into-deeplinking/

adjust 는 다양한 통계툴과 함께 deep link 라이브러리를 제공하고 있는 회사인데요. 회사분이 추천해주셔서 여기에 링크한번 남깁니다. 간단하게 요약하자면, 
deep linking 을 사용하면 유저가 앱과 앱을 오가는게 쉬워집니다. 웹을 보다가 특정 화면만 유저가 앱으로 봤으면 하는 경우 딥링크가 작동하는데요. 이때 유저가 앱을 깔아두었으면 바로 해당화면으로 이동합니다.

딥링크에는 크게 두가지 타입이 있습니다. 

1. default 
   default deep link 는 **유저가 이미 앱을 깔았을 때만** 원하는 화면으로 이동합니다. 앱이 없는 경우 에러를 띄웁니다. 즉, 미리 앱을 깐 유저들을 다시 데려오고 싶은 목적일 때만 유용합니다. 
   
2. deferred 
   defered deep link는 훨씬 복잡합니다. 이 딥링크는 앱이 깔려있지 않은 유저를 App이나 Play Store로 데려가고 ... 설치된 뒤에는 원래 보고싶었던 페이지를 띄우게 합니다. 
  
  그래서 만약 신발 광고를 클릭해서 앱을 다운로드하면, 유저는 스토어로 라우팅되었다가 - 앱이 설치되어 열리는 순간에 해당 신발의 페이지가 뜨게 됩니다.
  
  deferred deep link 는 Adjust (나 firebase?) 같은 딥링킹 솔루션으로만 가능합니다. 이 솔루션은 SDK 로 앱에 탑재하도록 제공하고 있습니다. 
  
  contextual deep linking 이라는 용어를 들어봤을지 모르겠습니다. 이는 표면상으로는, 더 많은 정보를 저장해서 마케터에게 추가적인 혜택을 제공하는 링크들을 말합니다. 단순히 생각하면 default 나 deferred 링크인데, 마케터가 사용할 수 있는 파라미터가 추가된 것일 뿐입니다. 이 개념이 단독으로 존재하는 건 아니구요. 
  

  직접 딥링크를 구현하는 것은 힘들다고 말하고 있는데, 일단 adjust 에 대해서 간략히 설명하면 scheme-based linking (안드로이드, iOS모두 ) 그리고 iOS 9+의 Universal Link를 모두 지원합니다. 
  > scheme-based : yourapp:// 형태, universal link: https://yourdomain.com 형태 



#### 실제로 딥링크를 어떻게 구현해야하는데 (javascript와 브라우저단에서)

**안드로이드** 
scheme 이 `yourapp://path/first` 라고 하자.

- 자바스크립트 solution 
  - 앱이 설치되어있으면, 앱이 열린다. 
  - 앱이 설치되어있지 않아서 `yourapp://path/first` 가 아무런 동작을 안하면, timeout 2초가 진행된다음 playstore로 동작한다. 
  - 앱이 열리고나서도, 유저가 이 브라우저 화면 들어가면 계속해서 앱스토어로 리다이렉트 시킨다. 이 부분에 대한 조정이 필요함. 
- intent Solution
  - 안드로이드 크롬 버전이 25 + 인 경우, 위처럼 구현할 필요없다. url intent `intent://path/#Intent,;scheme=yourapp;package=com.yourapp.example` 형태를 유저가 클릭하면 
  - 앱이 설치되어있으면 크롬이 그 앱을 열어줌
  - 앱이 설치되어있지 않으면, 크롬이 playstore를 열어줌 
  - 단 최신 버전에만 가능하고, 브라우저에 의존하는 것이기때문에 동작하지 않을 확률이 있음 


**iOS**

- 자바스크립트 solution 
  - `yourapp://path/` 를 replace 해서 접근하고, 이동하지 않은 경우 timeout 설정해서 itunes app 스토어로 이동 (안드로이드와 비슷)
  - iOS8 이하에서 잘작동
- universal link solution 
  - iOS 9+ 에서 동작 
  - SSL 인증된 도메인, 그리고 AASA(apple-app-site-association) 이라는 JSON 파일을 해당 도메인으로 서빙해야함. 
  - Xcode 에서, applinks:<도메인이름> 해줘야함.. 
  - 한 도메인이 여러 앱이랑 엮일 수 있고, 거꾸로도 가능함 (M:N 구조)
  - 앱 개발자가 UIApplicationDelegate 메소드를 적용해야함.  

  - `https://yourdomain.com/dress` 를 앱과 관계를 매핑해놓는다고 하자. AASA 파일에는 `"paths:": ["/dress"]` 형태로 들어간다. 사파리에서 유저가 이 `https://yourdomain.com/dress`를 클릭하면 
     - 앱이 깔려있으면 앱이 열리고 이 주소가 UIApplicationDelegate로 넘어간다. 앱에서 이 주소면 어떤 view를 열어줄지 결정
     - 앱이 안깔려있으면, 이 주소 자체가 사파리에서 열림. 이 도메인에서 바로 상품을 보여줄수도 있고, 앱스토어로 리다이렉트할 수도 있음. 
  
  - 다만.. 
    - 사파리와 크롬에서만 동작함 
    - 다른 사이트가 유니버셜링크로 리다이렉트해도 동작하지않을 수 있음. 이메일 앱에서 `https://yourdomain.com/dress/1`으로 리다이렉트하는 링크 A를 클릭하면 딥링크 동작안함. 하지만 사파리에서 이 링크 A를 클릭하면 동작함. 
    - 바로 링크를 주소창에 넣으면, 유니버셜링크 동작하지않음
    - redirect를 자바스크립트로 한 경우면, 유니버셜링크 동작하지않음
    - openUrl 등으로 앱 안에서 링크를 열면 동작하지않음


## 참고 
https://developers.naver.com/docs/utils/mobileapp/
