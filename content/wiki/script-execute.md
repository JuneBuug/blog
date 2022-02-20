---
title   : 'bash script 글로벌 실행하기' 
slug  : '/bash-execute'
layout  : wiki 
excerpt : 
date    : 2022-02-20 19:10:32 +0900
updated : 2022-02-20 19:12:04
tags    : 
- Linux
---

## 서론 

서버를 운영하다보면 종종 간단한 형태의 bash script를 작성할 일이 생긴다. 이 블로그 운영에도 이런 일이 있다. 터미널에서 md 파일을 mdx 파일로 만들어서 폴더로 복사하는 부분을 bash script로 작성해서 사용하고 있다.  또한, 게이트웨이에 접속할 일이 생겼을 때 매번 ssh 명령어를 치지않고, 한줄짜리 스크립트를 작성해두고 이용하곤 한다. 그런데 문득  `왜 나 ./script.sh` 하지 않고 있지? 라는 의문이 생겼다. 

분명 초기 세팅에서 이렇게 해뒀던 것 같은데, 이 스크립트가 현재 디렉토리에 없는데 글로벌하게 어떻게 설정해둔 건지 궁금해졌다. 스크립트를 경로 표기 없이 글로벌하게 실행하는 방법을 알아보고, 해당 원리를 간략하게 정리해본다. 이 포스트는 OS X 를 기준으로 한다. 

## 스크립트 만들어보기

![script 내용](./carbon.png)

테스트를 위해서 위와 같은 스크립트를 작성한다. 이 스크립트는 `this is test script` 의 한줄을 터미널 화면에 보여주는 간단한 일을 수행하게 된다. 

스크립트 작성을 완료하고, 아래와 같이 실행 권한을 확인해본다. 
```bash 
# 스크립트를 작성하고, 실행 권한을 확인해본다
~  ls -al | grep script.sh                       ✔ ╱ at 07:43:20 PM 
-rw-r--r--   1 user  staff         41  2 20 19:43 script.sh
```

표현된 것과 같이, **실행권한** 이 없다는 것을 확인할 수 있다. `chmod` 명령어를 사용해서 스크립트에 실행권한을 추가해준다. 그리고 다시 한번 확인하면 실행 권한이 추가된 것을 확인 할 수 있다. 

```bash
# script 에 실행권한을 추가하자
~  chmod +x ./script.sh

# 실행권한이 추가 되었구나!
 ~  ls -al | grep script.sh                       ✔ ╱ at 07:44:06 PM 
-rwxr-xr-x   1 user  staff         40  2 20 19:44 script.sh
```

이제 스크립트를 실행해보면, 스크립트의 내부가 잘 실행되는 것을 확인할 수 있다. 
혹시 몰라 `script.sh` 도 함께 눌러봤다. 내가 설치한 **zsh** 에서는 이런 명령어를 확인할 수 없다고 한다.  🤔

```bash
# 스크립트 실행해봄
~  ./script.sh                                   ✔ ╱ at 07:44:03 PM 
this is test script

 ~  script.sh                              ✔ ╱ at 07:56:54 PM 
zsh: command not found: script.sh
```

### `/usr/local/bin` 으로 해당 스크립트를 옮겨보자 

그럼 이 스크립트를 이제 `/usr/local/bin` 하위로 옮겨보자.
 
```bash 
mv script.sh /usr/local/bin/script.sh

``` 
그 뒤에 곧장 `script.sh` 를 실행한다. 이번에는 바로 성공한다. 
```bash 
# 확인
~  script.sh                              ✔ ╱ at 08:02:34 PM 
this is test script
```



## 왜 그런거에요? 🥺
스크립트를  `/usr/local/bin` 디렉토리가 뭔데 이런 차이가 생길까? 그리고 하는 김에  `/bin`  그리고 `sbin` 은 뭐고 `/usr/lib/` 은 뭘까? 😎

차근차근 알아보자.  [위키피디아 : FHS](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) 문서에서 이 내용을 모두 확인할 수 있다. FHS 는 FileSystem Hiearchy Standard 로, `unix` OS 에서 파일시스템이 어떤 위계를 가져야하는 지에 대한 레퍼런스다. OS X 는 unix 의 손녀뻘쯤 되므로, 이 레퍼런스를 참고하면 위의 물음에 답을 얻을 수 있다. 

- `/bin` : **바이너리**. 참고로 바이너리라고 해서 정말 이진화된 수준의 값인 줄 알았는데, 실행가능한 코드, 실행가능한 파일 및 프로그램도 모두 바이너리라고 부른다. [참고](https://en.wikipedia.org/wiki/Executable) 특히 해당 폴더는 모든 유저 (OS 의 유저)들을 위해 공통적으로 필요한 필수 명령어들이 모여있는 곳이다.  (e.g. `cat`, `ls`, `cp` 명령어 등)

- `/sbin`: **시스템-바이너리**. 시스템을 구축하는데 필수적인 바이너리를 둔 곳이다. (e.g. `init`, `route` 등)

- `/lib` : **라이브러리**. `/bin` 과 `/sbin` 에 있는 바이너리들을 위해 필요한 라이브러리가 모여있는 곳이다. 

- `/usr` : **유저**. 읽기 전용 유저 데이터를 위한 계층/폴더. 대부분 유저가 필요한/설치한 프로그램들이 설치되는 곳이기도 하다. 공유가능하지만 읽기 전용이여야 한다. 

   - `/usr/local`:  지금 사용하고 있는 이 유저에게만 종속되는 계층/폴더. 이 하위로 `bin`, `lib` 을 따로 갖기도 한다. 
   
   - `/usr/bin` : 필수가 아닌 커맨드 바이너리가 들어가는 곳. 
   
   - `/usr/sbin`: 필수가 아닌 시스템 바이너리가 들어가는 곳. 
   

원래 질문으로 돌아가보자. 우리의 스크립트는 `/usr/local/bin` 으로 들어간다. 위의 지식을 종합하면, 우리의 스크립트는 **지금 사용하고 있는 이 유저에게만 종속되는 바이너리 보관 폴더** 로 옮겨졌다.  유닉스-유사 시스템들은 절대 경로가 없이 표기한 `script.sh` 를 실행 가능한 명령어로 여기고, 위 계층에 따라서 차례로 탐색한 후 `script.sh` 를 실행할 수 있었던 것이다. 
 



## 참고 

https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard 

https://www.quora.com/Whats-the-difference-between-bin-and-usr-bin-in-Linux
