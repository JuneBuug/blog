---
title   : '10일안에 협업하는 최소의 웹 백엔드 만들기' 
slug  : '/make-backend-in-10days'
excerpt : 
date    : 2023-04-09 20:29:00
updated : 2023-04-09 20:29:00
banner: ./thumbnail.png
tags    : 
- BE
---

![썸네일](./thumbnail.png)
## 서론 

어느날, 불현듯, 갑자기, [비사이드](https://bside.best/) 를 통해서 포텐데이를 신청했다. 비사이드는 IT 업계 사람들의 사이드프로젝트를 관리 및 조율, 주최하고 (판을 깔아주고) 기획 커리어업 등의 사업을 하는 스타트업인데, 항상 관심있게 보고 있었다 🦦 다만 사이드프로젝트 주기가 내게는 길어 매번 신청창에서 머뭇거리고 실행하지 못했다. 

포텐데이는 10일만에 진행되는 비사이드의 새로운 프로그램으로, 시간 내에 MVP 와 서비스의 프로토타입만 보여주는걸 목표로했다. 매번 생각만 뻗어나가고 결과물이 나오지 않는 내게는 좋은 프로그램이라고 생각했고, 스스로를 움직이기 위해서 그 환경에 나를 던져버렸다! 

그렇게 시작하게 된 '10일 안에 여유 시간만 사용해서 최소한의 웹 백엔드 만들기'.  퇴근부터 자기전까지 했고, 총 39시간을 투입했다고 되어있으니 매일 0.5 MD 씩 사용한 셈이다.


## 기술 선정 

시간이 가장 중요했다. 뭔가를 학습하면서 진행하기에는 10일은 턱없이 부족한 시간이었다. 더욱이 아이템을 정하고 팀을 수립하는 데에만 2일이 걸렸기때문에, 익숙한 기술을 선택하되 가능한 최신의 기술을 하고자 했다. 회사 업무와 혼돈되지 않기 위해 개인 노트북에 깔아서 툴도 많이 변경됐다. 최대한 커뮤니티 에디션을 썼지. =) 

그렇게 선정된 기술 + 툴은.. 
- Java 17
- Spring Boot 3.0.5
- Gradle 
- JPA + QueryDsl 
- Spring Security  / 인증엔 JWT
- Swagger (openapi)
- Jetbrains IntelliJ CE
- DBeaver
- 비사이드에서 제공해준 ncloud 크레딧 서버, centOS 7.8

## 프로젝트 세팅하기 
이때가 가장 마음이 설레지 않을까. Jetbrains IntelliJ CE 를 급하게 다운로드하고, spring initializer 를 통해서 뼈대가 되는 프로젝트를 셋업했다. 

![](./spring-init.png)

groovy 를 사용하는 gradle로, 언어는 Java 17, Spring Boot 는 스냅샷이 아닌 3.0.5 로 선택했다. api 만 하고 jsp 패키징을 할 예정은 아니어서 패키징은 jar로, dependency 는 lombok, spring data jpa, spring web, spring security,  h2 database (테스트용) 등을 추가해서 세팅했다. 

간단한 hello controller 로 로컬에서 동작하는 것을 확인하고 바로 레포설정. 해당 프로젝트는 github private repository 를 연결해두고, 가장 먼저 서버 설정을 시작했다.

## ncloud 서버 세팅하기 

20만원의 크레딧으로 시작했지만, 생각보다 DB 를 따로 두기에는 비쌌다. 제일 싼 요금제로 해도 하루에 5000원 정도 들었으니.. 이왕 이렇게 된거, 많은 유저를 받는게 아니라 프로토타입을 만들거라고 생각하면 하나의 서버에 모든 컴포넌트를 넣는 것으로 시작해야겠다는 생각이 들었다. 

![](./ncloud-1.png)

micro는 아쉽고 compact 로 해서, 주어진 옵션 중 가장 친숙한 centOS,  2GB Mem, 50GB Disk 의 작은 서버가 만들어졌다. 


### 접속하기와 기본 세팅

처음 만들어진 서버는 공인 IP 가 없고, 접속용 IP 만 주어진다.  포트포워딩 설정을 통해서 (1024~66536 내에서) 접속할 포트를 정해주게 되어있는데, 이를 정하고 나서 해당 포트로 들어갈 수 있다.

아래는 66536 포트로 설정한 경우 쉘에서 접속하는 방법. ssh 로 붙는다.

```bash 
ssh -l root@<접속용IP> -p 66536 
```

이후에 공인 IP를 설정하면 acg를 설정해서 ssh 를 붙을 수도 있다. 공인 IP 도 함께 신청해줬다.

위 명령어 통해서 서버에 접속한 후 바로 java 17을 설치해준다. 
아래 명령어로 설치하려고하면 나에게 에러를 뿜는다. 

```bash 
sudo yum install java-17-openjdk
# no package
```

알고보니 java17은 해당 명령어로 설치가 불가능하다고 한다.  레드햇 패키지 매니저 (rpm) 을 통해 따로 설치한다. 

```bash 
wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.rpm
rpm -ivh jdk-17_linux-x64_bin.rpm
```

잘 설치된 이후 버전을 확인하면 다음 내용을 확인할 수 있다.
```bash 
java -version
#java version "17.0.6" 2023-01-17 LTS
#Java(TM) SE Runtime Environment (build 17.0.6+9-LTS-190)
#Java HotSpot(TM) 64-Bit Server VM (build 17.0.6+9-LTS-190, mixed mode, sharing)
```


ncloud에서 발급받은 서버에는 git이 미리 설치되어있었다. 
github의 기본 인증 정책이 ssh 로 변경되었기때문에, 레포 접근을 위해서 서버에서 ssh-key  gen 해줬다. 
https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=linux

이후에 git repo 를 복사해준다. 
```bash 
git clone git@github.com:<repo>.git
# ssh 복사로 나오는 주소를 넣으면 됨 
# git clone <ssh용 url> 
```

gradle 로 빌드 시스템이 세팅되어있으므로 해당 스프링 부트 프로젝트를 냅다 jar 로 패키징하고 돌려본다. 

내가 건든 것이 아무것도 없을 때, 잘 배포가 되는지 테스트해보는 경험... 너무 굿이다.

```
./gradlew bootJar # 냅다 jar 패키징하기 
# libs 경로에 내가 설정한 이름의 jar가 나온다.

cp <jar이름> ~/deployment.jar

java -jar -Dserver.port=8080 deployment.jar
```

이렇게 하면 로컬에서 돌려본 것처럼 애플리케이션이 동작할 것이다. 물론! 외부에서 확인해보려면 해당 서버의 8080 포트를 열어야한다.  ncloud 의 acg 로 조정할 수 있으니 해당 acg 를 직접 수정해준다. 
0.0.0.0/0 에 8080 포트. 당연히 보안적으로 위험하니 잠깐 열어서 테스트하는 동안만 사용한다. 



![](./acg.png)
### DB 세팅하기

같은 머신에 mysql 8.0을 설치한다. 또 다시 rpm 형태로 설치.

```bash 
yum install https://dev.mysql.com/get/mysql80-community-release-el7-6.noarch.rpm
```

![](./mysql.png)

```bash 
yum install mysql-server
# gpg 오류 

```

gpg key 오류가 발생한다. mysql 의 배포판은 GNU Privacy Guard (GPG) 를 통해 패키지 무결성과 신뢰성을 확인하는데, 이 key 가 만료되어 설치가 되지 않는 것이다.
원래는 이 key를 변경해서 세팅해주는 것이 정석인데, gpg check 를 안하도록 수정할 수 있어서 이쪽으로 수정했다. 


```
vi /etc/yum.repos.d/mysql-community.repo
# mysql 8.0 community 서버 항목의 gpgcheck 를 0으로 수정함 
# 다시 
yum install mysql-server

mysqld -V
# 버전 확인 

systemctl start mysqld 
systemctl enable mysqld # 시스템 실행시 자동으로 mysql 

grep 'temporary password' /var/log/mysqld.log
# temp 비밀번호 
```

mysql 을 systemctl 로 띄우고 임시 비밀번호까지 얻고 나면 mysql 에 접속할 준비가 됐다.

그전에 mysql  원하는 포트가 있다면 특정 포트로 변경해주고 다시 mysqld를 띄워준다.

```bash
vi /etc/my.cnf

# 아래 추가
[mysqld]
port=포트번호
```

mysql 에 접속한다.

```bash
mysql -u root -p 
# 위에서 쓴 temp 비밀번호로 들어감
ALTER user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '새로운비밀번호';

ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
```

비밀번호를 너무 쉽게 설정했더니 위와 같은 오류가 뜬다. 그래도 쉬운 비밀번호로 하고 싶다면.. 다음을 입력해서 비밀번호 전략이 어느 수준으로 설정되어있는지 확인할 수 있다.


```
mysql>  show variables like 'validate_password%';
+--------------------------------------+--------+
| Variable_name                        | Value  |
+--------------------------------------+--------+
| validate_password.check_user_name    | ON     |
| validate_password.dictionary_file    |        |
| validate_password.length             | 8      |
| validate_password.mixed_case_count   | 1      |
| validate_password.number_count       | 1      |
| validate_password.policy             | MEDIUM |
| validate_password.special_char_count | 1      |
+--------------------------------------+--------+
```

일단 LOW 로 내려보기로한다.

```bash 
SET GLOBAL validate_password_policy=LOW;

CREATE DATABASE; # database 생성
 # 내리고 
CREATE USER '<원하는유저>'@'%' identified by '<원하는비밀번호>';
grant all privileges on <생성한database>.* to '<생성한유저>'@'%';

flush privilieges;
```


비밀번호를 변경하는 김에, 외부 database 툴을연결하기 위해서 root 가 아닌 전용 유저를 하나 만들기로 한다. 
원하는 유저와 비밀번호를 입력하고, 생성한 데이터베이스에 대한 권한을 모두 준다. 

외부(내 로컬)에서, 서버에 설치한 mysql 로 연결하기 위해서 [dbeaver](https://dbeaver.io/) 를 설치했다. 무료 데이터베이스 툴이자 sql client 다. jetbrains 를 구독했다면 datagrip을 썼겠지만 사이드 프로젝트에서는 dbeaver를! 귀엽고, 사용이 익숙지 않지만 필요한 기능들을 많이 지원한다. 

아까 띄워놓은 포트에 대해서 내 ip 에 접근만 acg 를 수정하는 것도 잊지 않기..!


### nginx 세팅하기 

웹 어플리케이션 서버(spring boot 내장 톰캣) 앞에 웹 서버를 둬서 리버스 프록시 역할을 하도록 하기 위해서 nginx를 세팅한다. 

```bash
vi /etc/yum.repos.d/nginx.repo

# 아래를 적어넣음 
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1

yum install -y nginx
# nginx.conf 변경 (/etc/nginx 하위)
# acg 오픈
systemctl start nginx
```

nginx.conf 에는 backend라는 이름의 upstream을 생성하고, 80 포트로 요청이 들어왔을 때 톰캣이 뜨는 포트로 프록시하도록 설정한다. 이제는 8080 포트가 아니라 80포트로 요청을 전달할 수 있으니 acg 에서 8080 열어준건 지워주고 80 포트를 추가해준다. 


## 개발하기 

### 회원 도메인 

가장 먼저 개발을 시작한 것은 역시 회원 도메인. 기본적인 정보들을 입력해 `Member` 라는 엔티티를 생성했다. JPA 를 사용했기때문에 `@Entity` `@Table` 을 붙여준 것만으로도 손쉽게 테이블을 구성할 수 있다. (별도의 ddl 관리는 하지 않았음)

직접 패스워드를 다뤄본적은 없어서 (그 동안은 OAuth와 유사한 형태로만 개발해봤었음) 이번에 직접 password를 저장할 때 암호화해서 어떻게 저장하지? 라고 생각했는데 `BCryptPasswordEncoder` 라는 것을 사용하더라. `BCrypt` 라는 암호화 알고리즘을 사용해서 패스워드를 암호화하고, 실제 평문 패스워드를 비교할 때도 해당 클래스를 사용해서 `matches` 로 파악하는 로직을 쓴다. 

```java
private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
// 중략
if (!passwordEncoder.matches(loginRequest.getPassword(), member.getPassword())) {  
    throw new BadCredentialsException("no such user");  
}
```


이렇게 회원가입이 완료되고 동일한 정보로 로그인 했을 때 , JWT 토큰 하나를 내려주도록 간단하게 구성했다. 만료는 1시간으로 해서 가져간다. JWT 를 사이닝하는 salt 는 온라인에 있는 256byte 랜덤 제너레이터로 결정했다. 해당 값은 프로퍼티에 넣어서 가져오도록한다. JWT 안에는 멤버의 키를 갖고 있어서, 로그인 요청 시 Auth `Bearer` 로 jwt 이 오면 멤버의 키로 멤버를 가져오고 spring security 의 security context holder 에 `MemberDetails` 형태로 가져다 쓸 수 있다.

반복되는 코드마저 귀찮아 아래와 같이 세팅해서 holder에서 바로 호출할 수 있도록했다.

```java

@Component  
public class MemberContextHolder {  
  
    public static Member getMember() {  
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();  
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();  
        if (memberDetails.getMember() == null) {  
            throw new ClientException("not authenticated");  
        }  
        return memberDetails.getMember();  
    }  
}
```

### cors 세팅하기  / swagger 세팅하기 

FE 님과 협업할 때 가장 걱정되었던 것이 cors 였다. FE 애플리케이션은 vercel 에서 띄워 호출하게 되어있어서 필히! cors 가 걸릴 터였다. `CorsConfigurationSource` Bean 을 설정해서 `addAllowedOriginPattern ` 와 같은 설정 값들을 일단 `* (모두)` 로 설정해뒀다. (FE님의 로컬과 배포된 애플리케이션의 IP /도메인을 매번 알수가 없었기 때문에 🥹) 이래서 현업에서는 로컬은 개발 (내부망) 만 보게하나보다... 

다음으로 cors 를 통과하는지 간단하게 확인해봤다.
```bash
curl \                                                                      
--verbose \
--request OPTIONS \
'http://{서버ip}/' \
--header 'Origin: {요청 보내고자하는 도메인/ip}' \ 
--header 'Access-Control-Request-Headers: Origin, Accept, Content-Type' \
--header 'Access-Control-Request-Method: GET'
```



API 문서를 쓰는 시간을 줄이기 위해서 swagger를 세팅했다. 내가 spring boot 3을 사용했기때문에, springdoc-openapi-ui 는 동작하지 않았고 v2 를 추가해주어야했다.

```groovy
implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2'
```

Application에는 다음과 같은 어노테이션을 사용해서 default url 을 변경해줬다. 

```java
@OpenAPIDefinition(  
      servers = {  
            @Server(url = "/", description = "Default Server url")  
      })
```
이를 변경하지 않으면 default 서버가 잘못 뜨는 현상이 발생할 수도 있다.

이후 controller에서 다음과 같이 operation 설명을 꼼꼼히 기재했다. 
```java
@PostMapping("/v1/test/~")  
@Operation(summary = "설문 문항 생성.  로그인 필수, camp 소속 필수")
```

### querydsl 세팅하기 

생각보다 도메인이 복잡해지고, 원하는 것만 조인해서 가져오려다보니 fetch join 등 하고싶은 것이 늘어났다.  기본적으로 jpa repository 가 제공하는 쿼리로는 어려운 쿼리도 생기고. querydsl 를 build.gradle에 세팅했다. 

```groovy
// 중략 - dependencies
implementation 'com.querydsl:querydsl-jpa:5.0.0:jakarta'  
annotationProcessor "com.querydsl:querydsl-apt:${dependencyManagement.importedProperties['querydsl.version']}:jakarta"  
annotationProcessor "jakarta.annotation:jakarta.annotation-api"  
annotationProcessor "jakarta.persistence:jakarta.persistence-api"
}

// QueryDSL  
sourceSets {  
   main {  
      java {  
         srcDirs = ["$projectDir/src/main/java", "$projectDir/build/generated"]  
      }  
   }  
}

```

막상 config는 간단했다. 

```java
   
@Configuration  
public class QueryDslConfig {  
  
    @PersistenceContext  
    private EntityManager entityManager;  
  
    @Bean  
    public JPAQueryFactory jpaQueryFactory() {  
        return new JPAQueryFactory(entityManager);  
    }  
}
```

`~RepositoryCustom (Interface)` , `~RepositoryImpl(Class)` 의 구조에 맞춰서 필요한 queryDsl 쿼리를 작성해줬다.

### exception 신경쓰기

마구 exception을 던지다보니 일관된 형태의 exception이 필요했다. 크게는 필요없고, client 의 잘못된 요청때문에 발생하는 `ClientException` 그리고 그외를 받아줄 일반적인 Exception 이 필요했다. RuntimeException 을 상속받아 두가지 종류를 만들고, `@ControllerAdvice` 가 붙은 전반적인 exception handler 클래스 를 만들어  exception을 처리했다. 이때 특정 형태를 갖춘 ErrorResponse 라는 dto를 생성해 응답 코드, 메시지 등을 담을 수 있게 했다.


### 작은 batch 만들기

캐주얼한 회고 설문 서비스이다보니, 설문이 종료되었을 때 같은 그룹에 속한 사람이 모두 볼 수 있는 상태로 변경이 되어야했다. 설문 종료일은 기간이고, 기간에 따라 상태 변경하는 것으로 가장 손쉽게 생각할 수 있는 것이 배치다. 그러나 프로토타입 단계에서 spring batch로 확장해야할 일은 아니라고 생각했고, 배치성 작업 controller endpoint를 하나 만들었다. 그 뒤 우리의 작은 서버에서 crontab으로 주기적으로 이 endpoint에 대한 요청을 발송했다. 배치 컴포넌트를 분리하거나 spring batch 도입 없이도 주기 + 배치성 작업을 가장 작게 도입했다. 😅

### 배포 script 만들기 

CI 서버가 별도로 없는 지금, 배포라는 것은 -> tomcat을 죽이고, 소스를 업데이트하고,  애플리케이션을 jar 패키징 빌드하고, 해당 jar의 이름을 바꾸고, java 로 jar 구동 시키는 과정을 의미한다. 
이 과정을 매번 하는 것도 지쳐.. 간단한 스크립트를 만들었다. 배포 툴을 대체하는 부분!

```bash 
#!/bin/bash
PID=$(jps | grep "deployment" | awk '{print $1}')

# Check if the PID is valid
if [ -n "$PID" ]; then
  # Kill the process
  kill $PID
  echo "Process with PID $PID has been killed."
else
  echo "No process found with the specified name."
fi
cd <프로젝트>
git pull
./gradlew clean build bootJar -x test
cp ~/<프로젝트>/build/libs/<프로젝트>-0.0.1-SNAPSHOT.jar ~/deployment.jar
nohup java -jar ~/deployment.jar -Dserver.port=8080 &
```


### domain 세팅하기 
FE 님에게는 이미 api 서버의 ip 로 접근이 가능하도록 해두었지만.. 그래도 도메인이 있으면 좋겠다 싶었다. 갖고 있는 도메인의 subdomain으로 하면 되지 않을까? 추가 비용도 없고? 하는 생각에 도메인 관리 사이트에 들어가 다음을 등록했다. 

타입은 A, 그리고 name 은 앞의 서브 도메인만 입력하면 되는거라 api로, 그리고 해당하는 서버의 공인 IP를 
입력해줬다.

![](./domain.png)


### ssl 세팅하기 

하지만 아직도 계속해서 나오는 http가 나는 거슬려.. 😇 인증서를 직접 설치해보는 건 처음인데, 무료이고 설치가 간단하다는 let's encrypt를 설치했다. standalone으로. certbot를 설치하면 간단한 명령어 몇번으로 인증서를 설치할 수 있다. 


```bash 
sudo yum install epel-release
sudo yum install certbot python2-certbot-nginx 


sudo certbot --standalone -d <도메인> certonly

```

물론 nginx 443 포트에 들어오는 설정을 변경해주는것도 잊지 않아야..! 


```nginx.conf
    listen       443 ssl;
        listen       [::]:443;
        server_name  <도메인명>;

        ssl_certificate "/etc/letsencrypt/live/<도메인명>/fullchain.pem";
        ssl_certificate_key "/etc/letsencrypt/live/<도메인명>/privkey.pem";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
```

ncloud의 acg 설정에서 443 포트도 열어준다. 하는김에 nginx 설정에서, 80 포트로 들어오는 요청을 443으로 포워딩하는 것도 추천한다. 

let's encrypt 로 하면 한달에 한번 정도 인증서 갱신이 필요하다고 해서 아래 cron 을 등록했다.
```bash 
crontab -e 
# 아래 내용 등록
0 0 1 * * root systemctl stop nginx && certbot renew -q && systemctl start nginx
```

이렇게까지 등록하면, https 로 접근하는 swagger 화면을 확인할 수 있다.

![](./ssl.png)


## 정말 마지막 - admin 만들기

vue 3와 element-ui 를 가지고 간단한 형태의 admin 도 만들었다. 
회고 질문 목록이 계속 추가될 여지가 있었거든. FE 를 붙이는 동안 시간이 남아서 만들었다. 최소한의 인증도 없었으므로 금방 내렸지만 ! 

![](./admin.png)

## 소회 & 회고 

10일 안에 서비스의 구색이라도 갖춘다는 것이 이렇게 힘들 줄 몰랐다. 더욱이 프로토타입이라고 생각하니까 백엔드가 해야할 일이 그렇게 많은가..? 하는 또 한번의 의문에 빠졌다. 하지만 위에 내용이 너무 사실 적다고 느껴질 정도로 정말 많았다.. 🥹 기본적으로 개발을 수월하게 하기 위한 세팅에 한번, devops 세팅에 한번, 설계에 한번, 설계를 엎을 때 한번.... 어떤 때는 손쉽게 넘어갔지만 ("이건 해본거지") 어떤 때는 머리를 싸맸다 ("아 왜 java 17 써가지고").

시간 내에 구현할 수 없는 데이터의 흐름을 솎아내는 것은 기본적으로 BE 의 몫이다. 정말 많은 기능을 들어냈고 서비스의 매력을 살리면서도 부차적인 기능들을 정리하는 시간을 꽤 오래 가졌다. 팀원분들과의 소통에 독성말투를 쓰지 않으려고 노력했고 시간이 없는 만큼 동기로 일할 수 있을 때는 반드시 결정을 내리고 가도록 견인했다. ( " 오늘 결정하고 가시죠!! 🔥") 


![](./clap.png)


그 결과, 결코 프로토타입이 완성되지 않았음에도 우리 [모닥모닥](https://bside.best/projects/detail/P230323100417) 팀이 20개 팀 중 포텐데이 2등을 차지했다 ✌️🥈
![modak](./modak.png)

정말 오랜만에 결정이 빠른 서비스 제작 과정을, 묘하게 익숙하고 따뜻한 좋은 팀원들과 만들 수 있어서 즐거운 경험이 되었다. 나 사실.. 소통하는거 좋아할지도? 🤔 

한편, 10일의 프로토타입 만드는게 뭐가 개발적으로 도움이 되냐, 거기에 익숙한 스택으로 만들었으면서... 라고 생각하는 내 자신을 발견하기도 했다. 
그 말도 맞다.  하지만 다시 생각해보자. 요걸하면서 내가 기존에 가지고 있던 지식이 더 촘촘해지고, 평소에 안하던 도메인까지 다 다뤄볼 수 있으며,  내가 허접하게 만들어놓은 시스템을 보며 서비스 환경은 왜 그렇게 구성했었는지 다시금 생각할 수 있는 기회가 된다. (e.g. 왜 빌드를 따로하는 시스템이 있지?) 평소 다른 직군과 긴밀하게 붙어서 일하지 않았다면 그 또한 경험이 되고. 

채찍질하는 환경으로 밀어넣은 내 자신을 칭찬하며, 다음에도 한번 참여해보고싶다. =) 