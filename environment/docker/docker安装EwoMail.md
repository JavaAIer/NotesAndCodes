``` bash
docker search EwoMail
docker pull bestwu/ewomail
# 创建容器,见下面
docker start ewomail

# 管理域名绑定
#进入虚拟机
docker exec -it ewomail /bin/bash 
#在/etc/hosts中已有域名指向
172.17.0.2      mail.ewomail.com mail




# linux 配置
docker run  -d -h mail.ewomail.com --restart=always \
  -p 25:25 \
  -p 109:109 \
  -p 110:110 \
  -p 143:143 \
  -p 465:465 \
  -p 587:587 \
  -p 993:993 \
  -p 995:995  \
  -p 80:80 \
  -p 8080:8080 \
  -v `pwd`/mysql/:/ewomail/mysql/data/ \
  -v `pwd`/vmail/:/ewomail/mail/ \
  -v `pwd`/ssl/certs/:/etc/ssl/certs/ \
  -v `pwd`/ssl/private/:/etc/ssl/private/ \
  -v `pwd`/rainloop:/ewomail/www/rainloop/data \
  -v `pwd`/ssl/dkim/:/ewomail/dkim/ \
  --name ewomail bestwu/ewomailserver
  
  

# WINDOWS 设置 要把下面的文件夹都建立好先
docker run  -d -h www.testmail678.com --restart=always   -p 25:25   -p 109:109   -p 110:110   -p 143:143   -p 465:465   -p 587:587  -p 10024:10024  -p 993:993   -p 995:995    -p 8000:80   -p 8888:8080   -v /d/dockerfile/ewomail/mysql/:/ewomail/mysql/data/   -v /d/dockerfile/ewomail/vmail/:/ewomail/mail/   -v /d/dockerfile/ewomail/ssl/certs/:/etc/ssl/certs/   -v /d/dockerfile/ewomail/ssl/private/:/etc/ssl/private/   -v /d/dockerfile/ewomail/rainloop:/ewomail/www/rainloop/data   -v /d/dockerfile/ewomail/ssl/dkim/:/ewomail/dkim/   --name ewomail bestwu/ewomail
```

``` bash
# 邮箱管理后台http://localhost:8080   账号 admin 密码 ewomail123
http://localhost:8888 admin ewomail123
# Rainloop 管理端 http://localhost/?admin  账号密码在邮箱管理后台添加设置
http://localhost:8000/?admin
# Rainloop 用户端 http://localhost 账号密码在邮箱管理后台添加设置

# 默认smtp地址 stmp.ewomail.com
# 默认imap地址 imap.ewomail.com

mail.testmail678.com
stmp.testmail678.com
imap.testmail678.com
```





https://blog.csdn.net/whatday/article/details/84550217

https://blog.csdn.net/orchidofocean/article/details/82917023