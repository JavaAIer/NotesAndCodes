``` sql 

--SQL Server:
update 表A set a字段=表B.a字段
from 表B inner join 表A on 表A.主键=表B.主键
 
--MySQL:
update 表A inner join 表B on 表A.主键=表B.主键 set a字段=表B.a字段

``` 