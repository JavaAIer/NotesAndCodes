# 微服务之自动化部署
- 错误实践

  - 手工部署软件
  - 开发完成后才提交部署
  - 生产环境全手工完成配置

- 私有仓库搭建

  - Nexus介绍

    ```mermaid
    graph LR
    A[Maven]-->B[public]
    B-->C[Central]
    C-->|代理|D(中央仓库)
    B-->E(第三方库)
    B-->F(release)
    B-->G(snapshot)
    
    
    ```

  - 安装与配置

  - 在项目中使用

- Ansible

  ![äºè§£ansibleæ¶æä¸å·¥ä½åçäºè§£ansibleæ¶æä¸å·¥ä½åç](https://www.linuxprobe.com/wp-content/uploads/2018/05/Ansible1.png)

- 持续集成
  - 持续集成流程

  - Jenkins介绍与安装

    ![ææ¯åäº"å¾ç](http://image.mamicode.com/info/201808/20180823005858495910.png)

  - Maven介绍

  - Jenkins系统设置

  - 集成Sonar

  - 构建工程

  - 配置测试

- 灰度发布

- 链接

  [Ansible详解](https://www.cnblogs.com/ilurker/p/6421624.html) http://www.cnblogs.com/ilurker/p/6421624.html

  [了解ansible架构与工作原理]( https://www.linuxprobe.com/ansible-formwork-2.html) https://www.linuxprobe.com/ansible-formwork-2.html

  [持续集成工具jenkins的使用](http://www.mamicode.com/info-detail-2422198.html) http://www.mamicode.com/info-detail-2422198.html