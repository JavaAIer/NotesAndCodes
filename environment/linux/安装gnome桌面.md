``` bash
#在官网下载最小化版本centos7并安装到电脑。

#安装GNOME桌面。输入以下命令安装 Gnome 包 
yum groupinstall "GNOME Desktop" "Graphical Administration Tools" 
#结束后运行 startx 可以进入桌面。 
startx

#修改系统的运行级别，以便于开机自动进入图形界面。 
ln -sf /lib/systemd/system/runlevel5.target /etc/systemd/system/default.target
#--------------------- 
#作者：Lubin的编程技术专栏 
#来源：CSDN 
#原文：https://blog.csdn.net/bingbingtea/article/details/79553669 
#版权声明：本文为博主原创文章，转载请附上博文链接！
```



# 


  