---
title   : '누구든지 하는 리액트: 초심자를 위한 react 핵심 강좌 - 강의 기록'
slug  : '/react-for-everyone-notes'
layout  : wiki 
excerpt : 
date    : 2024-02-17 20:31:28 +0900
updated : 2024-02-18 23:30:58
tags    : 
---

## webpack 

- 파일들을 일일히 불러와서 html 로 가져오는게 아니라 한번에 할 수 있게 해주는 도구. 
- 이 작업이 번들링 
- e.g) 이 과정에서 이미지 압축하고 특정 경로에 넣기. 
- e.g. 2) 자바스크립트 여러개 만들면 기본적으로 하나의 파일로 만들어줌. 
	- 분리도 가능함. 

- [webpack과 babel이 뭐요](https://juneyr.dev/2019-02-20/webpack-babel) 를 다시 써볼 수 있는 부분 


## babel 

- javascript 변환 도구. 
- node js / 나 브라우저의 js 엔진에서 모든 새로운 문법을 지원하지는 않음. 
- 새로운 문법에 대해서 변환해주는 플러그인이 필요함 -> babel 
- jsx 라는 react component 사용하는 부분에서도 babel 을 사용할 것임. 


### code sandbox 
- https://codesandbox.io
- react / angular / vue 프로젝트 바로 시작할 수 있음, 초기 실습 세팅용으로 사용 용이

## jsx
 - 컴포넌트 형태에서 html 를 반환하려면 jsx 사용함
 - html 처럼 생겼지만 지켜야할 규칙들이 몇가지 있음 
	 - tag 는 반드시 닫혀야함 
	 - 두개 이상의 엘리먼트는 무조건 하나의 엘리먼트 
		 - 아마도 하나의 root 가 필요한 vue 랑 비슷한 것 같음 
		- 이게 마음에 안든다면 ? ("extra div 가 꼭 필요해?")
			- 16.2 에서 도입된 Fragment 를 div 자리로 대체하면 extra div 사용 없이 루트로 사용가능함 
		- `{변수}` 문법으로 js 의 const 값을 렌더링 시 사용 가능함 
		- 별첨 
			- var : 함수 단위 스코프 
				- es6에서는 더이상 사용하지 않음
			- let: 블록 단위 (if 단위 등)
			- const: 불변 ㅎ,ㅎ 
		- `{ }`  사용해서 해당 블록 안에서 js 사용할 수도 있음. 
			- 조건부 렌더링 `<predicated> && jsx`
		- 함수 문법 
		```jsx
		{
		    (function() {
		     // 내용 
		    })()  // 즉시 호출 
		}

// 아니면 화살표 함수
{
		    (() => {
		     // 내용 
		    })() 
		}	
		```

- css 적용하는 법 
	- 리액트 상에서는 style 를 객체 형태로 넣어줌
		- camelCase

```jsx
const style = {
	backgroundColor : "green";
}
```

- css - class 적용하는 법
	- class 대신 className이라고 해야 작동함. 
	- class 작동하기는 하는데, className 이 올바른 컨벤션

```jsx

return {
	<div className="app">호이</div>
}
```

- 주석 사용하기 
	- 멀티라인으로 작성 
	- 브라켓으로 한번 감싼 멀티라인 
	- jsx 태그 사이에도 `//` 로 작성 가능함. 
```jsx
{/* 
  이렇게 
*/}
```


## props, state 
- 별첨 ) 
	- props와 state 묘하게 vue 하다보면 어차피 똑같이 나오는 말들이라.. 
		- props 는 뭘까? 했더니 그냥 properties 라고 한다. 
> Props simply stands for properties. 


- props 
	- 부모 -> 자식으로 data 이동 
	- `<Child props="value"/>`
	- 자식에서 받을 때는 `this.props.<props명>` 
	- default props 사용 가능 
		- `static defaultProps = {}`
		- class 내부에 선언 가능
	- 바깥에 쓸 경우 
		- `<ClassName>.defaultProps = {}`
	- props 는 자식 입장에서는 읽기 전용


- 별첨
	- 함수형 컴포넌트  (크게 별다른 일을 하지 않고 props 만을 반환할때)
	- 더이상 Component를 불러오지 않아도 됨.
	- **비구조화 할당** 형태 (object의 하나하나 파라미터를 받아올 수 있는 방법)
	- 초기 마운트가 미세하게 빠름 
	- 메모리 사용 더 적음.
	- 엄청 컴포넌트들 많이 만드는 경우 차이 실감 ㅎㅎ 

```jsx
import React from 'react';

const Sample = ({props}) => {
	return <div> {props} 반환해보기 </div>;
};

const default Sample;
```


- state 
	- 컴포넌트가 처음부터 들고 있는것. 
	- 내부에서 변경 가능
	- setState를 사용함. 

```jsx

state = {
	number : 0;
}

// 조회 시 

{this.state.number}


// setState 시 

this.setState({

   number: <원하는 값> 
})
```


## Lifecycle api 

- 컴포넌트가 나타나고 / 업데이트 되고 / 사라질 때 사용 
	- 종류 많음 
	- https://ko.legacy.reactjs.org/docs/state-and-lifecycle.html


- mounting / updating / unmounting 의 세 가지 종류 
	- https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
	- componentDidMount 
		- 외부라이브러리 연동
		- 컴포넌트에 필요한 데이터 요청
		- DOM 관련 작업 (스크롤 설정, 크기 읽어오기 등)
		- event listener 들 set 
	- should componentUpdate 
		- true/false 반환해서 render 조절 가능 (virtual DOM 에 render 여부 결정, 컴포넌트 성능 최적화 용도로 조절가능)
		- 파라미터로 (nextProps, nextState)
			- 다음에 업데이트할 props와 state 값을 받아옴
	- getSnapshotBeforeUpdate
		- 실제로 DOM에 그려지기 직전
		- DOM 의 크기, scroll 위치 등
		- 업데이트 직전에 dom 상태 가져와줄 수 있음
		- e.g) 업데이트 후에 scroll 이 변경되는데 해당 건을 직전의 snapshot scroll 을 들고와서 업데이트하고 싶은 경우 
	- componentDidUpdate
		- 여기서 snapshot 을 받아와서 작업할 수 있음. 

	- static getDerivedStateFromProps(nextProps, prevState) 
		- props 업데이트 시 
		- state 와 props 동기화 시키고 싶을 때 사용 가능. 

	- componentWillUnmount
		- 사라질 때! 

	- componentDidCatch 
		- render error 가 났을 때 
		- 발생할 수 있는 컴포넌트의 부모 컴포넌트에서 사용해줘야함. 
		- error page 노출이나 error api 로깅 등에 사용함. 

- 별첨
	- ref 설정 특정 요소에
	- `ref = {(ref => (this.변수값 = ref)}`



## 개발환경 세팅 

- node.js 
	- webpack / babel 이  node 사용하기때문에 필요함
	- nvm 통해서 설정 

- npm 대신 yarn 사용 
	- 개선된 버전의 npm 
	- 더 나은 속도 , 캐싱 시스템
	- `npm install -g yarn` 


- create-react-app
	- https://github.com/facebook/create-react-app
	- webpack / babel 등 직접 설정 을 편리하게 해줌
		- 이전에는 직접 설정 or boilerplate
	- `npx create-react-app <app이름>`
	- `yarn start`
	- react-scripts 내부에 webpack/babel 설정 등이 다 들어있는데..
		- `yarn eject` 를 통해서 해당 설정들을 다 꺼내올 수 있음 


- vscode 확장들 
	- reactjs code snippets 
		- rcc 로 입력하면 componet, rsc 로 입력하면 함수형 컴포넌트 자동작성해줌 
	- 아래는 걍 내가 커스텀하게 꾸민거 
		- material icons 
		- atom dark 
		- Jetbrains Mono font 받음 
			- 근데 js 전용이 전혀 아닌데 ㅋㅋㅋㅋ
		- tailwind css 
			- https://tailwindcss.com/docs/guides/create-react-app
			- 실습 조차 예쁜게 좋아 
			- yarn add tailwindcss --dev 
			- npx tailwindcss init


## 자식 컴포넌트가 부모에게 값 전달하기 

- 1) props 로 함수를 받는다. 
- 2) 해당 함수에 값을 전달한다. 
- 3) 부모 컴포넌트가(함수 호출을 통해서) 값을 전달한다.



## 비구조할당 문법 

```jsx 
// this.state.information 의 반복을 대체 

const {information} = this.state; 

this.setState({
	information : information.concat(data);
})
```


- setState 하는 이유는 반드시 렌더링하기 위함임 
	- push 해서 불변성을 유지하지 않는 경우 렌더링이 되지 않음 



- createRef 를 통한 ref 접근 가능 


- 다음 배우면 좋을 것 
  - https://velopert.com/3642
 
