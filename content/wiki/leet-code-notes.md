---
layout  : wiki
title   : '헷갈리는 leetcode 문제 정리하기'
excerpt : 오답노트 🙄
date    : 2020-10-23 18:15:19 +0900
updated : 2020-10-23 18:26:59 +0900
tag     : 
toc     : true
public  : true
parent  : 
---

## [152. maximum product array](https://leetcode.com/problems/maximum-product-subarray/)

Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

주어진 integer array nums 에 대해서,  곱이 가장 큰 연속적인 subarray를 찾으시오.  답은 곱을 반환합니다. 단, array에는 최소 하나의 숫자가 있음

> Example 1:
> Input: [2,3,-2,4]
> Output: 6
> Explanation: [2,3] has the largest product 6.


### 처음 접근 (통과못함 !) 

- maximum sum 과 비슷할 거라고 생각해서 계속 two pointer 생각했지만, 접근이 안됨. 

- 결국 일반론으로 O(n^3) 으로 접근해보았지만 역시나 time limit 에 걸렸다. 
  
```python 
def maxProduct(self, nums: List[int]) -> int:
        if not nums:
            return 0

        max_val = max(nums)

        for i in range(0, len(nums)):
            for j in range(i+1, len(nums)):
                product = nums[i]
                for k in range(i+1, j+1):
                    product = product * nums[k]
                    max_val = max(max_val, product)
        return max_val

```

### Solution 접근 

```python 
def maxProduct(self, nums: List[int]) -> int:
       max_prod = min_curr = max_curr = nums[0]  # min -> 음수를 만나면, min이 그 다음의 max가 될수도 있으므로
       for i in nums[1:]:
            x, y = i * min_curr, i * max_curr
            max_curr = max(i, x, y)
            min_curr = min(i, x, y)
            max_prod = max(max_prod, max_curr, min_curr)
       return max_prod
```
처음에는 이게 뭐야? 싶지만 천천히 따라가면 조금 도움이 된다. 
포인트는 **음수인 product 값도 다음에 음수를 만나면 max값이 될 수 있으므로 두개를 같이 트래킹하는것** 

- 초기값 설정도 좋았다. 맨 앞의 숫자로 설정. 
- nums[1:] 부터 돌리면 되니까. 
- max, min 을 정하는 방식. 이번에 만난 숫자 하나, 아니면 그 전 min * i 한 값, 그 전 max * i 한 값 중에 고르면 된다. 
- max_prod 는 아직 바뀌지 않았기때문에 후보중에 정해준다. 그런데 max_prod와 max_curr 만 비교하지 않는 이유는 뭘까?

