# 微服务核心功能推荐

- 工作流引擎

  工作流（Workflow）就是工作流程的计算模型，即将工作流程中的工作如何前后组织在一起的逻辑和规则在计算机中以恰当的模型进行表示并对其实施计算。主要解决“使在多个参与者之间按照某种预定义的规则传递文档、信息或任务的过程自动进行，从而实现某个预期的业务目标，或者促使此目标的实现”

  - Activiti [activiti  百度百科](https://baike.baidu.com/item/activiti/10300939) https://baike.baidu.com/item/activiti/10300939

    Activiti项目是一项新的基于Apache许可的开源BPM平台，从基础开始构建，旨在提供支持新的BPMN 2.0标准，包括支持对象管理组（OMG），面对新技术的机遇，诸如互操作性和云架构，提供技术实现。

    ![è¿éåå¾çæè¿°](https://img-blog.csdn.net/20160416074310858)

  - UFLO [UFlo 中式工作流引擎](http://www.bstek.com/products/uflo)  http://www.bstek.com/products/uflo

    UFlo 工作流引擎

    每个细节，为了 满足，中式流程需求

    是一套由BSTEK自主研发的基于Java的工作流引擎，它以Spring为基础框架，采用Hibernate作为持久层，可运行于所有主流程应用服务器及流数据库之上的轻量级流程引擎。

- 规则引擎

  当没有更让人满意的“传统”方案

  当遇到以下问题：
  　　太复杂
  　　没有已知的算法
  　　太易变

  - Drools

     [规则引擎简介](https://www.cnblogs.com/qiyexue/p/7822464.html)

     　　Drools是一个业务逻辑集成平台，基于JAVA和RATE算法的产生式规则引擎实现，是Red Hat旗下的开源产品.  

  - URule

    http://www.bstek.com/products/urule

    URule Pro是一款由上海锐道信息技术有限公司自主研发的纯Java规则引擎，提供规则集、决策表、交叉决策表（决策矩阵）、决策树、评分卡、复杂评分卡、规则流等八种类型的业务规则设计工具， 采用业内首创的纯浏览器编辑模式，打开浏览器即可开始复杂规则的设计与测试

- 调度系统

   [分布式任务调度平台XXL-JOB](https://www.cnblogs.com/xuxueli/p/5021979.html)

    	XXL-JOB是一个轻量级分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展。现已开放源代码并接入多家公司线上产品线，开箱即用。

- 消息推送

   https://github.com/mpusher/mpush

   mpush，是一款开源的实时消息推送系统，采用java语言开发，服务端采用模块化设计，具有协议简洁，传输安全，接口流畅，实时高效，扩展性强，可配置化，部署方便，监控完善等特点。同时也是少有的可商用的开源推送系统。

   ![img](https://camo.githubusercontent.com/a6ba14ff0a7ef3527d73bc00487351e643d17d91/68747470733a2f2f6d7075736865722e6769746875622e696f2f646f63732f2545362539432538442545352538412541312545342542452539442545382542352539362545352538352542332545372542332542422e706e67)

- 网关中间件

  常用的网关中间件有Zuul,Kong,Tyk和Orange等。

  - Orange：基于OpenResty的API Gateway,提供API及自定义规则的监控和管理。
  - Kong：提供了API管理功能，以及围绕API管理实现了一些默认的插件，另外还具备集群水平扩展能力，从而提升整体吞吐量。
  - Zuul：是Netflix开源的一个API Gateway服务器，本质上是一个Web Servlet应用。

- 分库分表中间件

  - 应对场景：大数据量和高并发
  - 拆分方式：
    - 垂直拆分,不同业务放在不同表
    - 水平拆分,将数据按算法分片存放

  - Sharding-JDBC：当当网在dd-rdb中分享出的数据库水平分片框架，实现透明化数据库分库分表访问。
  - MyCat:是一个实现了Mysql协议的开源的分布式数据库系统。

- 报表引擎

   UReport2是一款基于架构在Spring之上的纯Java的高性能报表引擎，通过迭代单元格的方式实现任意复杂的中国式报表。

- 数据处理

  ETL,Extract、Transform、Load

  - Spring Batch:是一个轻量级的完全面向Spring的批处理框架，可以应用于企业级大规模的数据处理系统。
  - Kettle：Kettle是一个ETL工具，在数据仓库项目中使用得很频繁。

- 并发编程

   Akka是JVM平台上构建高并发、分布式和容错应用的工具包和运行时。

- 分布式配置
  - Disconf：专注于各种「分布式系统配置管理」的「通用组件」和「通用平台」, 提供统一的「配置管理服务」
  - Apollo：Apollo（阿波罗）是携程框架部门研发的配置管理平台，能够集中化管理应用不同环境、不同集群的配置，配置修改后能够实时推送到应用端。

- CAS：CAS 是 Yale 大学发起的一个开源项目，旨在为 Web 应用系统提供一种可靠的单点登录方法，CAS 在 2004 年 12 月正式成为 JA-SIG 的一个项目

- WebFlux：Spring WebFlux是Spring Framework 5.0中引入的新的反应式Web框架。与Spring MVC不同，它不需要Servlet API，完全异步且无阻塞，并 通过Reactor项目实现Reactive Streams规范。

- 小结