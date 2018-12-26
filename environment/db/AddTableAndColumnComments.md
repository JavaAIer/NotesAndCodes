## sql server

```sql
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'表注释', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'表名';
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'列注释', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'表名', @level2type = N'COLUMN', @level2name = N'列名';

--查询表注释 
SELECT
	a.name
   ,CONVERT(NVARCHAR, b.value)
FROM sys.tables a
LEFT  JOIN sys.extended_properties b
	ON a.object_id = b.major_id
	AND b.minor_id=0
WHERE LEN(a.name) - LEN(REPLACE(a.name, '_', '')) = 1
ORDER  BY a.name ;

--生成维护表注释模板
SELECT
	a.name,
	CONVERT(NVARCHAR, b.value),
	'EXECUTE sp_addextendedproperty @name = N''MS_Description'', @value = N''无表注释'', @level0type = N''SCHEMA'', @level0name = N''dbo'', @level1type = N''TABLE'', @level1name = N'''+a.name+''''
FROM sys.tables a
LEFT  JOIN sys.extended_properties b
	ON a.object_id = b.major_id
	AND b.minor_id=0
WHERE LEN(a.name) - LEN(REPLACE(a.name, '_', '')) = 1
ORDER  BY a.name ;

-- 查询列注释
SELECT
	a.name,
	c.name,
	c.column_id,
	CONVERT(NVARCHAR, d.value),
	CONVERT(NVARCHAR, b.value)
FROM sys.tables a
LEFT JOIN sys.columns c 
ON a.object_id=c.object_id
LEFT  JOIN sys.extended_properties b
	ON a.object_id = b.major_id
	AND c.column_id=b.minor_id
LEFT  JOIN sys.extended_properties d
	ON a.object_id = d.major_id
	AND d.minor_id=0
WHERE  LEN(a.name) - LEN(REPLACE(a.name, '_', '')) = 1
ORDER  BY a.name,c.column_id ;
-- 生成维护列注释模板

SELECT
	a.name,
	c.name,
	c.column_id,
	CONVERT(NVARCHAR, d.value),
	CONVERT(NVARCHAR, b.value),
	'EXECUTE sp_addextendedproperty @name = N''MS_Description'', @value = N''列注释'', @level0type = N''SCHEMA'', @level0name = N''dbo'', @level1type = N''TABLE'', @level1name = N'''+a.name+''', @level2type = N''COLUMN'', @level2name = N'''+c.name+''';'
FROM sys.tables a
LEFT JOIN sys.columns c 
ON a.object_id=c.object_id
LEFT  JOIN sys.extended_properties b
	ON a.object_id = b.major_id
	AND c.column_id=b.minor_id
LEFT  JOIN sys.extended_properties d
	ON a.object_id = d.major_id
	AND d.minor_id=0
WHERE LEN(a.name) - LEN(REPLACE(a.name, '_', '')) = 1
AND NOT EXISTS(SELECT * FROM sys.extended_properties bb
	WHERE a.object_id = bb.major_id
	AND c.column_id=bb.minor_id)
ORDER  BY a.name,c.column_id ;
```



### 查询表结构

[SQLServer中查询表结构（表主键 、列说明、列数据类型、所有表名）的Sql语句](https://www.cnblogs.com/xdot/p/7048512.html)

```
SELECT  CASE WHEN col.colorder = 1 THEN obj.name
                  ELSE ''
             END AS 表名,
        col.colorder AS 序号 ,
        col.name AS 列名 ,
        ISNULL(ep.[value], '') AS 列说明 ,
        t.name AS 数据类型 ,
        col.length AS 长度 ,
        ISNULL(COLUMNPROPERTY(col.id, col.name, 'Scale'), 0) AS 小数位数 ,
        CASE WHEN COLUMNPROPERTY(col.id, col.name, 'IsIdentity') = 1 THEN '1'
             ELSE ''
        END AS 标识 ,
        CASE WHEN EXISTS ( SELECT   1
                           FROM     dbo.sysindexes si
                                    INNER JOIN dbo.sysindexkeys sik ON si.id = sik.id
                                                              AND si.indid = sik.indid
                                    INNER JOIN dbo.syscolumns sc ON sc.id = sik.id
                                                              AND sc.colid = sik.colid
                                    INNER JOIN dbo.sysobjects so ON so.name = si.name
                                                              AND so.xtype = 'PK'
                           WHERE    sc.id = col.id
                                    AND sc.colid = col.colid ) THEN '1'
             ELSE ''
        END AS 主键 ,
        CASE WHEN col.isnullable = 1 THEN '1'
             ELSE ''
        END AS 允许空 ,
        ISNULL(comm.text, '') AS 默认值
FROM    dbo.syscolumns col
        LEFT  JOIN dbo.systypes t ON col.xtype = t.xusertype
        inner JOIN dbo.sysobjects obj ON col.id = obj.id
                                         AND obj.xtype = 'U'
                                         AND obj.status >= 0
        LEFT  JOIN dbo.syscomments comm ON col.cdefault = comm.id
        LEFT  JOIN sys.extended_properties ep ON col.id = ep.major_id
                                                      AND col.colid = ep.minor_id
                                                      AND ep.name = 'MS_Description'
        LEFT  JOIN sys.extended_properties epTwo ON obj.id = epTwo.major_id
                                                         AND epTwo.minor_id = 0
                                                         AND epTwo.name = 'MS_Description'
WHERE   obj.name = 'PkAutoInc'--表名
ORDER BY col.colorder ;
```



## mysql




