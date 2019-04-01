环境设置：

因要考虑到两个环境：公司电脑和家里电脑

所以环境有点特殊：虚拟机和虚拟机上的docker不能拷走。

参考：[Centos7上安装docker](https://www.cnblogs.com/yufeng218/p/8370670.html)



| 环境   | 配置                                                  |
| ------ | ----------------------------------------------------- |
| centos | root/root,配置host为:www.springbootvuestudy.comcomcom |
| mysql  | root 123456                                           |
|        |                                                       |

mysql  [Docker 上安装、启动 MySQL （图解）](https://blog.csdn.net/jiangyu1013/article/details/79958410)

```bash
 docker search mysql
 docker pull mysql
 docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456  -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci 
 # mkdir -p ~/mysql/data ~/mysql/logs ~/mysql/conf
 # docker run -p 3306:3306 --name mysql -v $PWD/mysql/conf/my.cnf:/etc/mysql/my.cnf -v $PWD/mysql/logs:/logs -v $PWD/mysql/data:/mysql_data -e MYSQL_ROOT_PASSWORD=123456   -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
 
 docker exec -it mysql bash
 

 

```

redis 

```bash
docker pull redis
#docker run -d -p 6379:6379 --name redis redis
docker run --name redis -p 6379:6379 -d redis --requirepass "123@456"

docker exec -it redis bash
```

redis 集群

``` bash

```

