---
title   : '나의 첫 JVM heap dump 뜨기' 
slug  : '/jvm-heap-dump'
layout  : wiki 
excerpt : 
date    : 2023-03-07 21:55:23 +0900
updated : 2023-03-07 22:03:56
tags    : 
- JVM
---

# 서론 
 성능테스트를 계속하고 있다. 부하를 많이 주긴 했지만, 매우 빠른 시간 내에 full GC 가 일어나는게 요상스럽다, 싶어서 heap dump 를 떠봐야겠다는 결심을 했다. 
 heap dump를 알기 전에 jvm의 구조와 heap 메모리 영역에 대해서 알면 좋으니 해당 링크는 [여기](https://juneyr.dev/jvm-basics) 로. 
 
# 절차 

절차는 다음과 같다. 

- java process 를 확인한다. 
  ```bash
  jps # 혹은
  ps -ef | grep java
  ```
- PID 를 확인했으면 다음 jmap 명령어를 통해 heap dump 를 만든다. 
```
jmap -dump:format=b,file=heapdump.hprof <PID>
# jmap -dump:format=b,file=heapdump.hprof 1234 
```

heap dump 를 만들면, 그 당시 프로세스가 점유하고 있던 heap 메모리의 정보를 알 수 있다. 

- 해당 heapdump 를 받을 수 있는 형태로 로컬에 받는다. 
scp 등 다양한 방법이 있겠지만, 나는 사내 대용량 스토리지에 업로드 한 후, 
다시 다운로드 받는 방법을 선택했다. 5G 정도 되는 크기여서 상당히 부담스러웠다.

- [Eclipse MAT](https://www.eclipse.org/mat/) 를 설치한다. 
둘러봐도 MAT 이 가장 무난한 분석툴이었다.  
> **Java heap analyzer** that helps you find memory leaks and reduce memory consumption.

- MAT 를 모두 받고, hprof 파일도 받았다면 설정을 변경한다.

heapdump 파일 자체도 5기가 쯤 되었기때문에, MAT 의 heap 크기를 변경하지 않으면 MAT 자체의 OOM 이 뜨면서 구동이 되지 않는다.

참고의 문서를 그대로 따라해서, MAT 설정을 변경했다. 
`/Applications/mat.app/Contents/Eclipse/MemoryAnalyzer.ini`

```bash 
-Xms6g
-Xmx6g
```

## MAT 을 보자

![main](./main.png)

구동시 화면. 내가 6G 로 변경해줬기때문에 하단에 6G 정도 메모리 차지를 하고 있는 것이 보인다. 

![options](./options.png)

위와 같은 옵션을 선택해서 원하는 바를 분석할 수 있다. 
보통은 `Leak Suspects` 를 선택해서 누수가 일어나는 가능성이 있는 것이 어디인지 파악하는게 보통이다. 
나도 해당 옵션을 선택했다.

![issue](./issue.png)
http 로 연결하는 부하테스트를 한 만큼 TaskThread가 생성이 많이 (1000개 정도) 되었고, 그게 전체 힙의 92%를 차지하고 있다는 점을 알 수 있다. 

옵션에서 `Dominator Tree` 를 선택하면 차지하고 있는 비중이 큰 오브젝트를 순서대로 볼 수 있다.

![details](./details.png)
1000 개 중 아무거나 선택해서 쭉 봤다. 

`shallow` heap 은 그 객체 자체가 차지하는 heap 이고, `retained heap` 은 해당 객체가 gc 처리될 때 함께 gc 되는 heap 의 양을 전체 합한 것이다. 

짧은 이해로는, 예시가 map의 shallow hap 은 56이지만 retained heap 이 346만에 달한다. map 은 다른 여러 객체의 레퍼런스를 갖고 있기때문에 retained heap 이 이렇게 커지는 것 아닐까 싶었다. 

그럼에도 불구하고 map 이 이렇게 까지 큰건 담고 있는 오브젝트들의 크기가 과하게 많다는 생각이 들었다. 가져온 것을 여러번 map 으로 collect 하는 과정이 있는 것도 한 몫했고. 이 부분에 대한 인사이트를 얻을 수 있었다. 


# 결론 
MAT 을 활용하는 방법은 [공식문서](https://help.eclipse.org/latest/index.jsp?topic=%2Forg.eclipse.mat.ui.help%2Fgettingstarted%2Fbasictutorial.html) 에 잘 나와있다. 구체적인 사용법을 보지 못한 채 눈에 보이는 것만 분석했는데, 여유가 된다면 이 부분도 추가가 필요함 🤔

## 참고 
https://jupiny.com/2019/07/15/java-heap-dump-analysis/
https://help.eclipse.org/latest/index.jsp?topic=%2Forg.eclipse.mat.ui.help%2Fgettingstarted%2Fbasictutorial.html