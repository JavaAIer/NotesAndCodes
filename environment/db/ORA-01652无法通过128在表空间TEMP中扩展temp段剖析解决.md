[ORA-01652 无法通过128 (在表空间 TEMP中)扩展temp段 剖析解决](<https://blog.csdn.net/mchdba/article/details/51685173>)

1，同事说执行sql报错
同事在plsql里面执行sql报错，报错信息：ora-01652 无法通过128 (在表空间 TEMP中)扩展temp段，如下图所示：

 

 

2，查看报错sql语句
Sql比较长，而且无法扩展temp字段，那么基本推断可能有如下2种情况：

（1）oracle的temp临时表空间太小了；

（2）一个性能非常差的笛卡尔积的带全表扫描的sql占用的资源超过了temp的表空间大小。

先看执行的sql语句，sql比较长，所以这种属于（1）（2）的结合情况了，sql如下：

> 省略了一段惨不忍睹，惨绝人寰的sql，有兴趣的可以点到原文去看

3，查看表空间使用率
查看表空间使用率的sql语句：

select * from (

Select a.tablespace_name,

to_char(a.bytes/1024/1024,'99,999.999') total_bytes,

to_char(b.bytes/1024/1024,'99,999.999') free_bytes,

to_char(a.bytes/1024/1024 - b.bytes/1024/1024,'99,999.999') use_bytes,

to_char((1 - b.bytes/a.bytes)*100,'99.99') || '%'use

from (select tablespace_name,

sum(bytes) bytes

from dba_data_files

groupby tablespace_name) a,

(select tablespace_name,

sum(bytes) bytes

from dba_free_space

groupby tablespace_name) b

where a.tablespace_name = b.tablespace_name

unionall

select c.tablespace_name,

to_char(c.bytes/1024/1024,'99,999.999') total_bytes,

to_char( (c.bytes-d.bytes_used)/1024/1024,'99,999.999') free_bytes,

to_char(d.bytes_used/1024/1024,'99,999.999') use_bytes,

to_char(d.bytes_used*100/c.bytes,'99.99') || '%'use

from

(select tablespace_name,sum(bytes) bytes

from dba_temp_files groupby tablespace_name) c,

(select tablespace_name,sum(bytes_cached) bytes_used

from v$temp_extent_pool groupby tablespace_name) d

where c.tablespace_name = d.tablespace_name

)

orderby tablespace_name

 

查看执行结果中TEMP的使用率已经到了99.58%了，报错的原因找到了，临时表空间被撑满了，如下图所示，所以需要扩容了：

 

 

4，查看普通数据文件是否扩展
select d.file_name,d.tablespace_name,d.autoextensible from dba_data_files d                                                                             

 

 

查看临时表空间是否可以扩展：

>  select d.file_name,d.tablespace_name,d.autoextensible from dba_temp_files d;                                                                              

 

 

看到，几个临时表空间的数据文件都不可以扩容，所以这也是报错的原因之一：

 

 

5，增加数据文件解决问题
问了同事，写这个sql语句的小伙伴已经离职半年了，所以无人懂这个复杂的sql的业务逻辑了，暂时优化sql的建议是无法去做了。采用另外一种发难，直接添加一个新的临时表空间的数据文件，设置大一些，设置成4g：

 

<-> 执行添加临时表空间的数据文件命令：

ALTERTABLESPACE TEMP ADDTEMPFILE'/home/oradata/powerdes/temp05.dbf'   SIZE4G

 AUTOEXTEND ON

 NEXT 128M;

 

然后执行那条复杂的sql语句，就不会报错了，执行速度也很快，大概5秒左右执行完毕。

 

6，临时表空间相关
查看使用消耗临时表空间资源比较多的sql语句：

SELECT   se.username,

         se.sid,
    
         su.extents,
    
         su.blocks * to_number(rtrim(p.value)) asSpace,
    
         tablespace,
    
         segtype,
    
         sql_text

FROM v$sort_usage su, v$parameter p, v$session se, v$sql s                                                                        

   WHERE p.name = 'db_block_size'

     AND su.session_addr = se.saddr
    
     AND s.hash_value = su.sqlhash
    
     AND s.address = su.sqladdr

ORDERBY se.username, se.sid;

 

 

增加数据文件

当临时表空间太小时，就需要扩展临时表空间（添加数据文件、增大数据文件、设置文件自动扩展）；有时候需要将临时数据文件分布到不同的磁盘分区中，提升IO性能，也需要通过删除、增加临时表空间数据文件。

ALTERTABLESPACE TEMP

 ADDTEMPFILE'/home/oradata/powerdes/temp05.dbf'

 SIZE4G

 AUTOEXTENDON

 NEXT128M;

 

 

 

删除数据文件

例如，我想删除临时表空间下的某个文件，那么我们有两种方式删除临时表空间的数据文件。

方法1：

SQL> altertablespace temp droptempfile'/home/oradata/powerdes/temp03.dbf' ;                     

 

Tablespace altered.

 

SQL>

 

# 这个方法会删除物理文件

[oracle@pldb1 ~]$ ll /home/oradata/powerdes/temp03.dbf

ls: cannot access /home/oradata/powerdes/temp03.dbf: No such file or directory

[oracle@pldb1 ~]$

 

方法2：

SQL> alterdatabasetempfile'/home/oradata/powerdes/temp04.dbf'dropincludingdatafiles;    

 

Database altered.

 

SQL>

 

 

注意：删除临时表空间的临时数据文件时，不需要指定INCLUDING DATAFILES 选项也会真正删除物理文件，否则需要手工删除物理文件。

 

调整文件大小

如下例子，需要将临时数据文件从128M大小调整为256M

SQL> alterdatabasetempfile'/home/oradata/powerdes/temp02.dbf'resize256M;

 

Database altered.

 

SQL>

 

 

文件脱机联机

 

-- 脱机

alterdatabasetempfile'/home/oradata/powerdes/temp02.dbf'offline;

 

-- 联机

alterdatabasetempfile'/home/oradata/powerdes/temp02.dbf'online;

 

收缩临时表空间

排序等操作使用的临时段，使用完成后会被标记为空闲，表示可以重用，占用的空间不会立即释放，有时候临时表空间会变得非常大，此时可以通过收缩临时表空间来释放没有使用的空间。收缩临时表空间是ORACLE 11g新增的功能。

SQL> ALTERTABLESPACE TEMP SHRINKSPACEKEEP8G;

 

SQL> ALTERTABLESPACE TEMP SHRINKTEMPFILE'/home/oradata/powerdes/temp05.dbf'

 

 

参考文档：

http://docs.oracle.com/cd/B28359_01/server.111/b28310/tspaces002.htm#i1013552
--------------------- 
作者：忆平奇 
来源：CSDN 
原文：https://blog.csdn.net/mchdba/article/details/51685173 
版权声明：本文为博主原创文章，转载请附上博文链接！