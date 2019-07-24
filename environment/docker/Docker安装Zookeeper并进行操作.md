``` bash
docker pull zookeeper

docker run --privileged=true -d --name zookeeper --publish 2181:2181  -d zookeeper:latest

docker ps
```

**idea提供了一个Zookeeper插件，以供连接Zookeeper服务中心和查看内容**

- 打开idea –》 Settings -》Plugins,搜索Zoo进行下载安装

  ![img](https://img-blog.csdn.net/2018070216293877?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NjQxNzgx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

- 配置Zookeeper的连接信息

  ![img](https://img-blog.csdn.net/20180702163121669?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NjQxNzgx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![img](https://img-blog.csdn.net/20180702163200118?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NjQxNzgx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

ZooKeeper常用客户端
zookeeper的常用客户端有3种，分别是：zookeeper原生的、Apache Curator、开源的zkclient，下面分别对介绍它们： 
zookeeper自带的客户端是官方提供的，比较底层、使用起来写代码麻烦、不够直接。 
Apache Curator是Apache的开源项目，封装了zookeeper自带的客户端，使用相对简便，易于使用。 

zkclient是另一个开源的ZooKeeper客户端。

``` xml
  <!-- 原生zookeeper -->
        <dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.4.6</version>
        </dependency>

        <!--Apache Curator-->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>2.9.0</version>
        </dependency>

        <!-- zkclient -->
        <dependency>
            <groupId>com.101tec</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.9</version>
        </dependency>

        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>

```

三种ZooKeeper客户端比较 
由于Apache Curator是其中比较完美的ZooKeeper客户端，所以主要介绍Curator的特性来进行比较！

Curator几个组成部分

Client: 是ZooKeeper客户端的一个替代品, 提供了一些底层处理和相关的工具方法
Framework: 用来简化ZooKeeper高级功能的使用, 并增加了一些新的功能, 比如管理到ZooKeeper集群的连接, 重试处理
Recipes: 实现了通用ZooKeeper的recipe, 该组件建立在Framework的基础之上
Utilities:各种ZooKeeper的工具类
Errors: 异常处理, 连接, 恢复等
Extensions: recipe扩展
Curator主要解决了三类问题

封装ZooKeeper client与ZooKeeper server之间的连接处理
提供了一套Fluent风格的操作API
提供ZooKeeper各种应用场景(recipe, 比如共享锁服务, 集群领导选举机制)的抽象封装
Curator列举的ZooKeeper使用过程中的几个问题

初始化连接的问题: 
在client与server之间握手建立连接的过程中,如果握手失败,执行所有的同步方法(比如create,getData等)将抛出异常
自动恢复(failover)的问题: 当client与一台server的连接丢失,并试图去连接另外一台server时, 
client将回到初始连接模式
session过期的问题: 在极端情况下,出现ZooKeeper 
session过期,客户端需要自己去监听该状态并重新创建ZooKeeper实例
对可恢复异常的处理:当在server端创建一个有序ZNode,而在将节点名返回给客户端时崩溃,此时client端抛出可恢复的异常,用户需要自己捕获这些异常并进行重试
使用场景的问题:Zookeeper提供了一些标准的使用场景支持,但是ZooKeeper对这些功能的使用说明文档很少,而且很容易用错.在一些极端场景下如何处理,zk并没有给出详细的文档说明.比如共享锁服务,当服务器端创建临时顺序节点成功,但是在客户端接收到节点名之前挂掉了,如果不能很好的处理这种情况,将导致死锁
Curator主要从以下几个方面降低了zk使用的复杂性

重试机制:提供可插拔的重试机制, 它将给捕获所有可恢复的异常配置一个重试策略,并且内部也提供了几种标准的重试策略(比如指数补偿)
连接状态监控: Curator初始化之后会一直的对zk连接进行监听, 一旦发现连接状态发生变化, 将作出相应的处理
zk客户端实例管理:Curator对zk客户端到server集群连接进行管理.并在需要的情况, 重建zk实例,保证与zk集群的可靠连接
各种使用场景支持:Curator实现zk支持的大部分使用场景支持(甚至包括zk自身不支持的场景),这些实现都遵循了zk的最佳实践,并考虑了各种极端情况
Curator声称的一些亮点

日志工具 
内部采用SLF4J 来输出日志 采用驱动器(driver)机制, 允许扩展和定制日志和跟踪处理, 
提供了一个TracerDriver接口, 通过实现addTrace()和addCount()接口来集成用户自己的跟踪框架
和Curator相比, 另一个ZooKeeper客户端——zkClient的不足之处 
文档几乎没有异常处理弱爆了(简单的抛出RuntimeException) 重试处理太难用了 没有提供各种使用场景的实现
对ZooKeeper自带客户端(ZooKeeper类)的”抱怨” 只是一个底层实现 要用需要自己写大量的代码 很容易误用 

需要自己处理连接丢失, 重试等

``` java

public class CuratorTest {
    public static void main(String[] args) throws Exception{
        CuratorFramework client = CuratorFrameworkFactory.newClient("192.168.0.183:2181", new RetryNTimes(10, 5000));
        client.start();// 连接
        // 获取子节点，顺便监控子节点
        List<String> children = client.getChildren().usingWatcher(new CuratorWatcher() {
            public void process(WatchedEvent event) throws Exception
            {
                System.out.println("监控： " + event);
            }
        }).forPath("/");
        System.out.println(children);
        // 创建节点
        String result = client.create().withMode(CreateMode.PERSISTENT).withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE).forPath("/test", "Data".getBytes());
        System.out.println(result);
        // 设置节点数据
        client.setData().forPath("/test", "111".getBytes());
        client.setData().forPath("/test", "222".getBytes());
        // 删除节点
        //System.out.println(client.checkExists().forPath("/test"));
        /*client.delete().withVersion(-1).forPath("/test");
        System.out.println(client.checkExists().forPath("/test"));*/
        client.close();
        System.out.println("OK！");
    }
}

```

ZooKeeper自带客户端（原生zookeeper） 
ZooKeeper自带客户端的主要类是ZooKeeper类,ZooKeeper类对象除了需要ZooKeeper服务端连接字符串(IP地址：端口)，还必须提供一个Watcher对象。Watcher是一个接口，当服务器节点花发生变化就会以事件的形式通知Watcher对象。所以Watcher常用来监听节点，当节点发生变化时客户端就会知道。\

ZooKeeper类还有对节点进行增删改的操作方法，主要方法如下：

create：用于创建节点，可以指定节点路径、节点数据、节点的访问权限、节点类型
delete：删除节点，每个节点都有一个版本，删除时可指定删除的版本，类似乐观锁。设置-1，则就直接删除节点。
exists：节点存不存在，若存在返回节点Stat信息，否则返回null
getChildren：获取子节点
getData/setData：获取节点数据

getACL/setACL：获取节点访问权限列表，每个节点都可以设置访问权限，指定只有特定的客户端才能访问和操作节点。

``` java
public class ZookpeerTest {
    public static void main(String[] args) throws IOException, KeeperException, InterruptedException {
        ZooKeeper zk = new ZooKeeper("192.168.0.183:2181", 3000, new Watcher() {
            public void process(WatchedEvent watchedEvent) {
                System.out.println(watchedEvent.toString());
            }
        });
        System.out.println("OK!");
        // 创建一个目录节点
        /**
         * CreateMode:
         *       PERSISTENT (持续的，相对于EPHEMERAL，不会随着client的断开而消失)
         *       PERSISTENT_SEQUENTIAL（持久的且带顺序的）
         *       EPHEMERAL (短暂的，生命周期依赖于client session)
         *       EPHEMERAL_SEQUENTIAL  (短暂的，带顺序的)
         */
        zk.create("/country", "China".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        // 创建一个子目录节点
        zk.create("/country/city", "China/Hangzhou".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        System.out.println(new String(zk.getData("/country", false, null)));
        // 取出子目录节点列表
        System.out.println(zk.getChildren("/country", true));
        // 创建另外一个子目录节点
        zk.create("/country/view", "China/WestLake".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        System.out.println(zk.getChildren("/country", true));
        // 修改子目录节点数据
        zk.setData("/country/city", "China/Shanghai".getBytes(), -1);
        byte[] datas = zk.getData("/country/city", true, null);
        String str = new String(datas, "utf-8");
        System.out.println(str);
        // 删除整个子目录 -1代表version版本号，-1是删除所有版本
//        zk.delete("/path01/path01", -1);
//        zk.delete("/path01/path02", -1);
//        zk.delete("/path01", -1);
//        System.out.println(str);
        Thread.sleep(15000);
        zk.close();
        System.out.println("OK");
    }
}

```

节点类型说明： 
节点类型有4种：“PERSISTENT、PERSISTENT_SEQUENTIAL、EPHEMERAL、EPHEMERAL_SEQUENTIAL”其中“EPHEMERAL、EPHEMERAL_SEQUENTIAL”两种是客户端断开连接(Session无效时)节点会被自动删除；“PERSISTENT_SEQUENTIAL、EPHEMERAL_SEQUENTIAL”两种是节点名后缀是一个自动增长序号。

节点访问权限说明： 
节点访问权限由List确定，但是有几个便捷的静态属性可以选择： 
- Ids.CREATOR_ALL_ACL：只有创建节点的客户端才有所有权限\ 
- Ids.OPEN_ACL_UNSAFE：这是一个完全开放的权限，所有客户端都有权限 
- Ids.READ_ACL_UNSAFE：所有客户端只有读取的

zkclient :

``` java
public class Zkclient {
    public static void main(String[] args) throws Exception{
        ZkClient zkClient = new ZkClient("192.168.0.183:2181");//建立连接
        zkClient.create("/root","mydata", CreateMode.PERSISTENT);//创建目录并写入数据
        String data=zkClient.readData("/root");
        System.out.println(data);
        //zkClient.delete("/root");//删除目录
        //zkClient.deleteRecursive("/root");//递归删除节目录
    }
}
```



特别感谢资料来源：https://www.cnblogs.com/LiZhiW/p/4923693.html



作者：Radom7 
来源：CSDN 
原文：https://blog.csdn.net/qq_26641781/article/details/80886831 
版权声明：本文为博主原创文章，转载请附上博文链接！