# 微服务之Spring Cloud
- 总图：

   ![img](http://dl2.iteye.com/upload/attachment/0127/6257/c76c6456-49c4-3eac-84cb-28a931884370.jpg)

-　从上图可以看出Spring Cloud各个组件相互配合，合作支持了一套完整的微服务架构。 

   - 其中Eureka负责服务的注册与发现，很好将各服务连接起来
   - Hystrix 负责监控服务之间的调用情况，连续多次失败进行熔断保护。
   - Hystrix dashboard,Turbine 负责监控 Hystrix的熔断情况，并给予图形化的展示
   - Spring Cloud Config 提供了统一的配置中心服务
   - 当配置文件发生变化的时候，Spring Cloud Bus 负责通知各服务去获取最新的配置信息
   - 所有对外的请求和服务，我们都通过Zuul来进行转发，起到API网关的作用
   - 监控我们使用Sleuth+Zipkin+springAdmin将所有的请求数据记录下来，方便我们进行后续分析

- 注册中心

   - 常用的注册中心
   - Eureka介绍
   - 服务发现
   - 简单注册

-  负载均衡
   -　Spring Cloud的负载实现
   -　Ribbon
   -　Feign
   -　　加入core

-  微服务容错（Hystrix）

   - 雪崩的形成
   - 应对方案
    - 降级和熔断
    - Hystrix
   - 集中监控

-　　分布式配置中心

-　　API网关

   - 　为什么需要网关

   - 　Zuul

-　　消息总线（Spring Cloud Bus）

-　参考：

   [基于springCloud的分布式架构体系  ](https://blog.csdn.net/chen978616649/article/details/78493001/) https://blog.csdn.net/chen978616649/article/details/78493001/
