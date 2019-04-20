``` bash
# 不显示不保存输出
nohup java -jar c06s03session.jar --server.port=8080  >/dev/null 2>&1 &
nohup java -jar c06s03session.jar --server.port=8081  >/dev/null 2>&1 &
# 不显示输出，保存输出到log8081.log
nohup java -jar c06s03session.jar --server.port=8081  >log8081.log 2>&1 &
nohup java -jar c06s03session.jar --server.port=8080  >log8080.log 2>&1 &

# centos7 下编码错误



```

# 乱码问题

## 正解 [centos里面中文是小方块的解决方法  ](<https://blog.csdn.net/heibaiyijing/article/details/8208800>)

[真正的完美解决centos7.5的图形界面中文乱码的方法](<https://blog.csdn.net/baidu_38635190/article/details/88922732>)

``` bash
yum install kde-l10n-Chinese
yum reinstall glibc-common
yum groupinstall "Chinese Support"
yum -y install fonts-chinese
yum -y install fonts-ISO8859-2
yum install kde-l10n-Chinese
yum install chkfontpath-2.0.3-alt1.x86_64.rpm
yum install fonts-ISO8859-2-75dpi-1.0-17.1.noarch.rpm
yum install fonts-chinese-3.02-12.el5.noarch.rpm
yum install "@chinese-support"
yum install http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
 yum update
 yum install freetype-infinality
 vim /etc/profile.d/infinality-settings.sh
cd /usr/share/fonts
fc-cache -fv
```





## 其他问题：

解决CentOS7中文语言乱码（包括Tomcat日志中文乱码）问题 <https://blog.csdn.net/XZR_CSDN/article/details/74912346>

``` bash
# 编码（应该是windows下的）
chcp 65001
java -Dfile.encoding=utf-8 -jar XXX.jar
```

[解决 Centos7 下中文显示乱码  ](https://blog.csdn.net/jisu30miao1225/article/details/80519368)

``` bash
 locale -a | grep zh_CN* 
 yum install kde-l10n-Chinese 
 vi /etc/locale.conf
 source /etc/locale.conf
 vi /etc/profile.d/lang.sh
 
 locale 
 #字体问题如下
 fc-match
 mkdir /usr/local/font
 mkdir /usr/local/font/default
 find / -name wqy-zenhei.ttc
 cp /usr/share/fonts/wqy-zenhei/wqy-zenhei.ttc /usr/local/font/default
 cd /usr/local/font/default
 ls
 
cd /usr/share/fonts/vista/
sudo mkfontscale
sudo mkfontdir
sudo fc-cache -fv


 fc-cache
 fc-match 
 mkfontscale
 mkfontdir
 fc-cache -fv
 
 vim /etc/locale.conf
```

``` bash
# /etc/locale.conf
LANG="zh_CN.UTF-8" 
SYSFONT="latarcyrheb-sun16" 
SUPPORTED="zh_CN.UTF-8:zh_CN:zh"
```

 <https://blog.csdn.net/hpf247/article/details/79981803>

``` bash
yum install kde-l10n-Chinese
vim /etc/sysconfig/i18n
source /etc/sysconfig/i18n
```

``` bash
# /etc/sysconfig/i18n

LANG="zh_CN.GB18030"
LANGUAGE="zh_CN.UTF-8"
LC_CTYPE="zh_CN.GB18030"
LC_TIME="en_US.UTF-8"

```

