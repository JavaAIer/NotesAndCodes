### 获取token
``` bash
#post 请求:
http://localhost:8080/oauth/token?username=sang&password=123&grant_type=password&client_id=password&scope=all&client_secret=123
```

返回
``` json
{
    "access_token": "94e8a74b-969f-4a97-b05e-288376259904",
    "token_type": "bearer",
    "refresh_token": "8bd40eac-3e81-414f-95a1-76e0124ce1e6",
    "expires_in": 1799,
    "scope": "all"
}
``` 

### 刷新token

``` bash
# post请求
http://localhost:8080/oauth/token?grant_type=refresh_token&refresh_token=8bd40eac-3e81-414f-95a1-76e0124ce1e6&client_id=password&client_secret=123

```

返回
```json 
{
    "access_token": "c5ddfb88-d12b-47e6-b902-826a592de83e",
    "token_type": "bearer",
    "refresh_token": "8bd40eac-3e81-414f-95a1-76e0124ce1e6",
    "expires_in": 1799,
    "scope": "all"
}

```

### 访问资源服务器上的资源
正常访问
``` bash
# get 
http://localhost:8080/user/hello?access_token=c5ddfb88-d12b-47e6-b902-826a592de83e

 ```
 
 
 返回:
 ```json
Hello user!
```

越权访问
``` bash
# get 
http://localhost:8080/admin/hello?access_token=c5ddfb88-d12b-47e6-b902-826a592de83e

 ```
 
 
 返回:
 ```json
{
    "error": "access_denied",
    "error_description": "Access is denied"
}
```