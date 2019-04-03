Oracle查询最近执行Sql语句

```sql
-- select * from v$sql where module !='xxx.exe' and module !='yyy.exe' and first_load_time > '2019-04-02/09:00:20'  and  sql_text like 'SELECT%';
select * from v$sql where module ='w3wp.exe' and first_load_time > '2019-04-02/09:00:20'  and  sql_text like 'SELECT%' and sql_text like '%SMS%';
```

