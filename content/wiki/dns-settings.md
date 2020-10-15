---
title   : 'vercel 로 옮겨가며 dns 세팅하기- netlify 안녕! 👋'  
slug  : '/vercel-dns'
layout  : wiki 
excerpt : 
date    : 2020-10-06 12:50:21 +0900
updated : 2020-10-15 11:00:35
tags    : 
---

# 서론 
  
  netlify 의 빌드는 느리다. 평균 6분정도. 내부적으로 동일한 부분은 캐싱할 텐데도 상당히 느린 속도다. 그러나 gatsby 시작할 때 netlify 에 의존했으므로, 옮기기 애매하다. 귀찮다. 고 생각하고 있던 차에 트위터에서 로토님의 트윗을 보게되었다. 
  
## vercel로 옮겨가 
정말 vercel이 빠른가? 시험삼아서 블로그를 빌드해보았다. 
build 과정에서 무수한 gatsby build의 괴로움이 있었지만 (알고보니 깨졌던 많은 라이브러리들...) 대부분 버전을 bump up 해서 해결한다. 
이를 이겨내고 빌드를 마치고나니 총 빌드시간은 **4분**. 이정도 단축으로도 충분히 옮길 가치가 있다는 생각이 들었다. 더불어, netlify 의 한달 빌드 용량을 훌쩍 넘어가고 있던 터라 별 생각안하고 옮기기로 했다.  
https://github.com/JuneBuug/blog/deployments/activity_log?environment=Production


