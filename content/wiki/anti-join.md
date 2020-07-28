---
title   : 'SQL 에서 차집합 : Anti-join 의 세가지 방법'  
slug  : '/anti-join' 
layout  : wiki 
excerpt : 
date    : 2020-07-28 15:41:14 +0900
updated : 2020-07-28 15:42:01
tags    : 
---
[[ways-of-query]] 에서 확장된 글입니다. 

- https://planet.mysql.com/entry/?id=24888
  - that Not exists is used to optimize the queries similar to the one we have just run: LEFT JOIN with IS NULL predicate applied to a non-nullable column.
 - nullable 하지않은 칼럼에서 left join / is null 이나 not in 사용이 최적이다.  실제로 과연 그런지?
 - nullable 칼럼은 나뉜다. 
    - not exist 직관적이다.  104ms 
    - not in + 에 nullable 체크 필요 112ms
    - left join / is null 은 추가 table lookup 필요하고 해서 별로임! 140ms 




