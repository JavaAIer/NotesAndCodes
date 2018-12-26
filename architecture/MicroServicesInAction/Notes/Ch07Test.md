# 微服务之自动化测试与质量管理

- 微服务的挑战

  - 系统依赖性增加
  - 并行开发
  - 与传统测试冲突
  - 更多潜在的故障
  - 更多的团队交互

- 微服务测试分层：上面接近业务和最终用户，下面接近开发

  - UI/UI测试
  - 端对端测试
  - API测试
  - 组件接口测试
  - 单元测试

- 单元测试：

  - 三个步骤
    - 准备测试环境和数据
    - 执行目标方法
    - 验证执行结果（判断程序的运行结果是否如你所愿）
  - 评估指标：
    - 行覆盖率
    - 分支覆盖率
    - 路径覆盖率
    - 条件覆盖率
    - 状态机覆盖率
  - Junit框架常用注解
    - @BeforeClass ：在所有测试方法前执行一次，一般在其中写上整体初始化的代码
    - @AfterClass：在所有测试方法后执行一次，一般在其中写上销毁和释放资源的代码
    - @Before：在每个测试方法前执行，一般用来初始化方法
    - @After：在每个测试方法后执行，在方法执行完成后要做的事情
    - @Test(timeout=1000)：测试方法执行超过1000毫秒算超时，测试失败
    - @Test(expected=Exception.class)：测试方法期望得到的异常类，如果方法执行没有抛出指定的异常，则测试失败
    - @Ignore("not ready yet")：执行测试时将忽略掉此方法，如果用于修饰类，则忽略整个类
    - @RunWith：选择具体的Runner来测试代码
  - Mockito:模拟框架

- API测试：

  - Postman和Hichhiker

    | 功能         | Hitchhiker            | Postman                   |
    | ------------ | --------------------- | ------------------------- |
    | 协作性       | √                     | 通过Share,Pro收费         |
    | 脚本         | √强，可以上传脚本     | √一般，只能用内置的脚本库 |
    | Schedule     | √                     | √需要借助Newman,Jenkins   |
    | 数据对比     | √                     | ×                         |
    | 压力测试     | √                     | ×                         |
    | 参数化请求   | √                     | ×                         |
    | 文档         | ×模板化的文档在计划中 | √固定格式                 |
    | API mock     | ×                     | √                         |
    | 细节，稳定性 | 一般，待加强          | 强                        |
    | 安全性       | 强，本地部署          | 弱，数据上传              |

  - Jmeter

    ​	一款专门用于功能测试和压力测试的轻量级测试开发平台。

  - Hitchhiker:压力测试

- A/B测试：分离测试

  - 核心思想
    - 多个方案并行测试
    - 每个方案只有一个变量不同
    - 以某种规则优胜劣汰

- 冒烟和回归测试：Smoke Test

  - 自动化回归测试：Postman+Newman+Jenkins

- 静态代码分析

  - CheckStyle
  - FindBugs
  - PMD

- 质量监控:SonarQube

  ![**SonarQube主要工作流程：**](https://img-blog.csdnimg.cn/20181126150309510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p1b3pld2Vp,size_16,color_FFFFFF,t_70)




- 参考

  [Jenkins+SonarQube+Gitlab搭建自动化持续代码扫描质量平台](https://blog.csdn.net/zuozewei/article/details/84539396) https://blog.csdn.net/zuozewei/article/details/84539396