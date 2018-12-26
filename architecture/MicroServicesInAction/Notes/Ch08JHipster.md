# 微服务之JHipster

- JHipster技术列表
  - 客户端选项

    - 单页面程序

    ​	Angular 5 or React
    ​	Bootstrap响应式布局
    ​	HTML5 模板
    ​	兼容ie11和现代游览器
    ​	国际化支持
    ​	scss
    ​	支持 Spring WebSocket

    - 开发工具
      ​	支持yarn 安装依赖
      ​	支持webpack 开发
      ​	支持Jest 和 Protractor 测试框架
    - 同时也支持后端Thymeleaf渲染

  - 服务端选项

    Spring Boot 简化配置
    Maven or Gradle 构建工具, 测试并运行应用
    spring profiles 开发环境和生产环境 (Maven and Gradle)
    Spring Security 安全管理框架
    Spring MVC REST + Jackson
    可选的 WebSocket 支持 with Spring Websocket
    Spring Data JPA + Bean Validation
    Liquibase 数据库版本管理
    Elasticsearch 搜索引擎
    MongoDB and Couchbase no-sql 数据库支持
    Kafka 支持
    可选的微服务组件
    ELK应用监测
    ehcache hazelcast or Infinispan 缓存
    logback 日志管理
    HikariCP 连接池(号称最快的连接池)

  - 部署选项

    docker 打包支持
    标准 war jar 打包支持
    主要的微服务提供AWS, Cloud Foundry, Heroku, Kubernetes, OpenShift, Docker…

- Angular简介

  AngularJS诞生于2009年，由Misko Hevery 等人创建，后为Google所收购。是一款优秀的前端JS框架，已经被用于Google的多款产品当中。AngularJS有着诸多特性，最为核心的是：MVC、模块化、自动化双向数据绑定、语义化标签、依赖注入等等。

  ![img](https://upload-images.jianshu.io/upload_images/2024647-f55b22de51b5ba1e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/838/format/webp)

- 快速开始JHipster
  - 安装
  - 使用
  - 构建单体应用
  - Entity sub-generator
  - 开发和运行
  - 插件安装

- 目录结构

- 构建微服务应用
  - 注册中心

  - 创建微服务网关

    ![img](https://upload-images.jianshu.io/upload_images/3807139-637d845e4963d6d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

  - Traefik

  - JHipster UAA

    ![img](https://images2018.cnblogs.com/blog/1428428/201809/1428428-20180902081904821-816101494.png)

  - 构建微服务应用

- 基础配置
  - JHipster属性配置
  - 作为Maven项目
  - 数据库
  - DTO
  - 分页
  - 文档

- 参考

  [JHipster 基础使用  ](https://blog.csdn.net/isyoungboy/article/details/81624681) https://blog.csdn.net/isyoungboy/article/details/81624681

  [Angular简介和入门](https://blog.csdn.net/ITzhongzi/article/details/68646274) https://blog.csdn.net/ITzhongzi/article/details/68646274

  [Angular 4.0架构详解](https://www.jianshu.com/p/3c06260e6015) https://www.jianshu.com/p/3c06260e6015

  [JHipster 微服务搭建](https://www.jianshu.com/p/d3e6d2d73199) https://www.jianshu.com/p/d3e6d2d73199

  [JHipster技术栈理解 - UAA原理分析](https://www.cnblogs.com/yorkwu/p/9572151.html) https://www.cnblogs.com/yorkwu/p/9572151.html

