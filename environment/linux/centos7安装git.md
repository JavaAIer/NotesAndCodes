[TOC]

[CentOS 7下安装使用Github](https://www.cnblogs.com/zhuyc110/p/6823023.html)

``` bash
# 首先安装git
yum install git
# 生成ssh key：接下来一路回车采用默认设置。
ssh-keygen -t rsa -C "xxx@xxx.com"
#查看ssh公钥文件内容
#默认在/root/.ssh/id_rsa.ssh 复制文件中全部内容
#在github上 -- Personal settings -- SSH and GPG keys -- New SSH key
#Title就是这个key的名字/标记
#Key里把公钥文件里的所有内容粘贴进去
#测试ssh key是否成功
ssh -T git@github.com
#， 如果提示You’ve successfully authenticated, but GitHub does not provide shell access， 说明成功了。
#配置git
git config --global user.email "邮箱@xx.xx"
git config --global user.name "你的名字（三叶（滑稽"
#上传工程
#在github上创建一个新的repository
#初始化环境：cd到工程目录，
git init
#把所有文件都加进来： 
git add .
#提交：
git commit -m "我是注释"
remote：git remote origin 仓库网址
push：git push -u origin master
```

克隆

``` bash
cd /root/Documents
mkdir GitWorks
cd GitWorks

git clone git@github.com:JavaAIer/NotesAndCodes
```

