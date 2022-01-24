---
title   : '블로그 vercel 로 옮기고 dns 세팅하기'  
slug  : '/vercel-dns'
layout  : wiki 
excerpt : ' netlify 안녕! 👋'
date    : 2020-10-06 12:50:21 +0900
updated : 2020-10-15 11:00:35
tags    : 
- Blog
- Netlify
- Vercel
---

# 서론 
  
netlify 로 블로그도 사용하고, 토이프로젝트도 만들면서 [[toyproject-with-fauna]] 느껴본 본 점. 
netlify 의 UI 는 좋다. 연계도 좋다. 
하지만 빌드는 느리다. 블로그 기준 평균 6분정도.내부적으로 동일한 부분은 캐싱할 텐데도 상당히 느린 속도다. ![netlify-build](./netlify.png)

메인 이미지가 로딩되는 속도도 느리다. 블로그 메인 배너로 걸어둔 두 이미지가 가끔 X 박스로 나올 때가 빈번했다. 

그러나 gatsby 시작할 때 netlify 에 의존했으므로, 옮기기 애매하다. 귀찮다. 고 생각하고 있던 차에 트위터에서 로토님의 트윗을 보게 되었다. 내용 자체는 netlify와 vercel 간 확연한 로딩 속도 차이였다. (vercel이 확연하게 속도가 빨랐음.)
  
netlify 의 장점으로 여기던 부분 (gatsby 와의 빠른 연동, github 연동, 좋은 UI)... 가 vercel에 있는 걸 확인하고 체크하기 시작했다.
 
## vercel로 옮겨가기
정말 vercel이 빠른가? 시험삼아서 블로그를 빌드해보았다. 
build 과정에서 무수한 gatsby build의 괴로움이 있었지만 (알고보니 깨졌던 많은 라이브러리들...) 대부분 버전을 bump up 해서 해결해버렸다. 

- 이를 이겨내고 빌드를 마치고나니 총 빌드시간은 **4분**. 이정도 단축으로도 충분히 옮길 가치가 있다는 생각이 들었다. 
- netlify 의 한달 빌드 용량을 훌쩍 넘어가고 있던 터였다. (글또 할 때 기준 =))
- cdn 이 정말 빨랐다. 아직까지 옮기고 나서 블로그에서 이미지가 로딩 실패하거나 오래 걸린 적이 없다. 

위를 고려하면 vercel로 옮겨갈 유인이 충분했다.

![배포완료](./srcn.png)
## vercel에 도메인 등록하기 
도메인 등록의 중요성. 이런 사이트 배포 툴이 제공하는 기본 url에 얽매일 필요가 없다. 
나는 https://juneyr.dev 를 사서 잘 쓰고 있기때문에, 다시 한번 이걸 변경해줘야했다.

https://github.com/JuneBuug/blog/deployments/activity_log?environment=Production


