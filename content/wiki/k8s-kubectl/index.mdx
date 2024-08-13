---
title   : 'Kubectl 명령어'
slug  : '/kubectl-words'
layout  : wiki 
excerpt : 
date    : 2020-12-31 16:13:36 +0900
updated : 2024-08-13 21:10:23
tags    : 
- DevOps
---

## 기본 명령어 
- apply: 적용합니다. 
  ```bash 
  kubectl apply -f <파일명> # 혹은 url 
  ```
- get: 리소스를 확인합니다. 
  ```bash 
  kubectl get pod 
  kubectl get pods 
  kubectl get po 
  
  # 쉼표로 여러 타입도 확인 가능 
  kubectl get po,svc # 중간에 띄어쓰기는 오류가 남 
  
  kubectl get all # 대표적인 리소스들을 편하게 볼 수 있음 
  
  kubectl get pod -o wide # 추가적인 정보 볼 수 있음 
  kubectl get pod -o yaml # yaml 형식, 실제 형태를 볼 수 있음 (정의된 값) 
  kubectl get pod -o json # json 형식
  
  kubectl get pod --show-labels # pod에 할당 된 label 확인 가능. app 은 wordpress, tier는 fe 혹은 mysql 이라는 식으로. 
  ```
- describe: 리소스 상세 상태보기
get보다 상세하게 
```bash 
kubectl get pod 
kubectl describe pod/<pod이름>  # 환경 마다 이름이 다르다.
# kubectl describe [타입]/[이름] 혹은 [타입] [이름]
# events 가 있어서, 과정이 보임. image 오류나 배포 실패를 확인할 수 있습니다. 
```

- delete : 리소스 제거 
```bash 
kubectl delete [타입] [이름] 
```

- logs : 로그 조회 
```bash 
kubectl get pod 

kubectl logs wordpress-5f59577d4d-n9dtb 

kubectl logs -f wordpress-5f59577d4d-n9dtb # 실시간으로 로그 확인 
# minikube service wordpress 로 접속해보면 로그를 확인할 수 있음
```
- exec : 컨테이너에 명령어 전달.
```bash 
kubectl exec -it wordpress-5f59577d4d-n9dtb -- bash 
# -it 옵션은 쉘로 접속함. 여기서는 bash를 사용 
# k exec [-it] [팟 이름] -- [명령어]
```

- config: 설정 관리 
kubectl 은 여러개의 클러스터를 컨텍스트로 설정하고 원하는대로 선택할 수 있습니다. 현재 어떤 컨텍스트로 설정되어있는지 확인합시다. 
```bash 
k config current-context
# minikube

k config use-context minikube # 컨텍스트 설정
```

### 확인가능한 리소스 
```bash 
kubectl api-resources
```

node는 no로 확인도 가능하다. 
```bash 
kubectl get node
kubectl get nodes 
kubectl get no
```

## m1 에서 실습하는 경우 

m1 에서 재실습하는 경우 (미래의 나.. 가 생겨버렸다) 
그럴 경우 docker desktop이 설치되어있어야함 

```bash 
minikube start --driver=docker
```

driver 를 docker 로 해준다. 

이때 wordpress 실습 진행할때도 쿠버네티스의 리소스 포트가 아닌 
`minikube service` 로 실행한 터널링을 통해 접근해야한다. 




## 참고 
이 문서는 subicura님의 inflearn 강의 [초보를 위한 쿠버네티스 안내서](https://www.inflearn.com/course/%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4-%EC%9E%85%EB%AC%B8/dashboard) 학습 중 기록용으로 사용되었습니다.
[subicura님의 쿠버네티스 안내서](https://subicura.com/k8s/guide/kubectl.html#%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%82%E1%85%A5-%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3-%E1%84%8C%E1%85%A9%E1%84%92%E1%85%AC-logs)
