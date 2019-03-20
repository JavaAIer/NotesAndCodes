# 完整示例

- 安装Lombok

  Lombok 是一种 Java™ 实用工具，可用来帮助开发人员消除 Java 的冗长，尤其是对于简单的 Java 对象（POJO）。它通过注解实现这一目的。

- PiggyMetrics示例

  Piggy Metrics，一个供个人处理财务的解决方案，是一款概念性的应用程序，基于Spring Boot，Spring Cloud和Docker 简单演示了微服务的架构模式，除此以外，它还有一个非常漂亮整洁的用户界面。

  ![è¿éåå¾çæè¿°](https://cloud.githubusercontent.com/assets/6069066/13900465/730f2922-ee20-11e5-8df0-e7b51c668847.png)

  **账户服务** 
  包含一般用户输入逻辑和验证：收入/费用项目，储蓄和帐户设置。

  | Method | Path                | Description                                                  | User authenticated | Available from UI |
  | ------ | ------------------- | ------------------------------------------------------------ | ------------------ | ----------------- |
  | GET    | /accounts/{account} | 获取指定的帐户数据                                           |                    |                   |
  | GET    | /accounts/current   | 获取当前帐户数据                                             | ×                  | ×                 |
  | GET    | /accounts/demo      | 获取[模拟](https://www.baidu.com/s?wd=%E6%A8%A1%E6%8B%9F&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)账户数据（预填收入/费用项目等） |                    | ×                 |
  | PUT    | /accounts/current   | 保存当前帐户数据                                             | ×                  | ×                 |
  | POST   | /accounts/          | 注册新帐号                                                   |                    | ×                 |

  **统计服务** 
  对主要统计参数执行计算，并为每个帐户的时间序列。数据点包含[基准货币](https://www.baidu.com/s?wd=%E5%9F%BA%E5%87%86%E8%B4%A7%E5%B8%81&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)和时间段的值。此数据用于跟踪帐户生命周期中的现金流动动态（尚未在UI中实现的花式图表）。

  | Method | Path                  | Description                                                  | User authenticated | Available from UI |
  | ------ | --------------------- | ------------------------------------------------------------ | ------------------ | ----------------- |
  | GET    | /statistics/{account} | 获取指定的帐户统计信息                                       |                    |                   |
  | GET    | /statistics/current   | 获取当前帐户统计信息                                         | ×                  | ×                 |
  | GET    | /statistics/demo      | 获取[模拟](https://www.baidu.com/s?wd=%E6%A8%A1%E6%8B%9F&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)帐户统计信息 |                    | ×                 |
  | PUT    | /statistics/{account} | 创建或更新指定帐户的时间序列数据点                           |                    |                   |

  **通知服务** 
  存储用户联系信息和通知设置（如提醒和备份频率）。计划工作人员从其他服务收集所需的信息，并向订阅的客户发送电子邮件。

  | Method | Path                            | Description            | User authenticated | Available from UI |
  | ------ | ------------------------------- | ---------------------- | ------------------ | ----------------- |
  | GET    | /notifications/settings/current | 获取当前的帐户通知设置 | ×                  | ×                 |
  | PUT    | /notifications/settings/current | 保存当前帐户通知设置   | ×                  | ×                 |

- 整体架构

  ![è¿éåå¾çæè¿°](https://cloud.githubusercontent.com/assets/6069066/13906840/365c0d94-eefa-11e5-90ad-9d74804ca412.png)

- 参考

  [学习Spring Boot：（十五）使用Lombok来优雅的编码](https://www.cnblogs.com/qnight/p/8997493.html)

  [基于Spring Boot、Spring Cloud、Docker的微服务系统架构实践](https://blog.csdn.net/rickiyeat/article/details/60792925)