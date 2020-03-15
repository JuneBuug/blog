---
layout  : wiki
slug    : '/ringfit-checker'
title   : '링피트 체커를 fauna로 만들어보자' 
excerpt : 'fauna와 netlify 활용하기'
date    : 2020-03-14 18:33:23 +0900
updated : 2020-03-15 18:58:26 +0900
tags: 
   - Serverless
   - Netlify
---

때는 두달 전 쯤, 링피트에 질려하고 있던 나에게 연락이 왔다. '링피트 했는지 체크하는 모임에 들어오삼ㅎㅎ' 'ㅇㅇ' 그렇게 링피트-체커 모임을 시작했다. 

카톡으로 시작된 모임은 꽤 순조롭게 진행됐는데, 운동 종료후 나오는 화면을 찍어서 카톡방에 올리면 되는 방식이었다.  매주가 끝날 때마다 스터디장이 개인이 주에 4번 했는지 체크해야한다는 점, 그리고 여태까지 한 운동을 모아볼 수 없다는 점만 제외하면 꽤 효율적이었고, 나는 그 마저도 불편했다. '캘린더로 볼 수 있으면 완전 쉬운 일 아니야?' 라고 생각했고, 그 동안 공부 안하고 있었던 vue를 간단하게 그려보고 싶었다. 

이 글에서는 vue 구현은 다루지 않는다. 너무 쉬워서 (...)도 있고, fauna를 처음 사용한 기록이기때문에 그 부분에 좀더 치중하도록하겠다. 

## 필요한 기능 
이름은 링피트 캘린더, 그리고 메인 기술은 vue. 메인으로 구현하고 싶은 기능은 '며칠에 얼마나 했는지' 를 보여주는 캘린더. 유저가 직접 결과를 업로드하면 저장이 되도록하는 간단한 CRUD 프로젝트가 되도록 구성한다. 

- 그날 운동한 정보를 업로드 
- 유저별 운동한 정보 보기 

두 가지만 만들면 되는 간단한 토이프로젝트다.

## 어떻게 구성하지?

### netlify 로 배포하자
FE 빌드 결과물만 떨어뜨리는 정적 페이지라고 생각했으므로, 최근 잘 사용하고 있는 `netlify` 를 활용하기로 했다. 빌드 명령어와 github 레포지토리만 있으면 간단하게 연동이 가능하다. 

### fauna 에 정보를 저장하자
유저별로 나눠서 정보를 저장해두려면 DB와 서버가 필요했다. 하지만 필요한 정보는 간단하고, 양도 매우 적다. 이를 위해 따로 서버를 구축하고 싶지는 않았다. 어떻게 방법이 없나, 살펴보다 최근 잘 사용한 netlify와 쉽게 연동되는 fauna DB를 찾아냈다. 

#### fauna DB? 
fauna는 현대 클라우드와 컨테이너 중심 환경에 맞는 분산 데이터베이스. fully-featured 이므로 그냥 가입하고 바로 쿼리를 작성하기만 하면 된다고 문서에 나와있다. 여기에서는 고도화된 feature 가 아니라 CRUD만 사용해보았고, 이 선에서는 잘 동작한다. 더 알고 싶다면 [공식 홈페이지](https://fauna.com/) 을 참고하자.

### 이미 있는 css 컴포넌트를 활용하자 
css 로 웹을 사용성이 좋게 만드는 일에는 큰 소질이 없어서, 이미 있는 컴포넌트 라이브러리를 활용하기로 했다. 모바일에서도 반응형으로 동작하는 깔끔한 라이브러리를 찾다보니, https://bulma.io/ 의 vue 버전인 https://buefy.org/ 가 눈에 들어왔다. 이를 활용하자.


## 구현하자 

### vue-cli 활용해서 프로젝트 셋업하기

프론트엔드에 익숙하지 않은 경우 무조건 vue-cli의 도움을 받는 것이 좋다. 
vue-cli 3을 설치하고, init project 명령어를 입력하자. 

```bash
npm install -g @vue/cli # vue cli 3 을 전역 설치 

vue create <project명> # 프로젝트를 생성
```
자동으로 촤라락 만들어지는 설정 파일에 감사하면서, 기술발전의 위대함에 박수를 보내자. 🙌

![img](./img/1.png)
다음에 나오는 설정은 잘 모르니까 babel와 webpack을 선택한다. 

![vue-cli](./img/2.png)
가이드가 말하는 대로, 프로젝트 디렉토리로 이동해서 `npm run serve` 를 입력하면 기본 vue 페이지를 만나볼 수 있다. 


### fauna DB 와 netlify 튜토리얼 따라가기

[튜토리얼](https://github.com/netlify/netlify-faunadb-example) 은 여기에. 그대로 따라가기엔 리액트 앱이라서 살짝 주의하면서 봐야한다. 


#### fauna 가입하기 
[https://dashboard.fauna.com/accounts/register](https://dashboard.fauna.com/accounts/register) 로 접속해서 무료 계정을 만들자. fauna는 github 계정 그리고 netlify 계정으로도 가입할 수 있다. 나는 github 계정으로 가입하는 것을 선택했다. 

들어가면 `create new database` 가 선택하여, 원하는 이름을 입력한다.
![fauna](./img/4.png)
생성 후에는 security 탭으로 들어가서 API key를 생성한다. 이 key는 소중하게 보관해둔다 (ㅋㅋ). 

이 키는 작업환경에서
```bash 
export FAUNADB_SERVER_SECRET=<위에서얻은APIKEY>
```
로 환경변수로 지정해둔다. 

#### 스키마 만들기 

스키마를 설정해주는 스크립트를 복사해오자. 위 튜토리얼에서 안내하는대로, 프로젝트 최상위 디렉토리에 `scripts` 라는 폴더를 만들고 `bootstrap-fauna-database.js` 파일을 만든다. 파일 내용은 [여기](https://github.com/JuneBuug/exercise-check-calendar/blob/master/scripts/bootstrap-fauna-database.js) 를 참고하자.

프로젝트의 `package.json` 로 가서 
```
 "scripts": {
    "bootstrap": "node ./scripts/bootstrap-fauna-database.js"
  }
```
scripts 하단에 bootstrap이라는 명령어를 입력해준다. 이제 터미널에서 언제든 `npm run bootstrap` 을 치면 노드 스크립트가 실행된다. 

스크립트 내부에 나는 records라는 이름으로 스키마를 만들도록 변경해두었다. 

```js
 return client.query(q.Create(q.Ref('classes'), { name: 'records' }))
        .then(() => {
            return client.query(
                q.Create(q.Ref('indexes'), {
                    name: 'records_by_name',
                    source: q.Ref('classes/records'),
                    terms: [{field: ["data", "name"]}],
                }))
```

위 코드에서 `name: 'records'` 에 명시해준 records가  테이블의 이름에 해당한다. 또한 필요한 필드로 검색할 수 있도록 인덱스를 추가할 수 있다. 여기서 유저의 이름으로 레코드를 불러올 수 있어야하므로 `records_by_name` 이라는 인덱스를 추가했다. 

그러면 나머지 필드는 어떻게 정의하면 될까? 이 부트스트랩 단계에서는 일단 이정도만 정의해둬도 충분하다. 나머지 필드는 넣는대로 들어간다 (!) 정확히는 json 형태로 저장되기 때문에, index에 정의된 필드 (name) 만 포함된다면 오류없이 돌아가게된다. 

이제 터미널에서 `npm run bootstrap` 을 실행하면, 아까 만들어둔 fauna 콘솔에서 records라는 콜렉션이 나타난다. 

#### 함수 환경 세팅 

여기서는 API 가 하나의 파일로 떨어진다고 생각하면 된다. API 를 저장할 폴더를 만들기 위해서 `functions` 라는 폴더를 만든다. 

```bash 
mkdir functions
```

이후 `netlify-lambda`를 설치한다. Netlify lambda는 로컬에서 서버리스 함수를 모방해서 개발 환경을 만들어주고, 서버리스 함수를 번들링해주는 역할을 한다. 

```bash 
npm install netlify-lambda --save-dev
```

튜토리얼에서는 `package.json`에 프록시 설정을 다음과 같이 해주라고 말한다. 
```json
{
  "name": "react-lambda",
  ...
  "proxy": {
    "/.netlify/functions": {
      "target": "http://localhost:9000",
      "pathRewrite": {
        "^/\\.netlify/functions": ""
      }
    }
  }
}
```

그리고 `package.json`에 추가 명령어를 입력해준다. 최종 결과는 다음과 같다. 

```json
{
  "name": "ring-fit",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "npm-run-all --parallel serve:app serve:server",
    "build": "npm-run-all --parallel build:**",
    "serve:app": "vue-cli-service serve",
    "serve:server": "netlify-lambda serve functions",
    "build:functions": "netlify-lambda build functions",
    "build:app": "vue-cli-service build",
    "prebuild": "echo 'setup faunaDB' && npm run bootstrap",
    "bootstrap": "node ./scripts/bootstrap-fauna-database.js"
  },
  // .. 중략
  "proxy": {
    "/.netlify/functions": {
      "target": "http://localhost:9000",
      "pathRewrite": {
        "^/\\.netlify/functions": ""
      }
    }
  }
}
```

#### 정말로 함수 만들기

이제 정말로 함수를 만들어보자.😔
faunadb 인덱스를 사용하기 위해서 npm에 또 한번 설치를 해준다. 

```bash 
npm install faunadb --save
```

이후 functions 하위에 `records-create.js` 라는 이름의 파일을 만들어준다. 이름에서 보이는 것처럼, 아까 만들었던 collection `records` 에 create 를 하는 역할이다. 
이 파일의 전문은 [여기](https://github.com/JuneBuug/exercise-check-calendar/blob/master/functions/records-create.js)를 참고.

```js
/* code from functions/todos-create.js */
import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
    /* parse the string body into a useable JS object */
    const data = JSON.parse(event.body)
    console.log("Function `records-create` invoked", data)
    const record = {
        data: data
    }
    /* construct the fauna query */
    return client.query(q.Create(q.Ref("classes/records"), record))
        .then((response) => {
            console.log("success", response)
            /* Success! return the response with statusCode 200 */
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify(response)
            })
   // 중략
}
```
내용은 간단하다. faunadb 모듈에서, 지정해놨던 faunadb_secret(이전의 APIkey 값)을 가지고 fauna와 통신하는 **클라이언트**를 가져와준다. 이 함수가 호출되는 이벤트에서 body를 가져온다. 이 값을 `records`에 넣어달라! 고 말하는 쿼리를 보낸다. 

이 파일은 실제로 어떻게 사용할 수 있을까? 앞서 말한대로 vue 구현은 설명하지 않을 것이므로, vue component가 이미 존재한다고 가정하겠다. 아래 컴포넌트에서 인증버튼을 누르면 post가 날아가게 하고싶다. 
![img](./img/6.png)

나는 `Cal.vue`라는 파일에 scripts로 다음 함수를 작성했다. 

```js
createRecord() {
      this.$http
        .post("/.netlify/functions/records-create", {
          name: this.nickname,
          date: moment(new Date()).format("YYYY-MM-DD"),
          kcal: this.kcal,
          numberOfDots: Math.floor(this.kcal / 25),
        })
        .then(res => {
          this.getRecordByName();
        });
    },
```
위는 명백하게, '`/.netfliy/functions/records-create` 로 post 해줘. 아, 그런데 body는 name에는 nickname을, date는 지금 현재 짜를, kcal는 입력받은 값을, 점의 갯수는 이 칼로리를 25로 나눈 값으로 넣어줘.' 라는 뜻이다. 아까 설정했듯이 저 경로는 localhost:9000 에 프록시되어 요청되므로 netlify-lambda에 의해서 처리된다. 그리고 name을 제외한 date, kcal 등의 값은 맘대로 넣으면 된다. 

#### get은 어떻게 해요? 

get 함수가 더 쉽다. 다만 여기서는 유저의 이름에 따라서 콜렉션을 가져오는 경우를 살펴본다. 
```js
 return client.query(q.Paginate((q.Match(q.Index('records_by_name'), data.name))))
        .then((response) => {
            const recordRefs = response.data
            console.log("Record refs", recordRefs)
            console.log(`${recordRefs.length} records found`)
            // create new query out of todo refs. http://bit.ly/2LG3MLg
            const getAllRecordDataQuery = recordRefs.map((ref) => {
                return q.Get(ref)
            })
            // then query the refs
            return client.query(getAllRecordDataQuery).then((ret) => {
                console.log("final results: ", ret)
                return callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(ret)
                })
            })
        })
```
query문이 두번 날아가는 게 보이는지? 조금 비효율적이지만 위 코드는 record의 레퍼런스를 가져오고,(숫자 id로 표시된다) 그 레퍼런스의 리스트를 돌면서 각각을 get하는 방식으로 접근한다.


#### 더 많은 쿼리 

더 다양한 쿼리는 위의 튜토리얼에서도 제공해주지만, [fauna 공식문서](https://docs.fauna.com/)에서 정보를 얻을 수 있다. 참고해서 다양한 쿼리를 만들어보자.

## 그래서, 어때요?

이렇게 만들어진 링피트체커의 결과물은 다음과 같다. [사이트](https://brave-mirzakhani-dea440.netlify.com/juneyr) 에서도 볼 수 있다. 
![img](./img/result.png)

fauna와 netlify 의 연동은 쉽고 빠르다. 기본적인 js 문법만 안다면 작성도 쉽게 가능하다. 또한 콘솔도 편리해서 DB에 직접 접속하는 일 없이 웹사이트에서 손쉽게 index를 추가하고 정보에 접근 가능하다. todos 혹은 이런 checker 정도의 토이프로젝트에는 딱이라고 말할 수 있다. 🙂 read/write operation의 수에 따라 어느 정도는 무료라는 점도 매력적이다. 

다만 API를 일일히 파일로 만들어야한다는 점, 데이터에 타입을 강제하기가 어려워보인다는 점, 또 많은 양의 데이터를 다루기가 어렵다는 점이 약간 마음에 걸린다. 혹시 더 고도화된 토이프로젝트를 만들고자 한다면, 더 일반화된 db로 접근하는 것이 좋다는 생각이 들었다.

serverless 한 형태로 구성해보는 토이프로젝트는 처음이었는데, 확실히 FE 파트만으로는 프로젝트가 비어보일때 유용하다. 다음 토이프로젝트에서도 한번쯤은 고려해볼만한 옵션이라는 생각이 든다. 
