[linux下JDK的安装](https://www.cnblogs.com/qingchenfood/p/10074017.html)

### 1.下载JDK8

> 登录网址：
>
> <http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html>
>
> 选择对应jdk版本下载。（可在Windows下下载完成后，通过文件夹共享到Linux上）

> ![img](https://img2018.cnblogs.com/blog/1533312/201812/1533312-20181205224650967-528154432.jpg)

> 

> ![img](https://img2018.cnblogs.com/blog/1533312/201812/1533312-20181205224651329-1148873714.jpg)

### 2.登录Linux切换到root用户

> su root 获取root用户权限，当前工作目录不变(需要root密码)
>
> 或sudo -i 不需要root密码直接切换成root（需要当前用户密码）

### 3.在usr目录下建立java安装目录

> cd /opt
>
> mkdir java

### 4.将jdk-8u201-linux-x64.tar.gz拷贝到java目录

> cp /opt/softs/jdk-8u201-linux-x64.tar.gz /opt/java/

### 5.解压jdk到当前目录

> tar -zxvf jdk-8u201-linux-x64.tar.gz

​         得到文件夹 jdk1.8.0_201

> ![img](https://img2018.cnblogs.com/blog/1533312/201812/1533312-20181205224651589-1380078703.jpg)

### 6.建立一个链接以节省目录长度

> ln -s /opt/java/jdk1.8.0_201/ /opt/jdk

> ![img](https://img2018.cnblogs.com/blog/1533312/201812/1533312-20181205224651874-1956640532.jpg)

### 7.编辑配置文件，配置环境变量

> vim /etc/profile
>
> 添加如下内容：JAVA_HOME根据实际目录来
>
> export JAVA_HOME=/opt/java/jdk1.8.0_201
>
> export CLASSPATH=$JAVA_HOME/lib/
>
> export PATH=$PATH:$JAVA_HOME/bin
>
> export PATH JAVA_HOME CLASSPATH

> ![img](https://img2018.cnblogs.com/blog/1533312/201812/1533312-20181205224652143-876040640.jpg)

### 8.重启机器或执行命令

> source /etc/profile
>
> sudo shutdown -r now

### 9.查看安装情况

> java –version

> ![img](https://img2018.cnblogs.com/blog/1533312/201812/1533312-20181205224652489-1432297822.jpg)