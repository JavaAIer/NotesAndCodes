  此页面为临时页面，在后台生成页面后，再刷新本页面 
打开了本页面就是部署成功了

(1)先在后台重新上传图片(在资源管理-图片管理-图片列表里面上传)
(2)编辑数据，比如轮播图，logo等时选择图片
(3)点击后台首页生成按钮生成前台页面，再访问前台网站

后台访问地址：http://127.0.0.1:8080/项目名称/fhadmin/login 

默认后台：http://127.0.0.1:8080/FH-WEB2/fhadmin/login 

[点击进入后台](http://localhost:8080/JaiCms/fhadmin/login)

用户名：admin 
密码 ：1
前台：http://127.0.0.1:8080/项目名称/

默认前台：http://127.0.0.1:8080/FH-WEB2/ 

mysql 支持 5.5 5.6 5.7 版本

链接：http://pan.baidu.com/s/1b9EULo 密码：k49b mysql5.6

请不要直接在数据库修改 密码，密码都是加密过的。登录系统后台进行修改密码

linux下数据库表名设置下忽略大小写

后台修改数据后，先生成下，前台才可以显示

项目数据库链接的配置文件，有两处需要修改，分别是：dbconfig.properties 和 dbfh.properties

我这边是myeclipse2014导出的，别的开发工具的话，如果直接导入不行的话就新建项目，把代码拷贝过去部署

(分别拷贝三个大文件 src resources WebRoot)

通用部署演示视频-eclipse 链接：http://pan.baidu.com/s/1jHDc3Ls 密码：c7b3  