# 环境设置：

因要考虑到两个环境：公司电脑和家里电脑

所以环境有点特殊：虚拟机和虚拟机上的docker不能拷走。

参考：[Centos7上安装docker](https://www.cnblogs.com/yufeng218/p/8370670.html)



| 环境          | 配置                                                  |
| ------------- | ----------------------------------------------------- |
| centos        | root/root,配置host为:www.springbootvuestudy.comcomcom |
| mysql         | root 123456                                           |
| redis         | 123@456                                               |
| redis cluster | 8001~8008                                             |

## mysql  [Docker 上安装、启动 MySQL （图解）](https://blog.csdn.net/jiangyu1013/article/details/79958410)

```bash
 docker search mysql
 docker pull mysql
 docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456  -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci 
 # mkdir -p ~/mysql/data ~/mysql/logs ~/mysql/conf
 # docker run -p 3306:3306 --name mysql -v $PWD/mysql/conf/my.cnf:/etc/mysql/my.cnf -v $PWD/mysql/logs:/logs -v $PWD/mysql/data:/mysql_data -e MYSQL_ROOT_PASSWORD=123456   -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
 
 docker exec -it mysql bash
 

 

```

## redis 

```bash
docker pull redis
#docker run -d -p 6379:6379 --name redis redis
docker run --name redis -p 6379:6379 -d redis --requirepass "123@456"

docker exec -it redis bash
```

## redis cluster

 [docker redis 集群（cluster）搭建](https://my.oschina.net/dslcode/blog/1936656)

[docker redis4.0 集群（cluster）搭建](https://www.cnblogs.com/lianggp/p/8136222.html)

[极简 docker 环境 redis 5 安装 redis-cluster 集群（不需要Ruby）](<https://blog.csdn.net/adolph586/article/details/85340764>)

[RedisCluster实战5使用rediscli安装](https://carlosfu.iteye.com/blog/2242630)

[Redis 3.2.1集群搭建](https://www.cnblogs.com/yuanermen/p/5717885.html)

``` bash
# 下载ruby的镜像，作为redis cluster镜像的基础
docker pull ruby 
# 更正 docker pull ruby:2.5
docker pull ruby:2.5


# 创建redis cluster容器的配置文件
mkdir /home/redis-cluster
cd /home/redis-cluster
touch redis-cluster.tmpl
vi redis-cluster.tmpl
cat /home/redis-cluster/redis-cluster.tmpl

# 创建自定义的network 
docker network create redis-net

# 在/home/redis-cluster下生成conf和data目标，并生成配置信息
for port in `seq 8001 8008`; do \
  mkdir -p ./${port}/conf \
  && PORT=${port} envsubst < ./redis-cluster.tmpl > ./${port}/conf/redis.conf \
  && mkdir -p ./${port}/data; \
done

#查看生成的文件夹
tree --charset gbk
.
|-- 8001
|   |-- conf
|   |   `-- redis.conf
|   `-- data
|-- 8002
|   |-- conf
|   |   `-- redis.conf
|   `-- data
|-- 8003
|   |-- conf
|   |   `-- redis.conf
|   `-- data
|-- 8004
|   |-- conf
|   |   `-- redis.conf
|   `-- data
|-- 8005
|   |-- conf
|   |   `-- redis.conf
|   `-- data
|-- 8006
|   |-- conf
|   |   `-- redis.conf
|   `-- data
|-- 8007
|   |-- conf
|   |   `-- redis.conf
|   `-- data
|-- 8008
|   |-- conf
|   |   `-- redis.conf
|   `-- data
`-- redis-cluster.tmpl

# 创建8个redis实例
for port in `seq 8001 8008`; do \
  docker run -d -ti -p ${port}:${port} -p 1${port}:1${port} \
  -v /home/redis-cluster/${port}/conf/redis.conf:/usr/local/etc/redis/redis.conf \
  -v /home/redis-cluster/${port}/data:/data \
  --restart always --name redis-${port} --net redis-net \
  --sysctl net.core.somaxconn=1024 redis redis-server /usr/local/etc/redis/redis.conf; \
done
# 查看实例
docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                                                        NAMES
6ab70430e494        redis               "docker-entrypoint.s…"   57 seconds ago       Up 55 seconds       0.0.0.0:8008->8008/tcp, 6379/tcp, 0.0.0.0:18008->18008/tcp   redis-8008
6a37da72cc38        redis               "docker-entrypoint.s…"   58 seconds ago       Up 56 seconds       0.0.0.0:8007->8007/tcp, 6379/tcp, 0.0.0.0:18007->18007/tcp   redis-8007
b7d3103871ce        redis               "docker-entrypoint.s…"   59 seconds ago       Up 57 seconds       0.0.0.0:8006->8006/tcp, 6379/tcp, 0.0.0.0:18006->18006/tcp   redis-8006
2f1109f9baa5        redis               "docker-entrypoint.s…"   About a minute ago   Up 58 seconds       0.0.0.0:8005->8005/tcp, 6379/tcp, 0.0.0.0:18005->18005/tcp   redis-8005
b9cde6a82e0b        redis               "docker-entrypoint.s…"   About a minute ago   Up 59 seconds       0.0.0.0:8004->8004/tcp, 6379/tcp, 0.0.0.0:18004->18004/tcp   redis-8004
dc6c9c89a85a        redis               "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:8003->8003/tcp, 6379/tcp, 0.0.0.0:18003->18003/tcp   redis-8003
07ce40b3e8bb        redis               "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:8002->8002/tcp, 6379/tcp, 0.0.0.0:18002->18002/tcp   redis-8002
412b727da85d        redis               "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:8001->8001/tcp, 6379/tcp, 0.0.0.0:18001->18001/tcp   redis-8001




# XXX 使用ruby集群 有误，见日志
echo yes | docker run -i --rm --net redis-net ruby sh -c '\
  gem install redis \
  && wget http://download.redis.io/redis-stable/src/redis-trib.rb \
  && ruby redis-trib.rb create --replicas 1 \
  '"$(for port in `seq 8001 8008`; do \
    echo -n "$(docker inspect --format '{{ (index .NetworkSettings.Networks "redis-net").IPAddress }}' "redis-${port}")":${port} ' ' ; \
  done)"
  
  # XXX 换redis-cli试试,也不行
  echo yes | docker run -i --rm --net redis-net ruby sh -c '\
  gem install redis \
  && wget http://download.redis.io/redis-stable/src/redis-trib.rb \
  && redis-cli --cluster  --cluster-replicas 1 \
  '"$(for port in `seq 8001 8008`; do \
    echo -n "$(docker inspect --format '{{ (index .NetworkSettings.Networks "redis-net").IPAddress }}' "redis-${port}")":${port} ' ' ; \
  done)"


# 查看各个容器的ip
docker inspect redis-8001 redis-8002 redis-8003 redis-8004 redis-8005 redis-8006 redis-8007 redis-8008 | grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.20.0.2",
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.20.0.3",
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.20.0.4",
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.20.0.5",
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.20.0.6",
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.20.0.7",
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.20.0.8",
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.20.0.9",
# 停掉服务器

service firewalld stop 

# 进入8001容器，创建集群
docker exec -it redis-8001 bash

/usr/local/bin/redis-cli --cluster create \
172.20.0.2:8001 \
172.20.0.3:8002 \
172.20.0.4:8003 \
172.20.0.5:8004 \
172.20.0.6:8005 \
172.20.0.7:8006 \
172.20.0.8:8007 \
172.20.0.9:8008 \
--cluster-replicas 1

docker exec -it redis-8001 bash
for port in `seq 1 8`; \
do \
  redis-cli -c -p 8001 cluster meet 172.20.0.$(($port+1)) 800${port}; \
done







# wget http://download.redis.io/redis-stable/src/redis-trib.rb
```



### redis-cluster.tmpl

```
port ${PORT}
protected-mode no
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 192.168.0.159
cluster-announce-port ${PORT}
cluster-announce-bus-port 1${PORT}
appendonly yes
```

使用ruby集群日志：用这个是个坑

```bash
[root@localhost redis-cluster]# echo yes | docker run -i --rm --net redis-net ruby sh -c '\
>   gem install redis \
>   && wget http://download.redis.io/redis-stable/src/redis-trib.rb \
>   && ruby redis-trib.rb create --replicas 1 \
>   '"$(for port in `seq 8001 8008`; do \
>     echo -n "$(docker inspect --format '{{ (index .NetworkSettings.Networks "redis-net").IPAddress }}' "redis-${port}")":${port} ' ' ; \
>   done)"
Successfully installed redis-4.1.0
1 gem installed
--2019-04-02 02:19:58--  http://download.redis.io/redis-stable/src/redis-trib.rb
Resolving download.redis.io (download.redis.io)... 109.74.203.151
Connecting to download.redis.io (download.redis.io)|109.74.203.151|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 3600 (3.5K) [text/plain]
Saving to: 'redis-trib.rb'

     0K ...                                                   100%  228M=0s

2019-04-02 02:19:59 (228 MB/s) - 'redis-trib.rb' saved [3600/3600]

WARNING: redis-trib.rb is not longer available!
You should use redis-cli instead.

All commands and features belonging to redis-trib.rb have been moved
to redis-cli.
In order to use them you should call redis-cli with the --cluster
option followed by the subcommand name, arguments and options.

Use the following syntax:
redis-cli --cluster SUBCOMMAND [ARGUMENTS] [OPTIONS]

Example:
redis-cli --cluster create 172.20.0.2:8001 172.20.0.3:8002 172.20.0.4:8003 172.20.0.5:8004 172.20.0.6:8005 172.20.0.7:8006 172.20.0.8:8007 172.20.0.9:8008 --cluster-replicas 1

To get help about all subcommands, type:
redis-cli --cluster help


```

查看ruby镜像中ruby的版本

```
docker run -i --rm --net redis-net ruby sh

ruby -v
ruby 2.6.2p47 (2019-03-13 revision 67232) [x86_64-linux]


```

查看生成的redis集群配置

```bash

[root@localhost redis-cluster]# docker exec -it redis-8001 bash
root@9cc144ff8621:/data# /usr/local/bin/redis-cli --cluster create \
> 172.20.0.2:8001 \
> 172.20.0.3:8002 \
> 172.20.0.4:8003 \
> 172.20.0.5:8004 \
> 172.20.0.6:8005 \
> 172.20.0.7:8006 \
> 172.20.0.8:8007 \
> 172.20.0.9:8008 \
> --cluster-replicas 1
>>> Performing hash slots allocation on 8 nodes...
Master[0] -> Slots 0 - 4095
Master[1] -> Slots 4096 - 8191
Master[2] -> Slots 8192 - 12287
Master[3] -> Slots 12288 - 16383
Adding replica 172.20.0.7:8006 to 172.20.0.2:8001
Adding replica 172.20.0.8:8007 to 172.20.0.3:8002
Adding replica 172.20.0.9:8008 to 172.20.0.4:8003
Adding replica 172.20.0.6:8005 to 172.20.0.5:8004
M: cce21209401a253975c607f5b5a77e746ec9fc4a 172.20.0.2:8001
   slots:[0-4095] (4096 slots) master
M: 137615861ffa8494a1ea6fd412f15041b847c71f 172.20.0.3:8002
   slots:[4096-8191] (4096 slots) master
M: 1eec90bba9616fa2b898f8f77d5c34b16aaa749f 172.20.0.4:8003
   slots:[8192-12287] (4096 slots) master
M: e4b1365fc3f483e71cab3ef00d4aaa1c66aa5a19 172.20.0.5:8004
   slots:[12288-16383] (4096 slots) master
S: e9c0c0d9d18a38eaaa5f9cd1412b2b57861e7423 172.20.0.6:8005
   replicates e4b1365fc3f483e71cab3ef00d4aaa1c66aa5a19
S: bed6fa2e8e61e426a22f1d3046eb109a7571ad61 172.20.0.7:8006
   replicates cce21209401a253975c607f5b5a77e746ec9fc4a
S: 36e1061014f8a15f1ba863f9490d30b0daf1b45b 172.20.0.8:8007
   replicates 137615861ffa8494a1ea6fd412f15041b847c71f
S: 9e730419538b6bcdb08ff65a73002781189b6a92 172.20.0.9:8008
   replicates 1eec90bba9616fa2b898f8f77d5c34b16aaa749f
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
...
>>> Performing Cluster Check (using node 172.20.0.2:8001)
M: cce21209401a253975c607f5b5a77e746ec9fc4a 172.20.0.2:8001
   slots:[0-4095] (4096 slots) master
   1 additional replica(s)
S: 9e730419538b6bcdb08ff65a73002781189b6a92 192.168.0.159:8008
   slots: (0 slots) slave
   replicates 1eec90bba9616fa2b898f8f77d5c34b16aaa749f
M: e4b1365fc3f483e71cab3ef00d4aaa1c66aa5a19 192.168.0.159:8004
   slots:[12288-16383] (4096 slots) master
   1 additional replica(s)
S: bed6fa2e8e61e426a22f1d3046eb109a7571ad61 192.168.0.159:8006
   slots: (0 slots) slave
   replicates cce21209401a253975c607f5b5a77e746ec9fc4a
S: e9c0c0d9d18a38eaaa5f9cd1412b2b57861e7423 192.168.0.159:8005
   slots: (0 slots) slave
   replicates e4b1365fc3f483e71cab3ef00d4aaa1c66aa5a19
S: 36e1061014f8a15f1ba863f9490d30b0daf1b45b 192.168.0.159:8007
   slots: (0 slots) slave
   replicates 137615861ffa8494a1ea6fd412f15041b847c71f
M: 137615861ffa8494a1ea6fd412f15041b847c71f 192.168.0.159:8002
   slots:[4096-8191] (4096 slots) master
   1 additional replica(s)
M: 1eec90bba9616fa2b898f8f77d5c34b16aaa749f 192.168.0.159:8003
   slots:[8192-12287] (4096 slots) master
   1 additional replica(s)
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.   

```



## 删除redis cluster 

```bash
for port in `seq 8001 8008`; \
do \
  docker stop redis-${port} ; \
  docker rm redis-${port} ;\
done

docker network prune 

rm /home/redis-cluster -rf
```



