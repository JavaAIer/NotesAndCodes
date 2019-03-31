# [Docker MySQL备份](https://www.cnblogs.com/xuezhigu/p/6595617.html)



建立备份的MySQL容器

```
`docker run --name mysql-back -e MYSQL_ROOT_PASSWORD=root -v /srv/mysql/backup:/mysql/backup -d mysql:5.7.17`
```

 

查看虚拟网络，其中 bridge 是 Docker 默认使用的虚拟网络：

```
`docker network inspect bridge`
```

　　

在返回的结果中，找到 Containers 部分。内容如下：

```
`"Containers"``: {``  ``"asdf2334a"``: {``    ``"Name"``: ``"mysql-a"``    ``"EndpointID"``: ``"sadfas234"``    ``"MacAddress"``: ``"...."``    ``"IPv4Address"``: ``"192.168.0.2"``    ``"IPv6Address"``: ``""``  ``}` `}`
```

Containers 列出了所有使用 bridge 网络的容器。因为我给 MySQL 服务器容器起名为 mysql-a，所以我查看Name 为 mysql-a 的配置。IPv4Address表示容器mysql-a的虚拟IP是 192.168.0.2 。记录下这个IP 。

进入容器的 bash ：

```
`docker ``exec` `-it mysql-b bash`
```

安装VIM和CRON定时任务：

```
`apt-get update && apt-get install vim``apt-get update && apt-get install cron`
```

生成一个shell脚本文件来进行备份。

```
`cat >/zc/mysql/backup.sh <<EOF``#!/bin/sh``zcDATE=\$(``date` `+%Y%m%d)``mkdir` `/zc/mysql/backup/\``$zcDATE``mysqldump -h ``'192.168.0.2'` `-uroot -p``'123456'` `--databases db1 > /zc/mysql/backup/\``$zcDATE``/db1.sql``mysqldump -h ``'192.168.0.2'` `-uroot -p``'123456'` `--databases db2 > /zc/mysql/backup/\``$zcDATE``/db2.sql``EOF`
```

MySQL上存在两个[数据库](http://lib.csdn.net/base/mysql)，名称分别是 db1 和 db2，利用这种方式在硬盘上备份数据。-h表示远程的服务器IP。-u 和 -p 分别是远程服务器的用户名和密码。这里不建议使用 mysqldump 的 –all-database 选项。因为该选项会把远程MySQL里的系统数据库也备份下来，包括 root 用户的密码等内容。如果你要把导出的内容导入到别的机器上，这些系统设置（比如用户名和密码）会覆盖你的机器上原来的设置。

设置定时任务的启动时间：

```
`crontab -e``0 23 * * * sh /zc/mysql/backup.sh`
```

启动定时任务

```
`service cron start`
```