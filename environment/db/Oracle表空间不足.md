# [关于oracle表空间不足原因及处理方法](https://www.cnblogs.com/xiaoxiaoliu888/p/9390857.html)

oracle表空间不足，一般有两个原因：

　　　　　　　　　　一，原表空间太小，没有自增长；

　　　　　　　　　　二，表空间已自增长，而且表空间也已足够大，对于这两种原因分别有各自的解决办法。

oracle表空间不足错误代码：ORA-01653: unable to extend table 等；

 

查看表空间使用情况：

```sql
　SELECT tbs 表空间名, 
　　sum(totalM) 总共大小M, 
　　sum(usedM) 已使用空间M, 
　　sum(remainedM) 剩余空间M, 
　　sum(usedM)/sum(totalM)*100 已使用百分比, 
　　sum(remainedM)/sum(totalM)*100 剩余百分比 
　　FROM( 
　　SELECT b.file_id ID, 
　　b.tablespace_name tbs, 
　　b.file_name name, 
　　b.bytes/1024/1024 totalM, 
　　(b.bytes-sum(nvl(a.bytes,0)))/1024/1024 usedM, 
　　sum(nvl(a.bytes,0)/1024/1024) remainedM, 
　　sum(nvl(a.bytes,0)/(b.bytes)*100), 
　　(100 - (sum(nvl(a.bytes,0))/(b.bytes)*100)) 
　　FROM dba_free_space a,dba_data_files b 
　　WHERE a.file_id = b.file_id 
　　GROUP BY b.tablespace_name,b.file_name,b.file_id,b.bytes 
　　ORDER BY b.tablespace_name 
　　) 
　　GROUP BY tbs ;
```



　

 

1、查询当前用户的所属表空间

> select * from user_users;

2、增加表空间有两种方法： 修改数据文件大小， 增加数据文件。

​    1.语法：修改数据文件大小

> alter tablespace 表空间名称

  add datafile 表空间存放路径  size 表空间大小 autoextend on next 增长的大小 maxsize 空间最大值(如果不限制空间最大值就用unlimited)

  例如：

``` plsql
alter tablespace vgsm    add datafile 'c:\oracle\product\10.2.0\oradata\vgsm\vgsm_01.dbf'    size 1024M autoextend on next 50M maxsize unlimited;
```



 

查询表空间详情：

>  select f.* from dba_data_files f where f.tablespace_name='VGSM'

 

  2.增加数据文件：

  语法：

>  alter database  datafile 表空间文件路径 AUTOEXTEND（自动扩展） ON NEXT 表空间满后增加的大小

例如：

>  alter database datafile 'C:\ORACLE\PRODUCT\10.2.0\ORADATA\VGSM\VGSM' AUTOEXTEND ON NEXT 200m

查询表空间详情：

> select f.* from dba_data_files f where f.tablespace_name='VGSM'