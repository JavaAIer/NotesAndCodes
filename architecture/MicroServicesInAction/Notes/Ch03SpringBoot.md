# 微服务之Spring Boot

Spring Boot是由Pivotal团队提供的全新框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。通过这种方式，Spring Boot致力于在蓬勃发展的快速应用开发领域(rapid application development)成为领导者。



- 特性：

  - 方便创建独立的spring应用。
  - 内置tomcat模块
  - 简化maven配置
  - 自动配置spring。
  - 提供大型项目中的非功能特性：指标、安全、健康检查及外部配置。
  - 开箱即用。

- spring boot starter 

  | 名称                                        | 描述                                                         |
  | ------------------------------------------- | ------------------------------------------------------------ |
  | spring-boot-starter                         | 核心配置，包括自动配置、日志记录等                           |
  | spring-boot-starter-activemq                | 使用Apache ActiveMQ进行JMS消息传递                           |
  | spring-boot-starter-amqp                    | 使用amqp或者Rabbit MQ                                        |
  | spring-boot-starter-aop                     | 进行面向切面编程依赖                                         |
  | spring-boot-starter-artemis                 | 使用Apache Artemis开始的JMS消息传递                          |
  | spring-boot-starter-batch                   | 使用Spring Batch的依赖                                       |
  | spring-boot-starter-cache                   | 使用Spring的缓存依赖                                         |
  | spring-boot-starter-cloud-connectors        | 使用Spring Cloud Connectors，可简化Cloud Foundry和Heroku等云平台中的服务连接 |
  | spring-boot-starter-data-cassandra          | Spring Data Cassandra的依赖                                  |
  | spring-boot-starter-data-cassandra-reactive | 使用Cassandra分布式数据库和Spring Data Cassandra Reactive的依赖 |
  | spring-boot-starter-data-couchbase          | Couchbase的依赖                                              |
  | spring-boot-starter-data-couchbase-reactive | 使用Couchbase面向文档的数据库和Spring Data Couchbase Reactive的依赖 |
  | spring-boot-starter-data-elasticsearch      | Spring Data Elasticsearch的依赖                              |
  | spring-boot-starter-data-jpa                | 使用JPA，默认使用hibernate                                   |
  | spring-boot-starter-data-ldap               | Spring Data LDAP依赖                                         |
  | spring-boot-starter-data-mongodb            | MongoDB依赖                                                  |
  | spring-boot-starter-data-mongodb-reactive   | mongodb和mongodb reactive                                    |
  | spring-boot-starter-data-neo4j              | Spring Data Neo4j依赖                                        |
  | spring-boot-starter-data-redis              | redis依赖                                                    |
  | spring-boot-starter-data-rest               | Spring Data REST公开库                                       |
  | spring-boot-starter-data-solr               | solr依赖                                                     |
  | spring-boot-starter-freemarker              | freemarker依赖                                               |
  | spring-boot-starter-groovy-templates        | 使用Groovy模板视图构建MVC Web应用程序                        |
  | spring-boot-starter-integration             | spring integration依赖                                       |
  | spring-boot-starter-jdbc                    | 使用JDBC和HikariCP连接池                                     |
  | spring-boot-starter-jersey                  | jersey restful依赖                                           |
  | spring-boot-starter-jooq                    | jooq依赖                                                     |
  | spring-boot-starter-json                    | 读写json依赖                                                 |
  | spring-boot-starter-mail                    | 邮件支持                                                     |
  | spring-boot-starter-mustache                | 模板mustache依赖                                             |
  | spring-boot-starter-quartz                  | 调度任务依赖                                                 |
  | spring-boot-starter-security                | 安全依赖                                                     |
  | spring-boot-starter-test                    | 测试依赖                                                     |
  | spring-boot-starter-thymeleaf               | thymeleaf依赖                                                |
  | spring-boot-starter-validation              | 验证依赖                                                     |
  | spring-boot-starter-web                     | web应用和spring mvc依赖                                      |
  | spring-boot-starter-web-services            | webservice依赖                                               |
  | spring-boot-starter-webflux                 | webflux依赖                                                  |
  | spring-boot-starter-websocket               | websocket依赖                                                |

- 实例代码
  - [http://www.broadview.com.cn/book/5374](http://www.broadview.com.cn/book/5374) 页面
  - 创建示例：过程略，代码都在上面的页面上下载。
    1. 降低开发复杂度之面向切面
    2. 并不复杂的持久化
    3. Web开发
    4. 懒人的接口文档管理
    5. 优化的调度
    6. 健康是永恒的主题
    7. 强强联合之整合Dubbo