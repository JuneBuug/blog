---
title   : 'gradle facts' 
slug  : '/gradle'
layout  : wiki 
excerpt : 
date    : 2020-05-28 13:55:46 +0900
updated : 2020-12-15 11:28:40
tags    : 
---

## gradle build가 느린 이유

daemon을 띄우고, 원격으로 붙여서 빌드를 하기때문이다. intelliJ 에서 빌드를 하면 그래서 상대적으로 빠르다. 하지만 intelliJ의 경우 hook을 걸수가 없고, 걸려고 해도 전체 test에 가서 따로 붙여줘야한다. 자동화가 안된다는 단점이 있다.

정작 jenkins 등 CI 툴에서 빌드 명령을 내리려면 `./gradlew <명령어>` 를 통해서 빌드를 해주므로, 로컬에서는 intelliJ로 빌드를, CI에서는 gradle로 동작하도록하는데 익숙해지고 있다.



