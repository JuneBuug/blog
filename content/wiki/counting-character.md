---
title   : '글자수 세기의 딜레마, 이 글자의 길이는 DB 상에서 얼마일까?' 
slug  : '/counting-character'
excerpt : 
date    : 2021-10-03 09:42:15 +0900
updated : 2021-10-17 15:32:57
tags    : 
- Grapheme
- Database
- Unicode
- Encoding
---

## 서론 
글자수를 센다는 것은 무엇일까? 이 글을 본 개발자라면 아마도 각자 언어의 `length()` 함수를 떠올렸을 수도 있겠다. `length()` 는 개발자가 글자를 세지않아도 빠르게 길이를 알려준다. 

그런데 이 `length()` 를 믿을 수 있는 걸까? 🤦‍♀️ 얼마 전, 이런 이슈에 부딪혔다. 

> `name` truncated too long ... 

분명, 20자 제한이 있는 서비스에서 가져온 이름을 그대로 넣었는데, `varchar(255)` 가 부족해서 안들어간다는 오류가 발생했다. 문제 해결을 위해서 어떤 이름에서 발생했는지 보니, **눈으로는** 분명 해당 서비스에서 제공하는 20자가 맞다. 
왜 이런일이 발생했을까? 


## 글자수 세기의 딜레마 
해당 닉네임을 단순화해서 접근해보자. 

![두가지 단어](./count-01.png) 
위의 두 단어, `June` 그리고 `🏧〶㊄✘` 는 우리 눈에 4글자로 인식된다. 그런데 뒤는 좀 의심이 된다. 정말 이거 4글자 맞아? 컴퓨터도 그렇게 생각할까? 

위에서 바로 4글자라고 답했다면, 우리는 이를 `Grapheme clusters` 의 관점에서 보고 있는 것이다. (발음은 그래프미가 아니라 그래핌이었다..) Grapheme 은 `문자소`라는 뜻으로, 사용자가 인지하는 하나의 글자를 말한다. 

이런 grapheme 기준은 주로 다양한 국가에 서비스하는 국가에서, 아래처럼 입력된 글자의 글자수를 카운트할때 사용한다. 

![line display name](./count-03.png)

참고한 라인 엔지니어링 블로그에 따르면, 라인은 다양한 국가에 서비스하고 있으므로 다양한 언어와 그 글자수가 실제로 몇 byte 차지하는지 상관없이, 사람 눈이 인지하는 문자소 갯수로 바꿔줄 필요가 있다. 

뒤집어서 말하면, 1 grapheme 글자는 글자에 따라서 여러 유니코드 문자로 이루어질 수 있다. 
유니코드 캐릭터 (U+0000~U+10FFFF 사이)를 우리는 `code point 코드 포인트`라고 한다. 
간단하게 인지하고 넘어가기 위해서 유니코드의 **번호**라고 생각하면 좋을 것 같다.

## 코드 포인트와 UTF-8 / UTF-16의 관계 

하나의 코드포인트를 번역(인코딩)하는 방식은 여러개가 있는데, 그것이 유명한 
- UTF-8
- UTF-16 

이다. 

하나를 바라보는 방식의 차이인데, UTF-8은 가장 작은 코드 포인트를 번역할 때 1byte를 쓰고, 가변적으로 최대 4byte까지 사용한다. 
UTF-16은 가장 작은 코드 포인트를 번역해도 2byte를 사용하고, 범위에 따라 4byte 를 사용하기도 한다. 

예를 들어보자.

![u+007f](./count-08.png)

U+007F라는 코드 포인트를 가진 문자는 ␡ 이다. 
이 문자를 번역할때, UTF-8은 1byte (7F, 8bit 2진법으로는 0111 1111) 를 사용한다. 
반면 UTF-16은 같은 코드포인트에 2byte를 할당하는 것을 볼 수 있다. (00 7F, 0000 0000 0111 1111)


또 다른 예를 보자. 

![u+10000](./count-09.png)

좀 높은 코드포인트의 범위인 U+10000 의 문자는 

UTF-8 기준으로 `F0 90 80 80` 으로, 4byte를 사용했다. 
UTF-16 (Big endian) 기준으로는 `D8 00 DC 00` 으로 표기하고, 4byte를 사용했다. 

(값이 다른 것에 의아할 수 있지만, UTF-8, UTF-16은 이 범위에 대해서는 특정 bit를 고정해놓고 사용한다! 는 정책이 달라서 그렇다. 자세한 내용은 [여기](https://ko.wikipedia.org/wiki/UTF-1)를 참조.)

이렇게 코드포인트를 표현하는데 최소한 필요한 byte 갯수를 `code unit 코드 유닛` 이라고 한다. 
UTF-8의 코드 유닛은 1byte이고, UTF-16의 코드 유닛은 2 byte이다. 

## 예제: 🤦‍♀️ 로 보는 특정한 글자가 -> JAVA 코드 -> MYSQL DB 까지 흘러가는 과정

![이모지로 보는 특정 글자가 DB까지 흘러들어가는 과정](./count-10.png)

다시 돌아가서 
> 1 grapheme 글자는 글자에 따라서 여러 유니코드 문자(코드포인트) 이루어질 수 있다 

의 의미를 살펴보자. 

우리가 자주 사용하는 이모지 중, 🤦‍♀️ 는 단독 코드포인트로 구성된 것이 아니다. 
- 골치아파하는 사람 1F926 🤦
- 연결자   200D
- 여성 기호 2640 ♀︎
- 변형선택기 FEOF

이렇게 4가지 코드 포인트의 구성임을 위 이미지에서 확인할 수 있다.

참고로 이 코드포인트를 하나하나 UTF-16 BE로 번역하면 
`0xD83E 0xDD26 0x200D 0x2640 0xFE0F`이다. 즉 10byte 길이로 인코딩이 된다.

Java 코드에서는 이게 어떻게 표현될까? 

```java
String result = "🤦‍♀️"; // 글자
System.out.println(result);
System.out.println(result.length()); // 값: 5
System.out.println(result.codePointCount(0,5)); // length 까지의 code point 갯수 : 4 
byte[] utf8bytes = result.getBytes(StandardCharsets.UTF_8); // 값: 13
byte[] utf16bytes = result.getBytes(StandardCharsets.UTF_16BE); // 값 10

System.out.println("--- UTF-8 버전 code point --- ");
for (int i=0; i<utf8bytes.length; i++) {
    int hex = utf8bytes[i] & 0xff;
    System.out.print(String.format("0x%04X", hex));
    System.out.print(" ");
}

System.out.println("--- byte 길이 --- ");
System.out.println(utf8bytes.length);

System.out.println("--- UTF-16 버전 code point --- ");
for (int i=0; i<utf16bytes.length; i++) {
    int hex = utf16bytes[i] & 0xff;
    System.out.print(String.format("0x%04X", hex));
    System.out.print(" ");
}
System.out.println("--- byte 길이 --- ");
System.out.println(utf16bytes.length);
```

java에서 가장 먼저 해볼 것은 이 String의 length를 재는 일이다. `String.length()`는 이 1 grapheme 문자의 길이를 5라고 했다. 

![String-length](./count-12.png)

String length 함수의 설명에는 이렇게 적혀있다.

> 해당 문자열의 유니코드 **코드 유닛**의 갯수와 같다.

위에서 코드 유닛을 잠깐 언급했지만, UTF-8 에서는 코드 유닛이 1byte, UTF-16에서는 코드 유닛이 2byte이다. 

- 자바는 내부적으로 UTF-16을 사용하고 있는데,위에서 언급한대로 
🤦‍♀️ = `0xD83E 0xDD26 0x200D 0x2640 0xFE0F` (in UTF-16) 이다.

- 우리가 원하는 답은 `그러면 2byte 씩 몇개 묶여있어?` 와 같은 질문이 되고,
2byte씩 묶은 결과는 보이는 대로 5묶음이다.

- 그 결과 `String.length()`는 우리에게 5라는 결과값을 보여준다. 

다음은 **code point의 갯수** 를 체크해보고 싶다. 이 문자는 앞서 말했듯이 4개의 코드 포인트로 이루어졌다. 이 갯수를 자바 코드상에서 보기 위해서는 `codePointCount(0, length)` 를 사용하면 된다. 이 부분도 우리가 알고 있는 4라는 결과값을 표시했다. 

그럼 이제 이 java String이 mysql DB 로 들어갈땐 어떨까? 
다음 sql로 String의 길이를 미리 확인할 수 있다. 

```sql 
SELECT LENGTH("🤦‍♀️";) # 13
```


이 값도 앞선 코드에서 확인할 수 있다. 바로 String을 UTF-8로 바꿨을 때 bytes의 길이, 13이다.
그럼 왜 이런 결과가 나왔을까? 

> Values in VARCHAR columns are variable-length strings. The length can be specified as a value from 0 to 65,535. The effective maximum length of a VARCHAR is subject to the maximum row size (65,535 bytes, which is shared among all columns) and the character set used. See Section 8.4.7, “Limits on Table Column Count and Row Size”. -dev.mysql.com 

varchar 칼럼의 길이는 최대 row size(65,535) byte와 character set에 종속적이다.

현재 DB의 character set 설정을 확인해보면 
```sql 
SELECT * FROM information_schema.SCHEMATA; #utf8mb4
```
utf8mb4다. 즉 utf8 기준으로 db character set 이 설정되어있다. 

요약하면 🤦‍♀️ 는 

- java 코드 상에서는 length 5
- utf8 character set mysql 기준 varchar(13) 안에 들어감

이라는 결과를 얻을 수 있다. 

이때문에 단순히 length 함수를 길이 체크에 사용한다면,
DB에서는 truncated 될 확률이 발생한다. 

### 마치며: 1 grapheme 당 적정한 varchar 길이 

1 grapheme 당 적정한 varchar의 길이는 [라인 엔지니어링 블로그](https://engineering.linecorp.com/ko/blog/the-7-ways-of-counting-characters/) 에서는 1:12 정도가 적당하다고 제안하고 있다. 다만, 이 값은 절대적인 것이 아니며, 서비스하는 국가의 언어환경과 컨텍스트 고려가 필요하다고 한다. 

실제로 마주친 오류는 varchar(255) 에 grapheme 20 자를 넣으려고 했으나, DB 상에서 길이 277을 확인할 수 있었다. 그러니 12 이상의 배율이 필요했던 것이다. 🤔
이런 부분을 꼭 유의해서 사용하도록 하자! 


## 참고 

- https://engineering.linecorp.com/ko/blog/the-7-ways-of-counting-characters/

- https://ko.wikipedia.org/wiki/UTF-1

- https://www.emojiall.com/ko/code/1F926-200D-2640-FE0F

- https://dev.mysql.com/doc/refman/8.0/en/char.html
