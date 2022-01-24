---
layout: 'wiki'
slug  : '/leetcode-in-java-easy' 
title   : 'leetcode 자바로 풀자! (easy)'
excerpt : 알고리즘 바보의 도전
date    : 2020-03-11 18:40:25 +0900
updated : 2020-03-18 13:44:03 +0900
tags    : 
- Algorithm
---

# 2020 3월 2주차  (3/9 - 3/13)

## 1108. Defanging IPv4 Address 
```java
class Solution {
    public String defangIPaddr(String address) {
        
        
        String result = "";
        for(char c : address.toCharArray()) {
            if (c == '.'){
                result += "[.]";
            }else {
                result += c;
            }
        }
        
        return result;
        
    }
}
```

## 70. Climbing Stairs 
  흔한 피보나치..? 문제였던 것같은데 1,2 케이스에 대해서만 return 하고 점화식 사용하니까 time exceeded. 그래서 그냥 저장공간을 써버렸다. 
```java
  class Solution {
    public int climbStairs(int n) {
        
        if (n == 1){
            return 1; 
        }
        
        if (n == 2) {
            return 2;
        }
        
        if (n == 3)  {
            return 3;
        }
        
        if (n == 4) {
            return 5;
        }
        
        if (n == 5) {
            return 8;
        }
        
        if (n == 6) {
            return 13; 
        }
        
        return climbStairs(n-1) + climbStairs(n-2);
        
    }
}

```

### 1365. How Many Numbers Are Smaller Than the Current Number 
그냥 이중 for문으로 풀었는데도 accept이 됐다. 당연히 안될줄? 
다른 discussion보니까 Array -> asList로 만든다음, Collection으로 sort하고. 원래 배열에 대해서 그 값이 정렬된 list에서 몇번째인지를 리턴. 근데 중복은 빼야겠다 이러려면.

```java
class Solution {
    public int[] smallerNumbersThanCurrent(int[] nums) {

        int[] res = new int[nums.length];
        for (int i=0; i<nums.length; i++) {
            int cnt = 0;
            for (int j=0; j<nums.length; j++) {
                
                if (i!=j) {
                     if ( nums[i] > nums[j]) {
                        cnt ++;
                    }
                }
    
            }
            res[i] = cnt;
        }
        
        return res;
    }
}
```

# 3월 셋째주 3/16 ~ 3/22 
## 1313. Decompress Run-Length Encoded List 
array를 자유자재로 list로 변환하기 

```java
class Solution {
    public int[] decompressRLElist(int[] nums) {
        
        List<Integer> list = new ArrayList<Integer>();
        int times = 0;
        for(int i=0; i< nums.length; i++) {
            if (i%2 == 0) {
                times = nums[i];
            }
            else {
                for (int j=0; j<times; j++) {
                    list.add(nums[i]);
                }
            }
        }
        
        return list.stream()
 	           .mapToInt(Integer::intValue)
        	    .toArray();
    }
}
```
