---
layout  : wiki
title   : 'varnish 가 뭔데요' 
slug : '/varnish-basics'
date    : 2022-04-27 11:03:13 +09:00
updated : 2022-04-27 11:03:13 +09:00
tags    : 
---


### varnish 뭔데 

Things like, how the child process should deal with the HTTP requests, what to cache, which headers to remove etc, is all specified using a small programming language called **VCL** – Varnish Configuration Language. The manager process will compile the VCL program and check it for errors, but it is the **child process** which runs the VCL program, for each and every HTTP request which comes in. 

C라서 빠름
https://varnish-cache.org/docs/6.6/reference/states.html#reference-states

### bereq 뭔데 
`bereq.*` is the “backend request” as created from the original request. It may differ slightly - Varnish can convert HEAD requests to GET for example.

원 요청에서 생성된 `backend request`. 좀 다른데, varnish 가 HEAD  request 를 GET 으로 변형해서 요청 해줄 수 있음. (이때 생성된게 backend request)



https://varnish-cache.org/docs/6.6/users-guide/operation-logging.html?highlight=log

apps/varnish > bin > ./varnishlog -b -g request | grep '<url>'



```bash
./varnishlog -b -g request | grep -e 'timestamp' -e 'BereqURL' -e 'BereqMethod'
```


``
## 참고 

- https://varnish-cache.org/docs/
- https://www.varnish-software.com/developers/tutorials/redirect/
- https://www.varnish-software.com/developers/quick-start/
- https://varnish-cache.org/docs/6.6/users-guide/
- https://jonnung.dev/system/2020/03/18/increasing-varnish-cache-hit-rate/