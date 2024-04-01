---
title   : 'Tomcat connector 에러, 당신의 페이지는 잘 보여주나요?' 
slug  : '/tomcat-connector-error'
excerpt : 
date    : 2024-03-31 17:30:12 +0900
updated : 2024-04-01 16:30:01
tags    : 
- Tomcat
- Error
- Spring
banner : './thumbnail.png'
---

## 서론

![thumbnail](./thumbnail.png)
nginx 와 spring boot, 그리고 spring boot 가 기본적으로 제공하는 **embedded tomcat** 의 조합은 이제는 너무 흔하게 쓰는 조합이다.

tomcat 은 서블릿 컨테이너를 제공하고, spring boot는 스프링 컨테이너를 조작해서, 실제로는 서블릿 컨테이너와 소통을 하면서 애플리케이션을 제공한다. 흔히 스프링 부트에서의 전체 요청을 생각할 때 나오는 `DispatcherServlet` 역시 tomcat 이 제공하는 **서블릿 컨테이너** 위에서 구동되고 있다. 

spring boot 로 오면서 기본적으로 tomcat을 제공하게 되었고 관련 세팅이 사라지면서 정말 비약적으로  개발자의 생산성이 올라갔다. 와! 이제 tomcat 에 관해서 알아보는건 끝이야.. ! (내가 고통 받았었던 외부 톰캣 설치 vs 내장 톰캣의 비교는 [이쪽](https://juneyr.dev/spring-tomcat-installation) 으로.) 자연스레 tomcat 에 대한 관심은 줄어들고 격리되며, tomcat 의 이야기는 좀더 볼 필요가 없다고 생각되었었던 차 . . 🤤

최근 별안간 tomcat error 페이지가 노출되는 현상을 겪었다. 🫠

![tomcat-error](./tomcat-error.png)

<sub style="display:block; text-align:center"> 샘플로 그려보는 그 순간의 참혹한 현장 </sub>

`ErrorController` 나 `ExceptionHandler` 로 괜찮은 에러페이지를 표시해주고 있었던 터라 의문을 가질 수 밖에 없었다. 힌트를 얻기 위해 여기저기 뒤졌고, **원인으로 보이는 것**을 찾아내서 여기에 기록한다. 

## Spring boot에서 일반적인 에러 페이지 표시 

만약 애플리케이션이 페이지를 표시할 일이 없는 단순 API 서버에 가깝다면, 에러 '**페이지**' 표시에는 신경쓸 일이 없다. 그런 경우 에러 응답을 적절하게 제어하고 보여주는 것에 집중하면 된다. 

문제는 운영하고 있는 애플리케이션이 정적/동적 페이지를 보여주는 기능이 있을 때 생긴다.  

문제 재현을 위해 spring boot 샘플 애플리케이션을 만들고 
`spring-boot-starter-web` 의존성을 추가했다. 

![dependency](./dependency.png)

여기에서 그 무엇도 추가하지 않고 spring boot 애플리케이션을 실행하면, whitelabel error page 를 마주할 수 있다. 

![white-label-error-page](./whitelabel.png)

내용을 읽어보면 애플리케이션이 명시적으로 `error` 에 대한 매핑도 없고, 핸들링도 없었기때문에 이 값을 fallback 으로 노출한다고 한다. 당연하다. 실제로 애플리케이션을 구성하고 나서 별도의 값을 설정해주지 않았기때문에, 명시적인 에러에 대해서 스프링이 자체적으로 만들어준 whitelabel 페이지를 노출하는 것이다. 

프로젝트에 별도 설정을 하지 않으면, `ErrorMvcAutoConfiguration` 이 활성화된다. 그 하위에 `WhitelabelErrorViewConfiguration` 이 노출되는 것을 볼 수 있다. 이 값은 `@ConditionalOnProperty` 로 설정되어, `server.error.whitelabel.enabled` 가 활성화되어있을 때 실행된다. (기본은 true)

![default-error](./default-error.png)

기본 값이 `true` 이므로 이 whitelabel 페이지는 처음 세팅에서 항상 노출된다. 모든 에러 상황에 대해서 페이지를 표시하는 화면은 이 whitelabel 가 디폴트가 된다. 500 대 에러도 아래와 같이 status 만 달라지는 것을 볼 수 있다. 


![white-label-500](./whitelabel500.png)


만약 이 페이지를 표시하지 않으면 어떻게 될까? `application.yml` 혹은 `application.properties` 에 다음과 같이 설정하면 껍질이 없어진 (?) 에러 페이지를 볼 수 있다. 

```yml
server.error.whitelabel.enabled=false
```

![tomcat-error-500](./tomcat-error-500.png)

기본 tomcat 에러 페이지가 나를 맞이하면서, 껍질이 없어진 상태에는 tomcat이 그 자리를 메우는 점을 확인할 수 있다. 

그러면 이 부분을 예쁘게 만들어보자. 인터넷에 [error page sample](https://codepen.io/selcukcura/pen/XeQpEv)을 검색하여 다음처럼 근사한 에러페이지를 만들었다. 

![404-error](./404-error.png)

해당 값을 적용하려면 만든 html 을 적절한 이름으로 적절한 경로에 넣어주어야한다. 별도 설정없이 적용하려면 `src/main/resources` 하위에 `/public` 혹은 `/static` 폴더를 만들고, 그 아래에 `/error` 폴더를 만든다. 그리고 `<error code>.html` 로 만들면 기본 fallback 이 된다. 나는 static 으로 만들었고 방금 말한 내용을 tree 로 표현하면 다음과 같다.  만드는 김에 index.html 도 만들어서 `/` 로 접속하면  들어가면 index.html 이 표현되도록 해주었다.
![tree](./static-tree.png)

이렇게 설정하고 애플리케이션을 리로드하면, 같은 500에러 상황에도 `500.html` 이 최우선으로 노출된다. 

![500-error-custom](./500-error.png)

당연스럽게도, 결론적으로 내가 따로 커스텀한 페이지 > whitelabel 페이지 > tomcat 기본 에러 페이지 순으로 우선순위를 갖는다는 것을 알 수 있다. 실제로 애플리케이션을 구성하면 java config 로 훨씬 쿨하게 설정하는게 일반적이다. html 을 생으로 쓰지 않고 freemarker/ handlebars / jsp 를 에러페이지로 설정하는 경우가 더 많을 것 같지만, 이 부분은 다루지 않는다. 

## 에러 현상 재현 

그런데, 여기에서 특이하게 url 에 접근해보면 어떨까? `/home` 의 param 에 `^`라는 일반적으로 url 에 허용되지 않는 문자를 넣어서 접근해보면 . . 
![tomcat-error-again](./tomcat-again.png)

다음과 같이 **tomcat의 에러페이지**가 다시 표시된다. 아름다운 에러페이지는 도대체 어디 간걸까? 🫥 다행히, 에러 로깅에 손을 안댄터라 status 400의 원인을 파악할 수 있다. 
![coyote-exception](./coyote-exception.png)

```yml
o.apache.coyote.http11.Http11Processor   : Error parsing HTTP request header
 Note: further occurrences of HTTP request parsing errors will be logged at DEBUG level.

java.lang.IllegalArgumentException: Invalid character found in the request target [/home?param=^ ].
```

내용을 살펴보면 `apache.coyote`의 httpProcessor하고 있는 곳에서 HTTP 요청을 파싱하다가 에러가 발생했다고 나온다. 그리고 throw 된 exception 에 대한 설명이 추가된다. `Invalid Character` 즉 유효하지 않은 문자가 요청내에 있었노라고. 음! 그럴만했군!

그런데 여기서 의문이 생긴다. `IllegalArgumentException` 이 던져졌고, 이는 400 http status 로 제대로 잡혀서 사용자에게 노출된 것은 맞는데 왜 tomcat 의 기본 에러페이지가 나왔냐 이말이다! 같은 시점,  미정의된 경로로 접근하면 여전히 아름다운 에러페이지(404)를 표시해주고 있는 것을 보면, spring boot 에서의 에러페이지 설정이 잘못된 것은 아니다. 

이 현상을 이해하기 위해서는 tomcat과 spring boot의 연결 동작을 살짝, 더 자세히 이해할 필요가 있다. 

## 아 그러니까 coyote 🐺,, 너는 tomcat의 connector라고? 

에러가 발생한 `apache.coyote.http11.Http11Processor`에서 유추가 가능하지만, `coyote`는 tomcat의 커넥터이자 http 요청을 받는 최앞단의 컴포넌트다. 

![tomcat-internal](./tomcat-explanation.png)

tomcat 의 구성을 간단하게 쪼개면 `coyote` , `catalina` , `jasper` 로 분리할 수 있다. 
여기에서 coyote라는 커넥터를 통해서 http 요청이 서블릿 컨테이너인 catalina 로 전달되고, 이 서블릿 컨테이너와 스프링 부트의 스프링 컨테이너가 소통해서 추가적으로 요청을 가공한다. 이 과정에서 JSP 가 결과값으로 생성되면 jasper가 이를 검증하고 컴파일해서 리턴한다. JSP 가 결과값이 아니면 개입하지 않겠지만. 

위 설명에서 도출할 수 있는 결론은
- 일반적으로 spring boot 의 요청/응답 사이클에서 http req/res를 처리하는 앞단이 하나 더 있다.
- 위에서 설정했던 custom 페이지나 whitelabel 페이지은 스프링 단에서 설정하는 것이고, 이는 catalina 와의 소통이므로 coyote 에서 오류가 발생하면 이를 처리할 수 없다. 

라는 점이다.

### 어떻게 해결해요 

이런 현상을 해결! 하려면 여러가지 방법이 있을 것이다. 일단 지금은 `invalid character` 사용때문에 오류가 발생한 것이여서, 이를 기반으로 검색해보면 다음과 같은 [답변을 제시](https://stackoverflow.com/questions/41053653/tomcat-8-is-not-able-to-handle-get-request-with-in-query-parameters/41150474#41150474)한다.

'relaxedQueryChars 같은 속성을 web.xml (tomcat 설정)에 추가하세요.'
```xml
<Connector port="80" 
           protocol="HTTP/1.1"
           maxThreads="150"
           connectionTimeout="20000"
           redirectPort="443"
           compression="on"
           compressionMinSize="2048"
           noCompressionUserAgents="gozilla, traviata"
           compressableMimeType="text/html,text/xml"
                                     relaxedQueryChars="[^]"
             />
```

위와 같은 xml 설정이 어렵다면 아래와 같은 java 설정도 있다는 것 같다. 

```java
```java
@Component
public class TomcatCustomizer implements 
WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

@Override
public void customize(TomcatServletWebServerFactory factory) {
    factory.addConnectorCustomizers((connector) -> {
        connector.setAttribute("relaxedQueryChars", "^");
    });
 }
}
```

위와 같이 근본적으로 tomcat 설정을 건드리는 것도 해결법이라고 할 수 있겠다. 

그런데 만약, tomcat 설정을 건드릴 수 없는 상황이라면 어떨까? 
이 invalid character 는 여전히 막고 싶고, 해당 에러만 적절하게 핸들링하고 싶은 경우도 있을 것이다.

이때 필요한 방법은  적절한 에러페이지를 표시하는 것이다. 그런데 우리는 이미 spring boot의 에러 컨트롤로는 적절한 에러페이지 표시가 어렵다는 것을 확인했다. 설정을 해둬도 tomcat의 기본 페이지가 표시되지 않는가?

## nginx 를 '잘' 사용해서 에러 페이지 표시로 해결하기

여기에서는 http 요청을 tomcat보다도 먼저 받아주는 nginx를 대안으로 삼아보고자 한다.  nginx 는 reverse proxy 로서 tomcat 앞에 놓여있는 것을 가정한다. 

로컬에 nginx가 없다면, 다음 명령어를 사용해서 간단하게 nginx를 올려준다. (OS X 기준) 
```bash 
brew install nginx
brew services start nginx 
```

디폴트로 `/opt/homebrew/etc/nginx` 경로에 `nginx.conf` 설정이, `/opt/homebrew/Cellar/nginx` 에 nginx 의 실제 경로가 나온다. 

nginx.conf 에는 다음과 같이 설정해서 3000 번 포트에서 nginx가 응답을 받게한다. 하위에는 proxy_pass 로 `localhost:8080` 로 요청이 연결되도록 한다. 

```nginx.conf
server {
	listen       3000;
	server_name  localhost;
	
	location / {
	  
	  proxy_pass http://localhost:8080/;
	}

	error_page   500 502 503 504  /50x.html;
	location = /50x.html {
		root   html;
	}
	
	error_page 400 /50x.html;

}
// 중략
```

error_page 가 설정되어있는 것에 주목하자. 500, 502, 503, 504 가 발생했을 때 `50x.html` 로 되고, 그 값은 `html` 폴더를 루트로해서 찾게된다. 

임시로 400에 대해서도 `/50x.html` 를 보여주도록 설정한다. 

그리고 `brew services restart nginx` 로 새로 올려주면, 3000 포트로 접근했을 때 다음과 같이 로컬의 spring boot 애플리케이션이 표시되는 것을 확인할 수 있다. 

![nginx-index](./nginx-index.png)

그런데 동일하게 오류 페이지를 접근하면.. 

![nginx-error](./nginx-error.png)

여전히 tomcat의 기본 페이지가 나오는 것을 확인할 수 있다. 

### 뭐에요 되는 것처럼 말하더니 

좀더 찾아보니, [다음과 같은 참고자료](https://ifmkl.tistory.com/338) 에서 그 원인을 파악할 수 있었다. 

> nginx 에서 prox_pass 로 리버스 프록시 설정을 하면, 에러페이지는 nginx 가 아니라 프록시 서버의 설정을 따르게 된다. 

> ... 이를 방지하기 위해서는 '**proxy_intercept_errors on;**' 설정을 함께 사용하면 된다.

바로 이 값을 적용해준다. 

```nginx.conf
  server {
        listen       3000;
        server_name  localhost;

        location / {
          proxy_intercept_errors on;
          proxy_pass http://localhost:8080/;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        error_page 400 /50x.html;
```

그리고 restart를 해주면 다음과 같은 페이지를 비로소 확인이 가능하다. 


![nginx-500](./nginx-500.png)


## 결론 + 요약 

실제로 이런 coyote connector 에러는 invalid character 말고도 꽤 있다. 다만 nginx 등 웹서버를 앞에 걸어둔 경우는 미리 http 요청을 거르는 경우도 있기때문에 직접 tomcat으로 들어와서 오류 페이지를 직접 표시하는 경우는 드물다, 라고 여겨진다. 

해결책을 찾아보았을 때도 실제로 tomcat 의 설정을 조정해서 해당 에러가 발생하지 않는 방법만 나오고 에러 페이지에 대한 best practice가 눈에 띄지 않았다. 해서, 이 부분은 웹서버에서 처리하는 방식으로 가능하다는 점을 기술해두었다. 

nginx에서 `proxy_intercept_errors on;` 을 통해서 error page를 intercept 할 때 편리한 점이 하나 있다. 정의되지 않은 status code에 대해서는 여전히 프록시 서버의 응답값을 표시할 수 있다는 점이다. 그 예로 위에서 404를 정의하지 않았는데, 이는 여전히 tomcat 값으로 표현된다. 
![tomcat-404](./undef-404.png)

주의할 점 또한 있다. nginx와 spring boot / tomcat 에서의 에러페이지 관리가 둘로 분산된다는 점이다. 에러에 대한 표현이 두 곳에 나누어서 관리된다면 개발 관리 측면에서 매우 불리하고 관련해서 찾아볼때마다 여러 곳을 찾아야해서 비용이 들 것이다. 가능하다면 한쪽으로 모는 것이 가장 이상적이다. 

추가로 주의할 점은 에러페이지를 spring boot / tomcat 에서처럼 동적으로 내려주고 싶은 경우다. nginx는 값을 동적으로 끼워서 내려줄 수 있는 방법은 없으므로, 이런 에러페이지를 coyote 에러에 대해서 구성하고 싶다면 불가능한 방법이라고 생각된다. 



## 참고 

- error  / index 페이지 참고 https://codepen.io/selcukcura/pen/XeQpEv

- tomcat internals https://kadensungbincho.com/blog/backend/apache-tomcat-internals

- Reverse Proxy 설정 시 Nginx 에서 Error Page 설정 https://ifmkl.tistory.com/338
