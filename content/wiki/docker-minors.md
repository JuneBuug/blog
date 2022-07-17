---
layout  : wiki
title   : 'docker, 사소한 사실들' 
slug : 'docker-minors'
date    : 2022-07-09 16:39:31 +09:00
updated : 2022-07-17 20:43:14
tags    : 
- DevOps
---

## it 태그 

`i`n`t` eract 의 줄임말인듯. 가상의 tty (_TTY_(teletypewriter) 항목은 리눅스 디바이스 드라이브중에서 콘솔이나 터미널) 를 제공.

docker 의 WORKDIR 에서 돌아간다. 그러니 WORKDIR 를 설정할 때 요런 것도 생각할 수 있겠지. 


## examine

```bash
docker examine <container id> 
```
컨테이너의 메타데이터 볼 수 있음. 

```bash
student_02_d78fe3a5a0ea@cloudshell:~/test (qwiklabs-gcp-02-87c7d5f13446)$ docker inspect ef655369db29
[
    {
        "Id": "ef655369db298c140cb12104aab2145353513ef5db1463103883080ee9d96445",
        "Created": "2022-07-09T07:36:39.508484157Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "node",
            "app.js"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 1526,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-07-09T07:36:39.885745897Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        // 중략
]

```
