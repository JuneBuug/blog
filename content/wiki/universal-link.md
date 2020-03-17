---
title   : '유니버셜 링크 제공하기' 
slug  : '/universal-link'
layout  : wiki 
excerpt : 
date    : 2020-03-16 14:57:22 +0900
updated : 2020-03-16 16:14:38 +0900
tags    : 
parent  : 
---

## 히스토리 
팀에서 유니버셜 링크 담당하시던 분이 휴직하시면서 이번 프로젝트에서는 어떻게 제공해야하는지 내용을 남기고 가셨다. 추적하면서 서버입장에서는 어떻게 해야하는 건지 다시 또 정리해보고싶다. 

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
