``` bash
docker pull rabbitmq:management

# docker run -d --hostname rabbit01 --name rabbit01 -p 8080:15672 rabbitmq:management 
# --hostname：指定容器主机名称 --name:指定容器名称 -p:将mq端口号映射到本地

# 或在运行时设置用户和密码
docker run -d --hostname rabbit01 --name rabbit01 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin -p 15672:15672 -p 5672:5672 -p 25672:25672 -p 61613:61613 -p 1883:1883 rabbitmq:management
# 15672：控制台端口号 5672：应用访问端口号
# -v `pwd`/data:/var/lib/rabbitmq 映射文件夹

# 查看日志
docker logs rabbit

```

> 容器运行正常，使用http://127.0.0.1:15672访问rabbit控制台



``` bash
# 停止其他mq
docker stop activemq01
```

