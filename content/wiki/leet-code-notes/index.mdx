---
layout  : wiki
title   : '헷갈리는 leetcode 문제 정리하기'
excerpt : 오답노트 🙄
date    : 2020-10-23 18:15:19 +0900
updated : 2020-10-23 23:30:58 +0900
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

## House robber 시리즈 
[198. House robber - easy](https://leetcode.com/problems/house-robber/) 

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
당신은 전문털이범입니다 😈 각 집은 일정한 돈이 쌓여있습니다. 인접한 집은 보안시스템이 연결되어있어서, 인접한 두 집을 연속으로 털면 자동으로 경찰을 부르게 됩니다.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
각 집의 돈을 의미하는 자연수 리스트가 주어졌을 때, 경찰에게 들키지 않고 털수있는 최대 돈을 구하시오. 

> Input: nums = [1,2,3,1]
> Output: 4
> Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
			 

### 주의할 점 
house rob 를 계속 이렇게 접근하는데.. 짝수만 털고 홀수만 털어서 max를 구하는 건 안먹힌다. 다음걸 털었을 때 vs 털지 않았을 때의 수로 나눠서 접근하는 것이 현명하다. 

### 나의 접근법 

```python
class Solution:
    memo = {}
    def rob(self, nums: List[int]) -> int: # Time Limit Exceeded
        if not nums or len(nums) == 0:
            return 0

        if len(nums) == 1:
            return nums[0]


        def hop(nums: List[int]):
            key = str(nums)
            if key in self.memo:
                # print("hit")
                return self.memo[key]

            if not nums or len(nums) == 0 :
                return 0

            if len(nums) == 1:
                self.memo[key] = nums[0]
                return nums[0]

            if len(nums) == 2:
                self.memo[key] = max(nums[0], nums[1])
                return self.memo[key]

            if len(nums) == 3:
                self.memo[key] = max(nums[0] + nums[2], nums[1])
                return self.memo[key]

            if len(nums) == 4:
                self.memo[key] = max(nums[0] + nums[3], nums[0] + nums[2], nums[1] + nums[3])
                return self.memo[key]

            else:
                self.memo[key] = max(hop(nums[2:]) + nums[0], hop(nums[3:]) + nums[0])
                return self.memo[key]

        return max(hop(nums), hop(nums[1:]))
```

hop으로 뛴다. memo로 저장한다.

- 리스트 길이가 1개일땐 여기만 털면된다. 
- 2개일때는 둘중 하나만 털어야한다. 
- 3개 일때는 첫번째, 세번째를 털기 vs 두번째를 털기 
- 4개일 때는 (1,3) / (2,4) / (1,4) 중에 큰것 

이를 조금 일반화하면, 1개 떨어진걸 가는 경우  or 두개를 떨어진 걸 가는 경우를 잘 선택해서 가면 된다. 

이게 잘 몰랐는데 전형적인 DP 문제라고 하더라구. DP를 다시 공부해야겠다. 

### Solution 

```python
   def rob(self, nums: List[int]) -> int:
        if not nums: return 0
        elif len(nums) == 1: return nums[0]
        elif len(nums) == 2: return max(nums[1], nums[0])
        
        m = [0] * len(nums)
        m[0], m[1] = nums[0], nums[1]
        m[2] = m[0] + nums[2]
        res = max(m[1], m[2])
        for i in range(3, len(nums)):
            m[i] = max(m[i-2], m[i-3]) + nums[i]
            res = max(res, m[i])
        return res
```
[출처](https://leetcode.com/problems/house-robber/discuss/892731/20ms-Python-solution-Easy-understand) 


