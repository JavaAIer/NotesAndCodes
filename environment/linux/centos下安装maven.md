[TOC]

maven的作用：统一开发规范。

maven是一个项目构建和管理的工具，提供了帮助管理 构建、文档、报告、依赖、scms、发布、分发的方法。可以方便的编译代码、进行依赖管理、管理二进制库等等。
maven的好处在于可以将项目过程规范化、自动化、高效化以及强大的可扩展性
利用maven自身及其插件还可以获得代码检查报告、单元测试覆盖率、实现持续集成等等。

方便拆分项目，将一个个package拆成子项目maven project，方便分工协作、管理和发布版本（一个project中的bug修复了，不用整个发布，只要发布一个）。

通过添加依赖精确定位dependency（jar包命名空间、名称、版本）的方式来定义本项目中使用了哪个api（jar包），规范了开发人员的api版本。

对开发目录有要求，规范了开发人员的代码目录规范。

## 安装maven

```bash
mkdir /usr/local/maven
cd /usr/local/maven
wget http://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.6.1/binaries/apache-maven-3.6.1-bin.tar.gz
tar -zxvf apache-maven-3.6.1-bin.tar.gz
cp -r /usr/local/maven/apache-maven-3.6.1/. /usr/local/maven/
rm apache-maven-3.6.1 -rf
rm apache-maven-3.6.1-bin.tar.gz
vim /etc/profile
source /etc/profile
mvn -v
```

```properties
#把maven配置加入环境变量
export M2_HOME=/usr/local/maven
export PATH=$PATH:$JAVA_HOME/bin:$M2_HOME/bin

```



## 修改maven仓库地址、国内仓库地址：阿里云

```
 vim /usr/local/maven/conf/settings.xml
 
```

``` xml
<localRepository>/usr/local/maven/repo</localRepository>

......
<mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
</mirror>
```

