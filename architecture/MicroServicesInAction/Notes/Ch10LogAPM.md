# 微服务之日志收集与监控

- 微服务日志和监控的思考题

  - 分散在各个服务器上的日志怎么处理？
  - 如果业务流出现了错误和异常，如何定位是哪个点出的问题。
  - 如何快速定位问题？
  - 如何跟踪业务流的处理顺序和结果？

- 微服务日志监控流程

  ```mermaid
  graph LR
  A[主机1]-->D(管道)
  B[主机1]-->D(管道)
  C[主机1]-->D(管道)
  D-->E((存储系统))
  D-->F[实时分析系统]
  D-->G[其他...]
  F-->H[预警系统]
  E-->I[检索系统]
  E-->J[分析挖掘系统]
  ```

  上图中从左至右，先是从宿主服务器上去收集日志，紧接着是一个管道，负责数据传输，接着数据被分流，一部分进入存储系统，比如 Elasticsearch、Hadoop，一部分进入了实时分析系统，比如 Storm、Spark Streaming。

- ELK搜集与分析

  - Elasticsearch

    ElasticSearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。Elasticsearch是用Java开发的，并作为Apache许可条款下的开放源码发布，是当前流行的企业级搜索引擎。设计用于[云计算](https://baike.baidu.com/item/%E4%BA%91%E8%AE%A1%E7%AE%97/9969353)中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。

  - Logstash

    Logstash 是开源的服务器端数据处理管道，能够同时从多个来源采集数据，转换数据，然后将数据发送到您最喜欢的 “存储库” 中。（我们的存储库当然是 Elasticsearch。）

  - Kibana

    Kibana是一个开源的分析和可视化平台，设计用于和Elasticsearch一起工作。

    你用Kibana来搜索，查看，并和存储在Elasticsearch索引中的数据进行交互。

    你可以轻松地执行高级数据分析，并且以各种图标、表格和地图的形式可视化数据。

    Kibana使得理解大量数据变得很容易。它简单的、基于浏览器的界面使你能够快速创建和共享动态仪表板，实时显示Elasticsearch查询的变化。

- 系统监控

  - 定义告警优先级策略
  - 定义告警信息内容标准
  - 统一接收汇总报表
  - 定义故障告警主次
  - 实现对常见性故障业务的自我修复功能
  - 设定监控范围和目标
    - server监控
    - 应用程序监控
    - 数据库监控
    - 网络监控

- 运维监控

  - Zabbix

    zabbix（[`zæbiks]）是一个基于WEB界面的提供分布式系统监视以及网络监视功能的企业级的开源解决方案。
    zabbix能监视各种网络参数，保证服务器系统的安全运营；并提供灵活的通知机制以让系统管理员快速定位/解决存在的各种问题。
    zabbix由2部分构成，zabbix server与可选组件zabbix agent。
    zabbix server可以通过SNMP，zabbix agent，ping，端口监视等方法提供对远程服务器/网络状态的监视，数据收集等功能，它可以运行在Linux，Solaris，HP-UX，AIX，Free BSD，Open BSD，OS X等平台上。

  - Open-Falcon

    监控系统是整个运维环节，乃至整个产品生命周期中最重要的一环，事前及时预警发现故障，事后提供翔实的数据用于追查定位问题。监控系统作为一个成熟的运维产品，业界有很多开源的实现可供选择。当公司刚刚起步，业务规模较小，运维团队也刚刚建立的初期，选择一款开源的监控系统，是一个省时省力，效率最高的方案。之后，随着业务规模的持续快速增长，监控的对象也越来越多，越来越复杂，监控系统的使用对象也从最初少数的几个SRE，扩大为更多的DEVS，SRE。这时候，监控系统的容量和用户的“使用效率”成了最为突出的问题。

    监控系统业界有很多杰出的开源监控系统。我们在早期，一直在用zabbix，不过随着业务的快速发展，以及互联网公司特有的一些需求，现有的开源的监控系统在性能、扩展性、和用户的使用效率方面，已经无法支撑了。

    因此，我们在过去的一年里，从互联网公司的一些需求出发，从各位SRE、SA、DEVS的使用经验和反馈出发，结合业界的一些大的互联网公司做监控，用监控的一些思考出发，设计开发了小米的监控系统：Open-Falcon。

    ![open-falcon architecture](https://raw.githubusercontent.com/open-falcon/doc/master/screenshots/falcon-arch.png)

- APM监控

  APM = Application Performance Management，应用性能管理，对企业系统即时监控以实现对应用程序性能管理和故障管理的系统化的解决方案。
  应用性能管理是一个比较新的网络管理方向，主要指对企业的关键业务应用进行监测、优化，提高企业应用的可靠性和质量，保证用户得到良好的服务，降低IT总拥有成本(TCO)。一个企业的关键业务应用的性能强大，可以提高竞争力，并取得商业成功，因此，加强应用性能管理（APM）可以产生巨大商业利益。
  APM的覆盖范围包括五个层次的实现：终端用户体验，应用架构映射，应用事务的分析，深度应用诊断，和数据分析

  - Pinpoint

    Pinpoint 是用 Java 编写的 APM（应用性能管理）工具，用于大规模分布式系统。在Dapper之后，Pinpoint 提供了一个解决方案，以帮助分析系统的总体结构以及分布式应用程序的组件之间是如何进行数据互联的。

    - 安装agent是无侵入式的

    - 对性能的影响最小（只增加约3％资源利用率）

      ![img](http://static.oschina.net/uploads/space/2015/1225/152900_8Mw0_865233.png)

  - SkyWalking

    SkyWalking 创建于2015年，提供分布式追踪功能。从5.x开始，项目进化为一个完成功能的Application Performance Monitoring系统。
    他被用于追踪、监控和诊断分布式系统，特别是使用微服务架构，云原生或容积技术。

    ![img](https://upload-images.jianshu.io/upload_images/5378831-8b21994f353889ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

  - Zipkin

    zipkin是Twitter基于google的分布式监控系统Dapper（论文）的开发源实现，zipkin用于跟踪分布式服务之间的应用数据链路，分析处理延时，帮助我们改进系统的性能和定位故障。

    ![Zipkin architecture](https://zipkin.io/public/img/architecture-1.png)

  - CAT

    ​    CAT(Central Application Tracking)是基于Java开发的实时应用监控平台，提供了全面的监控服务和业务决策支持。 

    ![img](https://img-blog.csdn.net/20180425202657892)

- 参考网址：

  [Open-Falcon介绍](http://book.open-falcon.org/zh/intro/index.html) http://book.open-falcon.org/zh/intro/index.html

  [应用性能管理工具 Pinpoint](https://www.oschina.net/p/pinpoint) https://www.oschina.net/p/pinpoint

  [SkyWalking 分布式追踪系统](https://www.jianshu.com/p/2fd56627a3cf) https://www.jianshu.com/p/2fd56627a3cf

  [ZipKin的原理的介绍](https://www.cnblogs.com/zhikou/p/8320901.html) https://www.cnblogs.com/zhikou/p/8320901.html

  [CAT 实时监控](https://blog.csdn.net/m0_37499059/article/details/80085100) https://blog.csdn.net/m0_37499059/article/details/80085100

