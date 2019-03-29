# [Centos7.3防火墙配置](https://www.cnblogs.com/xxoome/p/7115614.html)

**1、查看firewall服务状态**

```
systemctl status firewalld
```

![img](https://images2015.cnblogs.com/blog/964175/201707/964175-20170704104259159-913218775.png)

**2、查看firewall的状态**

```
firewall-cmd --state
```

 ![img](https://images2015.cnblogs.com/blog/964175/201707/964175-20170704104425769-698844041.png)

**3、开启、重启、关闭、firewalld.service服务**

```
# 开启
service firewalld start
# 重启
service firewalld restart
# 关闭
service firewalld stop
```

**4、查看防火墙规则**

```
firewall-cmd --list-all 
```

**![img](https://images2018.cnblogs.com/blog/964175/201807/964175-20180711112139108-273720937.png)**

**5、查询、开放、关闭端口**

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
# 查询端口是否开放
firewall-cmd --query-port=8080/tcp
# 开放80端口
firewall-cmd --permanent --add-port=80/tcp
# 移除端口
firewall-cmd --permanent --remove-port=8080/tcp
#重启防火墙(修改配置后要重启防火墙)
firewall-cmd --reload

# 参数解释
1、firwall-cmd：是Linux提供的操作firewall的一个工具；
2、--permanent：表示设置为持久；
3、--add-port：标识添加的端口；
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 