# CentOS7 安装 mysql8

[CentOS7 安装 mysql8](<https://blog.csdn.net/managementandjava/article/details/80039650>)

[centos7 mysql数据库安装和配置](https://www.cnblogs.com/starof/p/4680083.html)

[CentOS 7 安装MySQL 7 并设置 utf8mb4  ](<https://blog.csdn.net/u011389515/article/details/80000352>)

``` bash
#登录mysql
mysql -u username -p
 
#退出mysql 
quit
 
#启动mysql
systemctl start mysqld.service
 
#结束
systemctl stop mysqld.service
 
#重启
systemctl restart mysqld.service
 
#开机自启
systemctl enable mysqld.service
 
#查看mysql版本
select version();

# 设置可以连接Mysql的ip地址
GRANT ALL PRIVILEGES ON   *.*   TO   root@'192.168.204.%' IDENTIFIED   BY   '123'   WITH   GRANT   OPTION;  
flush privileges
```





``` bash
rpm -pa | grep mysql
# 如果找到了历史版本，使用下面语句删掉
yum remove mysql-xxx-xxx-

# 查找mysql配置文件
find / -name mysql

# 查找mariaDB
rpm -pa | grep mariadb
rpm -e mariadb-libs-5.5.56-2.el7.x86_64

```

``` bash
cd /usr/local
mkdir mysql8
cd mysql8
wget https://repo.mysql.com//mysql80-community-release-el7-2.noarch.rpm
# 也可以在客户机下载后，用Putty上传：
# D:\Putty>pscp F:\mysql80-community-release-el7-1.noarch.rpm root@192.168.145.136:/usr/local/mysql/

# 更新yum缓存 
rpm -ivh mysql80-community-release-el7-2.noarch.rpm
# 执行结果：
# 会在/etc/yum.repos.d/目录下生成两个repo文件mysql-community.repo mysql-community-source.repo

cd /etc/yum.repos.d/
ls
# 更新yum
yum clean all
yum makecache


```

``` bash
# 查看 mysql 版本
yum repolist all | grep mysql
# yum -y install yum-utils
yum-config-manager --disable mysql80-community
yum-config-manager --enable mysql57-community


yum install mysql-community-server

```

``` bash
systemctl start mysqld.service
cat /var/log/mysqld.log | grep password
mysql -u root -p 
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';
systemctl enable mysqld.service
systemctl start mysqld.service
```

``` bash
vim /etc/my.cnf

[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'


systemctl restart mysqld

SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';


mysql> SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
+--------------------------+--------------------+
| Variable_name            | Value              |
+--------------------------+--------------------+
| character_set_client     | utf8mb4            |
| character_set_connection | utf8mb4            |
| character_set_database   | utf8mb4            |
| character_set_filesystem | binary             |
| character_set_results    | utf8mb4            |
| character_set_server     | utf8mb4            |
| character_set_system     | utf8               |
| collation_connection     | utf8mb4_unicode_ci |
| collation_database       | utf8mb4_unicode_ci |
| collation_server         | utf8mb4_unicode_ci |
+--------------------------+--------------------+
10 rows in set (0.00 sec)

mysql>

```

[mysql表名忽略大小写问题记录](https://www.cnblogs.com/kevingrace/p/6150748.html)

```bash
lower_case_table_names = 0 
mysql> show variables like "%case%";
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | ON    |
| lower_case_table_names | 0     |
+------------------------+-------+
2 rows in set (0.00 sec)

lower_case_table_names = 1 

mysql> show variables like "%case%";
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | OFF   |
| lower_case_table_names | 1     |
+------------------------+-------+
2 rows in set (0.00 sec)
```

## mysql 允许其他电脑登录 

[设置mysql允许外部IP连接的解决方法及遇到的坑说明  ](<https://blog.csdn.net/weixin_42392874/article/details/80584624>)

``` bash
netstat -an | grep LISTEN

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'newpwd' WITH GRANT OPTION; 
flush privileges; 

use mysql ;
select user,host from user;
```

