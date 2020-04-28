---
layout: wiki
title: '리눅스 시스템 관리 cheatsheet'
updated: 2020-04-28 17:22:19 +0900
date: 2020-02-27
slug: "/linux-cheatsheet"
tags: 
   - Linux
   - CLI
   - Network
banner: ./thumb.png
---
# Linux shell scripting 

## Shell 이란 
  사용자와 OS간의 징검다리 

### Shell script
  - 빠르고 간단한 프로토타입으로서의 역할 
  - 반복되는 일련의 커맨드나 유틸리티 실행 작업을 한번에 묶어서 처리한다
  - 스크립트 첫줄의 # 는 스크립트를 해석할 프로그램을 지정 

### shell 종류 
  - bash : 리눅스 기본 shell. 전통 shell인 sh와 호환
  - csh : c 와 비슷한 문법의 shell 
  - ksh : sh와 호환 O, csh 문법도 지원 
  - tcsh : csh의 확장판. 커맨드라인 입력기능 보강

## 기본문법 

### 리다이렉션 
- 입력은 키보드 , 출력은 터미널
- 각각 가상의 파일로 여겨짐. file descriptor 번호가 할당됨
- STDIN (키보드, 0) , STDOUT(터미널, 1), STDERR(터미널, 2)
이것을 제어하고 싶을 때 입력.

- `>` 파일을 생성하여 출력을 저장 
- `>>` 파일이 존재한다면, 끝에 추가하라
- `<` 파일의 내용을 불러온다 
- `2>` STDERR를 리다이렉션한다 
- `>&` STDERR, STDOUT 모두 리다이렉션한다 
- `2>&1` STDERR를 STDOUT으로 리다이렉션한다 
  - 실행되는 에러도 모두 보여준다.

" 리눅스 cron 에서 리다이렉트안하면 계정의 메일함으로 결과가 가서 파티션 용량이 떨어진다.. 👀 파일이나 /dev/null 로 떨어뜨리는 것이 중요!


```bash 
df -h # 파일시스템 용량 정보 등을 알려줌 
df -h > df-result # 위 정보를 df-result 라는 파일로 redirect 
cat < df-result # cat 명령어에 df-result 를 넘겨줌 
sort < df-result # df-result를 sort 해서 출력함
```

### 파이프 
프로그램이나 명령어의 **출력**을 다른 명령어나 프로그램의 **입력** 으로 연결해주는 기능 `|`

```bash
ps aux | grep ssh
```
프로세스의 정보를 출력한 다음 ssh 만 뽑기 

```bash 
ls | xargs cat 
```
파일 목록을 뽑은 다음 이 내용을 전부 cat 하기 (xargs는 인자가 많을때 사용) 

### 변수 
- 대소문자 구분, `=`으로 값을 지정 
- 변수를 미리 선언하지 않아도, 최초 사용시 자동 할당됨
- declare 명령어로 미리 타입을 설정할수는 있음

#### 자주 사용되는 환경변수 
- GROUPS : 유저의 그룹목록
- PWD : 현재 디렉토리 
- PATH: PATH정보 
- RANDOM : 0~32767 까지의 랜덤값 

#### 특수변수 
- `$@` / `$*` 인자의 모든 값
  - 하지만 
    ```bash 
    "$*" # 여러개의 인자들이 하나의 문자열 
    "$@" # 각 인자 하나하나를 따옴표로 감쌈
    # 인자에 공백을 넣고싶은 경우 이렇게 
    ```
- `$#` 파라미터의 전체 개수 
- `$?` foreground 종료의 상태값 
- `$$` 현재 쉘 프로세스 ID
- `$0` 쉘 스크립트의 이름 

#### 인자 
쉘스크립트에 넘긴 순서대로 `$0(파일명)` ~ `$1`,`$2`,,, 의 형식


#### 배열 
declare로 선언할 수도 있고, 배열 할당 방식도 가능
`#{배열 변수명[index]}` 

배열명이 test[11] 의 형식이 될수도 있고 일반적인 변수명의 형태가 될 수도 있음 -> `arr=(호이 호이2 호이3)`


### 조건문 

`if; then fi` 
`if then else fi`
`if then elif else fi` 

혹은 case 문 

```bash 
case 변수 in 조건값)
   명령
   ;; 
  조건값)
  명령 
  ;;
  *)
  명령
  ;;
esac 
```

#### 테스트 연산자
전용 내장 명령어인 `[` 를 사용할 수 있음. 
`test -d dir` 혹은 

- [-d dir] 디렉토리가 맞다면 참
- [-d file] 파일이 존재하면 참
- [-f file] 파일이 존재하고 보통의 파일이면 참
- [-r file] 파일 read가 가능하면 참
- [-s file] 파일 크기가 0보다 크면 참
- [-w file] 파일 존재하고 write 가능하면 참
- [-x file] 파일 존재, 실행가능하면 참 
- [-z string] 문자열의 길이가 0이면 참 
- [-S sock] 파일이 존재하고 소켓이면 참

샘플
```bash 

if [ -f /tmp/notexistfile.sh];
then : 

else 
    echo "not exist"
    exit 1;
fi
```

### 루프문 

while 문

```bash 
while (조건식)
do 
   실행블록
done
```

for 문 
```bash 
for ((초기값; 조건식; 증감));
do
  실행블록 
done 
```
for 다음에 ; 주의

for-in문
```bash 
for 변수이름 in (리스트)
do
  실행블록 
done 

# 리스트에 $(seq 1 5) 로 하면 1부터 5까지 inbound포함해서 리스트가 됨 (sequential 하게)
```

break 문 

루프문 도중 break 를 만나면 루프의 실행 블록 영역을 빠져 나온다.
여러개인 중첩 루프면 `break n` 으로해서 원하는 위치로 나갈수도 있음 

continue 문 
루프문 도중 continue를 만나면 이후 아래를 실행하지 않고 다음 루프를 실행한다. `continue n` 을 사용해서 원하는 루프로 이동가능함


샘플
```bash 
# 아래와 같은 파일 
1 2
3 4 
5 6 
7 8
# 위 파일을 읽어들여서 파이프랑 리다이렉션 사용
#!/bin/bash 

cat $1 | while read line
do
    echo "$line" | cut -d' ' -f2 | egrep -v "2|3";
done
# line을 읽는데 ' ' 기준 두번째 것만 조회 (2,4,6,8) 그 중 2,3은 제외
```

### 기타 문법
IFS (Internal field seperator)
스트링에서 워드를 구별하는 필드 분리자. 스크립트 내에서 사용자가 변경가능함. 

shift문 
스크립트의 인수로 받은 파라미터 목록이 좌측으로 이동한다. 
1 2 3 4 5가 인수일 때, 
shift 1 하면 
인수가 2 3 4 5 그리고 갯수는 4개로 변경됨. (이동된 파라미터는 영구삭제)

exit 문 
스크립트 종료하기 위해서 사용 
특정 종료 코드를 반환하여 확인 가능


here document
문서의 시작과 끝의 범위를 지정해줌
보통 EOF를 사용하긴하는데 다른 구분자를 사용해도 상관없음


## 연산

eval 명령어 
인자들을 결합한 후 평가해서 결과 값을 취함 

역따옴표(backquoting)

쉘 스크립트 중, 쉘 커맨드의 결과물을 변수에 담아야할 경우 `` 를 사용 
`$(...)`의 형식으로도 사용가능하다



### 산술연산
표현식을 평가

- expr를 이용 
   - expr 1 + 1
   - 대표적인 산술계산방법
   - expr 뒤에 연산식을 쓰는데, 연산자 사이에는 반드시 공백
   - `*` 등은 별도의 의미이므로 \ 이스케이핑을 하든가 따옴표로 감싸준다. `"*"` 
- (()) 를 사용
  - z=$(($z+3))
- let을 사용
  - let i=i+100


declare -i 를 이용해서 명시적으로 변수가 정수형이 되도록 할 수 있음.

`declare -i NUM` 한 경우 기본 값은 0.해당변수로 산술연산을 하기 위해서는 앞뒤 공백없이 연산자를 사용하면 된다.


### 논리연산 (조건연산)

- && AND
- || OR
- ! NOT 



## 함수 

동작들이 구현된 코드 블록 

```bash 
function 함수이름 {
  명령어
}
# 혹은 

함수이름() {
  명령어
}
```

쉘의 찾기 방식
- alias명령인가?
- 정의된 함수인가?
- 내장 명령인가?
- 실행 프로그램인가?

- 함수 내부에서 exit을 만나면 스크립트가 종료된다. 
- 함수의 return 값은 얻어낼 수 있다. 
- 재귀 호출도 가능 ! 👀


함수 파라미터 
- 함수의 인자 순서대로 $1 ~ $3 으로 저장됨
- $@은 모든 인자 집합

함수 리턴 
- echo 써도 되고 (스트링 반환), return 쓰면 숫자 반환

source 명령어 
환경 설정 파일을 현재 쉘 환경으로 불러올 때 사용된다.

```bash 
# function.inc 파일 
ACCOUNT="TESTER"
AGE="27"

#test.sh 파일 
#!/bin/bash

. function.inc # 혹은 source function.inc 

source_test() {
  echo "$ACCOUNT's age: $AGE"
}
```

getopts 명령어 

인자를 쉽게 추출하기 위해서 getopts 를 사용 (내장 명령어)
- $OPTARG 변수에는 getopts로 처리된 인자의 값이 저장! 
- $OPTIND는 인자 개수를 파악할 때 사용됨. 스크립트 이름 빼고 $OPTIND가 실제 생각하는 인자 갯수.

```bash 
while getopts 옵션들 옵션을부르는이름
# while getopts "a:b:h" opt
# while getopts xyz: options 
# : 은 또다른 인자값을 받겠다는 의미
# a: <- a 이후에 또다른 인자값을 받겠다
# xyz: xy는 말고, z이후에만 또다른 인자값을 받겠다
do 
  case
    a);; 
    # 중략
    x);;
  esac
done
```

```bash 
   1   │ #!/bin/bash
   2   │
   3   │ while getopts xyz: options
   4   │ do
   5   │        case $options in
   6   │                x) echo "your option : -x";;
   7   │                y) echo "your option : -y";;
   8   │                z) echo "your option : -z"
   9   │                        echo "And argument is $OPTARG";;
  10   │                ?) echo "Usage : $0 [-xy] [-z argument]"
  11   │                        exit 1;;
  12   │        esac
  13   │ done
  14   │
  15   │ count=`expr "$OPTIND" "-" "1"`
  16   │ echo "Total argument count: $count"

```


- -o 옵션: short type의 옵션을 지정한다 
- -u 옵션 : 전달되는 옵션을 따옴표로 둘러싸지 않도록한다
- -l 옵션 : --형식의 long type 옵션을 지정한다.
  - 그러니까 -- 인거랑 - 인거랑 같게 동작하게 만들수도 있다.

```bash 
───────┬─────────────────────────────────────────────────────────────────────────────
       │ File: test14.sh
───────┼─────────────────────────────────────────────────────────────────────────────
   1   │ #!/bin/bash
   2   │
   3   │ option=$(getopt -u -o a:b: -l abort:boring: -- "$@")
   4   │ set -- $option
   5   │
   6   │ while [ $# -gt 0 ]
   7   │ do
   8   │    case $1 in
   9   │         -a|--abort)
  10   │            A=$2
  11   │           shift
  12   │           ;;
  13   │         -b|--boring)
  14   │            B=$2
  15   │           shift
  16   │           ;;
  17   │    esac
  18   │    shift
  19   │ done
  20   │
  21   │ echo "option 1:$A / option 2:$B"
```


## 시그널과 트랩

일반적으로 프로그램이 실행될때 ctrl + c를 입력하면 프로그램 실행이 멈춤. 종료 시그널을 받고 종료처리가 되었기때문인데, 종료 시그널을 받았을 때 특정 액션을 실행해야할 때 필요한게 `trap` 명령어 

즉 특정 시그널이 도착했을 때 어떤 명령어를 하게 하려면 `trap`을 
쓴다.

예시
```bash 
trap "명령어; 명령어;" 시그널 번호 
trap "명령어; 명령어;" 시그널 이름
```

### 대표적인 시그널 종류 

- EXIT (0) : 프로그램 종료 
- SIGHUP (1) : hangup, 즉 터미널 접속 종료 
- SIGINT (2) : terminal interrupt (ctrl + c 발생 시그널) 중단
- SIGQUIT (3) : 사용자가 터미널 종료 문자를 입력하면 발생
- SIGKILL (9) : KILL 프로세스 종료 시그널
- SIGTREM (15) : graceful kill. sigkill 과는 다르게 무시될 수있다.


예시
```bash 
trap "/test.sh" 2


# 설정된 trap을 지우려면 
trap - SIGINT # SIGINT에 할당된 trap 지우기 
trap - 1 2 3 15 # HUP INT QUIT TREM 지우기 
```

## 정규표현식 POSIX

POSIX : unix 공통 인터페이스 

- 텍스트를 좌에서 우로 검사하면서 여러 규칙을 시도하는 처리에 적합

constructor

- boolean
  - or  2개 이상의 패턴은 `|` 로 구분 
  - apple도, orange도 매칭 하고 싶다 `apple | orange`
  
- grouping
  - 패턴을 단순화할 수 있음
  - user과 used 를 매칭 -> use(r|d)

- qualification
   - `?` : 0 아니면 1개 
   - `*` : 0~1개 이상
   - `+` : 반드시 하나 이상

찾아서 대치하기 

패턴 일치 후에 치환이 필요하면 어떻게 하지?
- s/regexp/replacement <- 해당하는 정규표현식을 찾으면 replacement 위치에 해당하는 문자열로 대치 
- 45,100/regexp/p <- sed 등에서 45번째~100번째 줄 사이에 regexp 가 있으면 모두 화면에 출력하라


예제 
```bash 
lap.op # laptop, lapdop, lapcop 등등 
[^L]aptop # Laptop은 일치 X
^[^L]aptop # 맨 앞이 L로 시작하는 Laptop을 제외하고 일치 laptop, daptop,등
[lL]+aptop # laptop, Laptop, llaptop, lLaptop, Llaptop, lllaptop 등 
[lL]?aptop # aptop, laptop, Laptop
laptop|Laptop # laptop과 Laptop
```

## awk 

- 정규표현식으로 원하는 패턴 추출하는 것이 주 목적 
- 파일이나 파이프로부터 입력을 받을 수 있음! 

```bash 
awk pattern [action]
awk -f pattern-file file

```
- `-F` 구분자를 지정한다.
- `-f` awk 명령어를 파일로 지정한다.
- NF 변수: 레코드 수 
- NR : 레코드 번호 
- OFS : 출력에 대한 필드 구분자
- FS : 필드 구분자

pattern 부분에는 다음과같은 형식이 들어간다. 
- BEGIN : awk 본문이 시작되기 전에 실행
- END: awk 본문이 끝난 후 실행
- pattern1, pattern2: pattern1 검색 후 pattern2가 오는 라인까지 범위
- /string/ : 슬래시 안의 문자와 일치하는지 확인

예제 
```bash 
# list.txt
1 6 11
2 7 12
3 8 13
4 9 14
5 10 15
# 명령어 실행
awk 'BEGIN {print "Start"}; print{$2} END{print "End"}' list.txt 
# 결과 
Start
6
7
8
9
10
End

awk '/6/ {print $1"---"$3}'
# 6이라는 숫자가 포함된 라인을 찾고, 거기에서 $1 와 $3 프린트

awk '$3 ~ /^13$/' 
# $3 번째 를 쭉 보면서, 슬래시 안의 패턴을 찾고 맞으면 그 줄 프린트

awk '$3 !~ /^13$/' 
# 공백 기준 3번째 중에서 13이 포함되지 않은 라인만 출력
```

## sed

텍스트 처리를 위한 유틸리티.
줄 단위로 입력을 받아 주어진 룰에 의해 처리를 하고, 해당 결과를 표준 출력 혹은 파일로 출력한다. 


- 범위/p : 주어진 범위만큼 출력을 한다 
- 범위/d : 주어진 범위만큼 삭제한다
- s/pattern1/pattern2 : pattern1을 2로 치환한다
- 범위 /s/pattern1/pattern2: 범위 안의 라인 중 처음으로 일치하는 pattern1 을 pattern2 로 치환한다
- g : 모든 라인의 패턴에 대해 동작하도록한다 

```bash 
sed 스크립트 인풋파일
sed -e 스크립트 인풋파일 
```

예제 
```bash
#list.txt
1
2
3
4
5
# 명령
sed '1,3!p' list.txt 
# 1~3 을 제외하고 출력한다. 옵션이 없으면 추가로 출력함.
1
2
3
4
4
5
5


sed -n '1,3!p' list.txt
4
5

sed '/4/d' list.txt
# 4는 삭제 하고 출력
1
2
3
5

```

## 간단하게 문자열 자르기 

`%` 뒤에서부터  두개쓰면 일치하는거 대부분 (?)
`#` 앞에서부터. 두개쓰면 일치하는거 대부분 (?) 

예제
```bash 
      │ File: test16.sh
───────┼────────────────────────────────────────────────────────────────────────
   1   │ #!/bin/bash
   2   │
   3   │ file="/tmp/tmp/test.sh"
   4   │
   5   │ echo "original: $file"
   6   │ echo ${file%tmp*}
   7   │ echo ${file%%tmp*}
   8   │ echo ${file#*tmp/}
   9   │ echo ${file##*tmp/}
  10   │

  # 출력 
original: /tmp/tmp/test.sh
/tmp/
/
tmp/test.sh
test.sh
```


## ls 

`ls -alh` : 파일 사이즈까지 가독성 좋게 (MB등으로 표기 나옴)

## ssh : 다른 컴퓨터를 리모트로 조작하자

secure shell

### 접속하기
```bash
ssh <로그인사용자명>@<접속할pc주소> 
# 이때 주소는 ip주소또는 hostname이다 
```
### 왜 안전한 shell 인가?

rsh도 있다 (remote shell) 하지만 이 경우 암호를 입력하면 그대로 네트워크로 보내버린다. 이런 경우 네트워크를 감시하고 있으면 (wireshark 등으로! 🦈) 그대로 암호를 알 수 있을뿐 아니라 파일 내용도 볼 수 있다. 

## X Server: 리모트로 데스크탑 화면을 띄우자

리눅스에서 화면 표시와 입력을 담당하는 구조. ssh를 사용하면 다른 PC와는 통신만 하고, 본인 PC에서 x를 띄워 사용할 수 있음 . 데스크탑 환경이 항상 설치되어있는 것은 아니므로 CLI에  익숙해질 것

## sudo: 관리자 권한을 잠시 취득하자

root 는 관리자 권한을 가진 특별한 사용자! 파일 접근 권한을 변경하거나 다른 사람의 파일을 수정하거나 등 뭐든 지 가능한 관리자 👑우분투는 이를 막기위해 일반 상황에서는 root로 로그인이 불가능하게 막고 있다. 

> 권장하진 않지만, sudo -i 혹은 sudo su로 로그인이 가능할 수 있다.

root말고도 일반 관리자 권한을 줄 수 있다. 일반 관리자는 필요할 때만 암호를 입력하고 그때만 위의 특권을 사용할 수 있음 ! 암호를 입력하기 위해서는 sudo를 사용해야한다 ! 

## grep: 다양한 문자열을 검색하자

보통 `ps -ef | grep <문자열>` 등으로 프로세스 검색할 때 많이 쓰고 있는 grep 이다. 파일 내용을 확인해서 찾는 내용이 포함되었는지 알려주는 명령어. 
```bash
grep -r "검색하고싶은 문자열 혹은 정규표현식" <경로>
# -r 은 서브 폴더까지 검색하도록 지정이라는 뜻
```
## vi / vim : CLI에서 문서를 편집하자

- 검색 `/`
- 복사 (yank) & 붙여넣기 (paste)
```bash
# 커서를 원하는 곳으로 옮긴다 
# 노멀모드 상태에서 v를 눌러 비주얼모드로 진입
# 화살표로 커서를 움직여 선택 
# y를 눌러 복사
# 원하는 곳에서 `shift` + `p` 를 눌러 paste
# 횟수를 입력하고 `shift` + `p` 를 누르면 원하는 만큼 복사된다.
# e.g) 10 `shift` + `p` 
```

- 되돌리기
    - `ctrl + z` 는 실행중인 애플리케이션을 일시정지하는 조작! `fg` 로 다시 실행가능하다.
    - `U`  undo, `ctrl + R` 은 redo

## 가상터미널 tmux: 네트워크 끊김에서 복귀하자

ssh 해서 바로 터미널에 붙어서 사용하다가, 네트워크가 끊기면 원격 서버에서는 사용자가 로그아웃한 것으로 간주해 작업을 종료해버린다. 

하지만, tmux를 원격 서버에서 실행하면 새로운 중계포인트가 된다. 그래서 네트워크가 끊겨도 tmux 뒤쪽의 어플리케이션에서는 유저가 로그인한 것 처럼 보이고 재접속 후 `tmux attach` 를 사용하면 가상터미널에 다시 붙을 수 있다. 가상 터미널에서는 실행한 애플리케이션이 계속 돌고 있으니까 =) 큰 배치처리를 실행하고 원래 개인 pc를 종료하고 퇴근해도 되고!

원격서버를 사용하는 경우면 tmux를 사용해야할 이유가 더 커진다. 내 컴퓨터에서 터미널을 열어서 매번 ssh 접속을 해서 같은 서버로 들어가서 다른 명령을 실행하려면 ... 😭 tmux를 사용하여 tmux 새 세션을 연다고 하면, ssh 접속도 한번, 인증도 한번! 

tmux의 프리픽스키는 `ctrl` + `b` 이다. 

- 종료 : prefix  + D (Detach)
- 새 세션 생성 : prefix  + C(Create)
- 이전 세션: prefix + P (Previous)
- 다음 세션 : prefix + N (Next)
- 화면 분할 (가로로 분할) : prefix + "
- 화면 분할 (세로 분할) : prefix + %
- 분할 화면 포커스 설정 : prefix + 화살표키
- 화면에서 스크롤 : prefix : [

## 명령어 히스토리 : 이전에 썼던 명령어를 검색하자

`ctrl + r` 를 반복해서 누르면 이전 명령어를 계속 찾는다! (후방검색)

`ctrl + s` 를 반복해서 누르면 이후 명령어를 찾는다! (전방검색)  but 이 매핑을 전방검색으로 사용하기 위해서는 bashrc나 zshrc에서  `stty stop undef` 를 하고 source해서 적용시켜줘야함 

but 가상터미널은 기본적으로 명령어 history를 공유하지 않으므로 주의하자. 공유하도록하려면 
```bash
   function share_history {
      history -a
      history -c 
      history -r
   }
   
   PROMPT_COMMAND='share_history'
   shopt -u histappend
```


출처: 만화로 배우는 리눅스 시스템 관리 1  by piro 
만화 자체가 원하는 목적 → 거기에 맞는 명령어나 함수로 이루어져있어서 접근하기 쉽다.
추가로 정리할 때마다 업데이트 예정!

