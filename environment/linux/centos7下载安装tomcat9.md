[centos7 下载安装tomcat9](<https://blog.csdn.net/taozibug/article/details/80269008>)



```bash
mkdir /usr/local/tomcat
cd /usr/local/tomcat
wget http://mirrors.shu.edu.cn/apache/tomcat/tomcat-9/v9.0.17/bin/apache-tomcat-9.0.17.tar.gz
tar -zxvf apache-tomcat-9.0.17.tar.gz
mv apache-tomcat-9.0.17 tomcat_8080
cd tomcat_8080/bin
vi setenv.sh
chmod +x setenv.sh

# 创建 tomcat 服务
cd /usr/lib/systemd/system
vi tomcat.service

#配置catalina home ，添加两个export 
vi /etc/profile
export CATALINA_HOME=/usr/local/tomcat/tomcat_8080
export PATH=$TOMCAT_HOME/bin:$PATH

# 防火墙

#关闭防火墙
systemctl stop firewalld.service   
# 进入tomcat根目录开启tomcat
cd /usr/local/tomcat/tomcat_8080/bin 
./startup.sh  


#配置开机启动 
systemctl enable tomcat
#启动tomcat
systemctl start tomcat
#停止tomcat
systemctl stop tomcat
#重启tomcat
systemctl restart tomcat


```

## setenv.sh

``` sh
#add tomcat pid
CATALINA_PID="$CATALINA_BASE/tomcat.pid"
#add java opts
JAVA_OPTS="-server -XX:PermSize=256M -XX:MaxPermSize=1024m -Xms512M -Xmx1024M -XX:MaxNewSize=256m"
```

## tomcat.service

``` properties
[Unit]
Description=Tomcat
After=syslog.target network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/tomcat/tomcat_8080/tomcat.pid
ExecStart=/usr/local/tomcat/tomcat_8080/bin/startup.sh
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

## 修改端口

```bash

cd /usr/local/tomcat/tomcat_8080/conf
//输入指令打开文件
vi server.xml
//输入 /8080 并回车搜索8080 字符串，找到如下两处地方
<<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <!-- A "Connector" using the shared thread pool-->
    <!--
    <Connector executor="tomcatThreadPool"
               port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
//按“i”进入编辑模式，将port="8080"改成port="80"
<Connector port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <!-- A "Connector" using the shared thread pool-->
    <!--
    <Connector executor="tomcatThreadPool"
               port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />

```

## 修改gui-manager用户

```bash
vim /usr/local/tomcat/tomcat_8080/conf/tomcat-users.xml
cd /usr/local/tomcat/tomcat_8080/webapps/manager/META-INF/ 
vim /usr/local/tomcat/tomcat_8080/webapps/manager/META-INF/context.xml
```

``` xml
<tomcat-users>
    <role rolename="manager"/>     
    <role rolename="admin"/> 
    <role rolename="admin-gui"/>
    <role rolename="manager-gui"/>
    <user username="xxx" password="***" roles="admin-gui,manager-gui"/>
</tomcat-users>


```

``` xml
<Context antiResourceLocking="false" privileged="true" >
 <!-- <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />
  <Manager sessionAttributeValueClassNameFilter="java\.lang\.(?:Boolean|Integer|Long|Number|String)|org\.apache\.catalina\.filters\.CsrfPreventionFilter\$LruCache(?:\$1)?|java\.util\.(?:Linked)?HashMap"/>
-->
</Context>



```



-------------------------------引用原博客----------------------------------------------

tomcat 不多解释，直接开车；

1、官网下载安装包

将tomcat 安装到  /usr/local/tomcat/   目录下

cd /usr/local/

mkdir tomcat/

cd tomcat/



wget http://archive.apache.org/dist/tomcat/tomcat-9/v9.0.0.M18/bin/apache-tomcat-9.0.0.M18.tar.gz



2.解压 ，执行以下命令

tar -zxvf apache-tomcat-9.0.0.M18.tar.gz



3.重命名目录

mv apache-tomcat-9.0.0.M18  tomcat_8080 (/path（目标路径）)

4.配置自启动，切换至Tomcat的bin目录执行vi setenv.sh，并按i进入编辑模式，拷贝以下代码粘贴

#add tomcat pid

CATALINA_PID="$CATALINA_BASE/tomcat.pid"

#add java opts

JAVA_OPTS="-server -XX:PermSize=256M -XX:MaxPermSize=1024m -Xms512M -Xmx1024M -XX:MaxNewSize=256m"



之后按esc键，在按shift+：（左下角出现会出现“：”），然后输入wq保存退出，

最后执行  chmod +x setenv.sh  确保文件setenv.sh可执行。

5.配置service 执行cd /usr/lib/systemd/system切换至目录 并执行vi tomcat.service（也可以直接vi /usr/lib/systemd/system/tomcat.service）,

拷贝以下代码粘贴（注意将第6和7行的Tomcat路径/usr/local/apache-tomcat-9.0.0.M18 换成你自己的Tomcat的绝对路径）



[Unit]
Description=Tomcat
After=syslog.target network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/tomcat/tomcat_8080/tomcat.pid
ExecStart=/usr/local/tomcat/tomcat_8080/bin/startup.sh
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true
[Install]

WantedBy=multi-user.target



开机至开机启动

//配置开机启动 systemctl enable tomcat

//启动tomcatsystemctl start tomcat

//停止tomcatsystemctl stop tomcat

//重启tomcatsystemctl restart tomcat



配置完成，建议重启服务器，即输入命令 reboot（或者sudo reboot）即可在浏览器里输入你的服务器地址+8080端口

（例如：192.168.1.161：8080），如果看到小猫咪表示成功，否则请检查以上所有步骤是否全都执行正确了。

配置环境变量

vi /etc/profile

增加

export CATALINA_HOME=/usr/local/tomcat/tomcat_8080

export PATH=$TOMCAT_HOME/bin:$PATH



如果不能访问，可能是因为防火墙

systemctl stop firewalld.service   关闭防火墙

cd /usr/local/tomcat/tomcat_8080/bin 进入tomcat根目录

./startup.sh  开启tomcat


6.修改端口,切换至Tomcat conf目录

cd /usr/local/tomcat/tomcat_8080/conf
//输入指令打开文件
vi server.xml
//输入 /8080 并回车搜索8080 字符串，找到如下两处地方
<<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <!-- A "Connector" using the shared thread pool-->
    <!--
    <Connector executor="tomcatThreadPool"
               port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
//按“i”进入编辑模式，将port="8080"改成port="80"
<Connector port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <!-- A "Connector" using the shared thread pool-->
    <!--
    <Connector executor="tomcatThreadPool"
               port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
之后按esc键，在按shift+：（左下角出现会出现“：”），然后输入wq保存退出。


7.配置gui-manager项目部署方式，切换至Tomcat conf目录，输入vi tomcat-users.xml打开文件，按“i”进入编辑模式，拷贝以下代码放置</tomcat-users>标签之间(注意将password和username换成你自己的)

 <role rolename="manager"/>     
  <role rolename="admin"/> 
  <role rolename="admin-gui"/>
  <role rolename="manager-gui"/>
  <user username="xxx" password="***" roles="admin-gui,manager-gui"/>
1
2
3
4
5
之后按esc键，在按shift+：（左下角出现会出现“：”），然后输入wq保存退出。
输入 cd webapps/manager/META-INF/ 切换至目录，输入vi context.xml打开文件，按i进入编辑模式，将</Context> 标签下的<Valve> 标签注释掉

<Context antiResourceLocking="false" privileged="true" >
<!--注释掉此标签
 <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />
-->
</Context>
1
2
3
4
5
6
之后按esc键，在按shift+：（左下角出现会出现“：”），然后输入wq保存退出。

8.重启Tomcat

systemctl restart tomcat
1
浏览器中直接输入你的服务器地址，例如192.168.1.161（不用输端口号了），看见小猫咪，点击manager 输入账号密码即可部署你的项目了。

浏览器中直接输入你的服务器地址，例如192.168.1.161（不用输端口号了），看见小猫咪，点击manager 输入账号密码即可部署你的项目了。

tomcat 安装及常见问题 参考：
http://blog.csdn.net/zzpzheng/article/details/48864129
http://blog.csdn.net/guochunyang/article/details/51820066
http://stackoverflow.com/questions/10268583/downloading-java-jdk-on-linux-via-wget-is-shown-license-page-instead

centos7 tomact9详情安装配置教程
--------------------- 
作者：taoziBug 
来源：CSDN 
原文：https://blog.csdn.net/taozibug/article/details/80269008 
版权声明：本文为博主原创文章，转载请附上博文链接！