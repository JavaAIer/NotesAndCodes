先启动mysql服务，启动mysql后，如果想进入mysql的命令行，执行如下命令

[root@izbp163wlhi02tcaxyuxb7z ~]# docker exec -it mysql1 bash //mysql1是我启动的mysql服务的name

root@654c15160c66:/# mysql -uroot -p
Enter password: 
//输入密码即可
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.0.11 MySQL Community Server - GPL

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 

//已经进入命令行模式
--------------------- 
作者：IT云清 
来源：CSDN 
原文：https://blog.csdn.net/weixin_39800144/article/details/80872515 
版权声明：本文为博主原创文章，转载请附上博文链接！