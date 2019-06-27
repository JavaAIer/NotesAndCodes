centos mysql 备份

1、修改my.cnf

``` properties
[mysqld]
basedir=/usr/local/mysql/
datadir=/usr/local/mysql/data
socket=/tmp/mysql.sock
user=mysql
symbolic-links=0
lower_case_table_names=1
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
max_allowed_packet=16M

[client]
port=3306
host = localhost
user = root
password = 'mysqlmima'

[mysqld_safe]
log-error=/usr/local/mysql/log/mysqld.log

```

2、创建备份脚本

```bash
#!/bin/bash
DATE=`date +%Y%m%d%H%M`                #every minute
DATABASE=dbname                        #database name
DB_USERNAME=root                       #database username
DB_PASSWORD="mysqlmima"                #database password
BACKUP_PATH=/backups                   #backup path

#backup command

# 语句会报错【mysqldump: [Warning] Using a password on the command line interface can be insecure.】
#/usr/local/mysql/bin/mysqldump -u$DB_USERNAME -p$DB_PASSWORD -h 127.0.0.1 -R --opt $DATABASE | gzip > ${BACKUP_PATH}\/${DATABASE}_${DATE}.sql.gz
/usr/local/mysql/bin/mysqldump --defaults-extra-file=/etc/my.cnf -R --opt $DATABASE | gzip > ${BACKUP_PATH}\/${DATABASE}_${DATE}.sql.gz

#just backup the latest 7 days

find ${BACKUP_PATH} -mtime +7 -name "${DATABASE}_*.sql.gz" -exec rm -f {} \;

```

3、linux系统的操作

``` bash
mkdir /backups

chmod 777 /backups

vim database_backup_shell.sh
# 粘贴第二个步骤中的内容到编辑器中，稍做修改
chmod +x database_backup_shell.sh

# 编写定时任务
crontab -e
# 输入以下内容
00 3 * * * /root/database_backup_shell.sh

# 重启定时任务服务，以生效
systemctl restart crond
systemctl enable crond

```



参考内容：

[centos7-每天定时备份 mysql数据库](<http://www.cnblogs.com/zuidongfeng/p/9416226.html>)

[/etc/crontab文件和crontab -e命令区别](<https://www.cnblogs.com/xd502djj/p/4292781.html>)

[Centos下_MysqL5.7在使用mysqldump命令备份数据库报错：mysqldump: [Warning] Using a password on the command line interface can be insecure.](<https://www.cnblogs.com/wt645631686/p/7832993.html>)