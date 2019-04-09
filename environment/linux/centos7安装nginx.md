## 解压缩

``` bash
mkdir /usr/local/nginx
chmod 755 /usr/local/nginx
cd /usr/local/nginx
wget http://nginx.org/download/nginx-1.14.2.tar.gz
tar -zxvf nginx-1.14.2.tar.gz


# cp -r /usr/local/nginx/nginx-1.14.2/. /usr/local/nginx/

```

## 编译安装 

``` bash
cd nginx-1.14.2
./configure
make 
make install



```

## 启动

``` bash 
/usr/local/nginx/sbin/nginx
# 可以在浏览器中以ip+80端口访问了

```

## 修改配置

``` bash
vim /usr/local/nginx/conf/nginx.conf
# 重启nginx服务
/usr/local/nginx/sbin/nginx -s reload
```

### nginx.conf

``` properties

      upstream www.springbootvuestudy.comcomcom{
        server 192.168.0.159:8080 weight=1;
        server 192.168.0.159:8081 weight=1;
      }
      server {
          listen       80;
          server_name  localhost;
 
          #charset koi8-r;
 
          #access_log  logs/host.access.log  main;
 
          location / {
              proxy_pass http://www.springbootvuestudy.comcomcom;
              proxy_redirect default;
              #root   html;
              #index  index.html index.htm;
          }
      }


```

