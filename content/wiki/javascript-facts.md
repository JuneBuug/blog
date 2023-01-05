---
title   : '자바스크립트 초짜의 javascript facts' 
slug  : 'js-facts'
layout  : wiki 
excerpt : 
date    : 2023-01-05 22:33:05 +0900
updated : 2023-01-05 22:36:25
tags    : 
---

## 세미콜론에 대해서 

자바스크립트 엔진은 세미콜론으로 문이 종료한 위치를 파악하고 순차적으로 하나씩 문(statement)를 실행한다. (...) 이는 옵션이다. 즉, 생략가능하다. 이는 자바스크립트 엔진이 소스 코드를 해석할 때 statement 의 끝이라고 예측되는 지점에 자동으로 붙여주는 ASI(automatic semicolon insertion)이 암묵적으로 수행되기 때문이다! 

하지만 ASI의 예측과 개발자의 예측이 일치하지 않는 경우가 간혹 있다. 
```javascript
function foo () {
  return 
    {}
    // ASI -> return; {};
    // 개발자 -> return {};
}
```

세미콜론을 반드시 붙여야한다는 주장이 다수지만 붙이지말아야한다는 주장도 있다. 그런데 eslint 등에서도 세미콜론 사용을 기본으로 설정하고 있고 TC39도 권장하는 분위기다. 
> 모던 자바스크립트 Deep Dive: p.56
