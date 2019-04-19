# [linux下MySQL表名忽略大小写设置](https://www.cnblogs.com/liu-ke/p/4218953.html)

最近公司项目的MySQL数据库要迁移到linux下，部署时日志总是显示报找不到一个表，用MYSQL查看明明有这个表。后来经百度，原来LINUX下的MYSQL默认是区分表名大小写的。

 

用命令查看当前是否区分大小写：

***************************************
mysql> show variables like "%case%";

+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | OFF   | 
| lower_case_table_names | 0     | 
+------------------------+-------+
2 rows in set (0.00 sec)

******************************************

 

lower_case_file_system | OFF         说明当前区分大小写

 

修改方法

1.ROOT登录，vi /etc/my.cnf
2.在[mysqld]下加入一行：lower_case_table_names=1     //（为0时区分）
3.保存退出，重启MySQL。





# [linux 下 设置 MySQL8 表名大小写不敏感方法，解决设置后无法启动 MySQL 服务的问题](<https://blog.csdn.net/czwbig/article/details/84109626>)



在安装完成之后，初始化数据库之前，修改 my.cnf
打开mysql配置文件
vim /etc/my.cnf
在尾部追加一行
lower_case_table_names=1
并保存，然后再初始化数据库。
重启mysql，
systemctl restart mysqld.service
如果这个操作是初始化数据库之后，也就是安装后运行过服务，那就可能会出错。
错误类似于Job for mysqld.service failed because the control process exited with error...
然后就无法启动 mysql 服务了,除非打开 vim /etc/my.cnf把追加的lower_case_table_names=1删除掉。

我在网上找了好久，暂时没找到比较好的解决方法，而 MySQL5 就没有这个问题。

#####最后我的解决方法如下：
如果你不在意数据的话直接删除数据

停止MySQL
systemctl stop mysqld.service
删除 MySQL的数据 /var/lib/mysql
rm -rf /var/lib/mysql
再按照上面的方法进行一遍操作即可。
--------------------- 
作者：czwbig 
来源：CSDN 
原文：https://blog.csdn.net/czwbig/article/details/84109626 
版权声明：本文为博主原创文章，转载请附上博文链接！