``` bash
 # 编辑yml脚本  注意的是3.5版本的clientPort参数变了,我也没找到在哪配,所以就用3.4.11版本吧
 # docker pull zookeeper:3.4.11
 
 
 # docker-compose命令: 查看
 docker-compose -f ./docker-compose.yml config --help
 
 # 验证配置脚本是不是对的.
 docker-compose -f ./docker-compose.yml config -q
 
 # 启动 -d选项表示后台启动
 docker-compose -f docker-compose.yml up -d
 
 # 查看集群状态
 docker-compose -f docker-compose.yml ps
 
 # 分别进入每个zookeeper看状态
 docker exec -it zookeeper_1 /bin/sh
 cd bin
 zkServer.sh status
```



- 过程日志

  - 创建zookeeper集群

  ``` bash
  [root@localhost zookeeper]#  docker-compose -f docker-compose.yml up -d
  Creating network "zookeeper_default" with the default driver
  Creating zookeeper_1 ... done
  Creating zookeeper_2 ... done
  Creating zookeeper_3 ... done
  [root@localhost zookeeper]#
  
  ```

  - 查看集群状态

``` bash
[root@localhost zookeeper]#  docker-compose -f docker-compose.yml ps
   Name                  Command               State                          Ports
-----------------------------------------------------------------------------------------------------------
zookeeper_1   /docker-entrypoint.sh zkSe ...   Up      0.0.0.0:2181->2181/tcp, 2888/tcp, 3888/tcp, 8080/tcp
zookeeper_2   /docker-entrypoint.sh zkSe ...   Up      0.0.0.0:2182->2181/tcp, 2888/tcp, 3888/tcp, 8080/tcp
zookeeper_3   /docker-entrypoint.sh zkSe ...   Up      0.0.0.0:2183->2181/tcp, 2888/tcp, 3888/tcp, 8080/tcp
[root@localhost zookeeper]#

```

-  分别进入每个zookeeper看状态

  - zoo1

    ```bash
    [root@localhost zookeeper]#  docker exec -it zookeeper_1 /bin/sh
    /zookeeper-3.4.11 # ls
    LICENSE.txt                build.xml                  ivy.xml                    zookeeper-3.4.11.jar
    NOTICE.txt                 conf                       ivysettings.xml            zookeeper-3.4.11.jar.asc
    README.md                  contrib                    lib                        zookeeper-3.4.11.jar.md5
    README_packaging.txt       dist-maven                 recipes                    zookeeper-3.4.11.jar.sha1
    bin                        docs                       src
    /zookeeper-3.4.11 # pwd
    /zookeeper-3.4.11
    /zookeeper-3.4.11 # cd bin
    /zookeeper-3.4.11/bin # ls
    README.txt    zkCleanup.sh  zkCli.cmd     zkCli.sh      zkEnv.cmd     zkEnv.sh      zkServer.cmd  zkServer.sh
    /zookeeper-3.4.11/bin # ./zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: follower
    
    ```

    

  - zoo2

    ``` bash
    [root@localhost zookeeper]#  docker exec -it zookeeper_2 /bin/sh
    /zookeeper-3.4.11 # ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: follower
    /zookeeper-3.4.11 #
    
    ```

    

  - zoo3

    ``` bash
    [root@localhost zookeeper]# docker exec -it zookeeper_3 /bin/sh
    /zookeeper-3.4.11 # ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: leader
    /zookeeper-3.4.11 #
    
    ```

    

- 关掉leader后,重新选举leader

  - 关掉zoo3

    ``` bash
    [root@localhost zookeeper]# docker stop zookeeper_3
    zookeeper_3
    [root@localhost zookeeper]#
    
    ```

    

  - 重新看zoo1,zoo2谁是leader

    ```bash
    [root@localhost zookeeper]# docker exec -it zookeeper_2 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: leader
    [root@localhost zookeeper]# docker exec -it zookeeper_1 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: follower
    [root@localhost zookeeper]#
    
    
    ```

    

- 再打开zoo3,看看谁又是leader.(zoo3,你有完没完)

  - 打开zoo3

    ``` bash
    [root@localhost zookeeper]# docker start zookeeper_3
    zookeeper_3
    [root@localhost zookeeper]#
    ```

    

  - 查看谁是leader

    ``` bash
    [root@localhost ~]#  docker exec -it zookeeper_1 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: follower
    
    [root@localhost ~]#  docker exec -it zookeeper_2 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: leader
    [root@localhost ~]#
    
    
    [root@localhost ~]#  docker exec -it zookeeper_3 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: follower
    [root@localhost ~]#
    
    
    ```

  - 本次zookeeper_3因为掉线时间太长,zookeeper_2因一直在猥琐发育,所以mvp的地位保住了.

- 我们再来把zookeeper_2搞掉线,看看zookeeper_3有没有可能重回mvp(leader)

  - 关掉zookeeper_2

    ``` bash
    [root@localhost ~]# docker stop zookeeper_2
    zookeeper_2
    
    ```

    

  - 看看结果

    ``` bash
    [root@localhost ~]# docker stop zookeeper_2
    zookeeper_2
    [root@localhost ~]#  docker exec -it zookeeper_1 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: follower
    [root@localhost ~]#  docker exec -it zookeeper_3 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: leader
    [root@localhost ~]#  docker exec -it zookeeper_2 bash ./bin/zkServer.sh status
    Error response from daemon: Container bbd88579e770aaeee92723b0a2a36f87048d7fbfdd4c26c5e9eeadf3dcf8d10c is not running
    [root@localhost ~]# docker start zookeeper_2
    zookeeper_2
    [root@localhost ~]#  docker exec -it zookeeper_2 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: follower
    [root@localhost ~]#  docker exec -it zookeeper_3 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: leader
    [root@localhost ~]#  docker exec -it zookeeper_1 bash ./bin/zkServer.sh status
    ZooKeeper JMX enabled by default
    Using config: /conf/zoo.cfg
    Mode: follower
    
    ```

    

  - 

