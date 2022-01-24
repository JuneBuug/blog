---
title   : '너무 긴 mysql index 문제' 
slug  : '/too-long-index'
layout  : wiki 
excerpt : 
date    : 2021-12-03 17:22:50 +0900
updated : 2021-12-03 17:26:13
tags    : 
- Database
---

## 문제 상황 

한 칼럼을 4000 byte로 늘리려고하는데, 해당 칼럼이 이미 인덱스가 있어서 문제가 됐다. 

이때 index 의 크기가 3072 byte를 넘길수 없다는 오류가 표시되었습니다.
참고) https://dev.mysql.com/doc/refman/8.0/en/innodb-limits.html
The index key prefix length limit is 3072 bytes for InnoDB tables that use DYNAMIC or COMPRESSED row format.

## 세가지 해결방법 

1) 인덱스 삭제하기 
   필요하지 않으면 삭제한다. 
2) 칼럼 자체에 hash 를 태우는 방법 
   저장하는 순간부터 hash 를 태워서 길이를 줄이는 방법이 있겠다. 어떤 hash 알고리즘을 선택할 것인지 또 결정이 필요. 
3) 칼럼의 일부만 인덱스 태우기 
   utf8mb4 기준으로 varchar 한자는 4byte이므로, `칼럼(768)` 까지는 인덱스를 태울 수 있다. 다만 이 인덱스가 유니크 인덱스면 768자 까지만 동일하겠지.
   
```sql 
CREATE INDEX `index_명`
     ON `table명` (`칼럼명`(768))
```

위 문제에서는 4000으로 바꾸려다가 문제가 된 것이므로, 먼저 

- drop index
- modify table
- create new index 
순으로 진행해준다.
