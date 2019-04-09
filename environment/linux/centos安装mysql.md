# CentOS7 安装 mysql8

<https://blog.csdn.net/managementandjava/article/details/80039650>

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

```

