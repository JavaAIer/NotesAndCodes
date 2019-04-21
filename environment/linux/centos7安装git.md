[TOC]

## [CentOS 7下安装使用Github](https://www.cnblogs.com/zhuyc110/p/6823023.html)

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



## [git 命令的使用（一） add commit push pull](https://www.cnblogs.com/lovychen/p/5159990.html)

一. commit 和 push 的区别

git作为支持分布式版本管理的工具，它管理的库（repository）分为本地库、远程库。

git commit操作的是本地库，git push操作的是远程库。

git commit是将本地修改过的文件提交到本地库中。

*git push是将本地库中的最新信息发送给远程库。*

git pull命令的作用是，取回远程主机某个分支的更新，再与本地的指定分支合并。它的完整格式稍稍有点复杂。

git pull = git fetch + git merge

注：git add之前，应该先git pull一下；git add 后面是空文件夹的话，添加不上

``` bash
[ch@1httg6tZ crawler]$ cd wcg
[ch@1httg6tZ wcg]$ ls
test2.py  test.py
[ch@1httg6tZ wcg]$ vim test1.py                 #把刚创建的文件添加到git
[ch@1httg6tZ wcg]$ git add test1.py             #添加文件
[ch@1httg6tZ wcg]$ git commit -m 'add new file' #将本地修改的文件提交到本地库中
[master 65ae9e8] add new file                                     
 1 file changed, 1 insertion(+)
 create mode 100644 wcg/test1.py
[ch@1httg6tZ wcg]$ git push                     #把本地保存的信息发送到服务器里面
warning: push.default is unset; its implicit value is changing in
Git 2.0 from 'matching' to 'simple'. To squelch this message
and maintain the current behavior after the default changes, use:

  git config --global push.default matching

To squelch this message and adopt the new behavior now, use:

  git config --global push.default simple

See 'git help config' and search for 'push.default' for further information.
(the 'simple' mode was introduced in Git 1.7.11. Use the similar mode
'current' instead of 'simple' if you sometimes use older versions of Git)

Password for 'https://chenguang@123.56.178.186:8443':
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 364 bytes | 0 bytes/s, done.
Total 4 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1)
remote: Updating references: 100% (1/1)
To https://chenguang@123.56.178.186:8443/r/crawler.git
   c0c026f..65ae9e8  master -> master
[ch@1httg6tZ wcg]$ git pull
Password for 'https://chenguang@123.56.178.186:8443':
Already up-to-date.
[ch@1httg6tZ wcg]$
```

## [Git的add、commit、push命令](https://blog.csdn.net/qq_37577660/article/details/78565899)

简单的代码提交流程

    git status 查看工作区代码相对于暂存区的差别
    git add . 将当前目录下修改的所有代码从工作区添加到暂存区 . 代表当前目录
    git commit -m ‘注释’ 将缓存区内容添加到本地仓库
    git push origin master 将本地版本库推送到远程服务器，
    origin是远程主机，master表示是远程服务器上的master分支，分支名是可以修改的

Git add

 git add [参数] <路径>　作用就是将我们需要提交的代码从工作区添加到暂存区，就是告诉git系统，我们要提交哪些文件，之后就可以使用git commit命令进行提交了。
 为了方便下面都用 . 来标识路径， . 表示当前目录，路径可以修改，下列操作的作用范围都在版本库之内。

    git add .
    不加参数默认为将修改操作的文件和未跟踪新添加的文件添加到git系统的暂存区，注意不包括删除
    git add -u .
    -u 表示将已跟踪文件中的修改和删除的文件添加到暂存区，不包括新增加的文件，注意这些被删除的文件被加入到暂存区再被提交并推送到服务器的版本库之后这个文件就会从git系统中消失了。
    git add -A .
    -A 表示将所有的已跟踪的文件的修改与删除和新增的未跟踪的文件都添加到暂存区。

Git commit

 git commit 主要是将暂存区里的改动给提交到本地的版本库。每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫commit-id，
 commit-id 在版本回退的时候是非常有用的，它相当于一个快照,可以在未来的任何时候通过与git reset的组合命令回到这里.

    git commit -m ‘message’
    -m 参数表示可以直接输入后面的“message”，如果不加 -m参数，那么是不能直接输入message的，而是会调用一个编辑器一般是vim来让你输入这个message，
    message即是我们用来简要说明这次提交的语句。
    git commit -am ‘message’ -am等同于-a -m
    -a参数可以将所有已跟踪文件中的执行修改或删除操作的文件都提交到本地仓库，即使它们没有经过git add添加到暂存区，
    注意: 新加的文件（即没有被git系统管理的文件）是不能被提交到本地仓库的。

Git push

 在使用git commit命令将修改从暂存区提交到本地版本库后，只剩下最后一步将本地版本库的分支推送到远程服务器上对应的分支了，如果不清楚版本库的构成，可以查看我的另一篇，git 仓库的基本结构。
 git push的一般形式为 git push <远程主机名> <本地分支名> <远程分支名> ，例如 git push origin master：refs/for/master ，即是将本地的master分支推送到远程主机origin上的对应master分支， origin 是远程主机名。第一个master是本地分支名，第二个master是远程分支名。

    git push origin master
    如果远程分支被省略，如上则表示将本地分支推送到与之存在追踪关系的远程分支（通常两者同名），如果该远程分支不存在，则会被新建
    git push origin ：refs/for/master
    如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支，等同于 git push origin –delete master
    git push origin
    如果当前分支与远程分支存在追踪关系，则本地分支和远程分支都可以省略，将当前分支推送到origin主机的对应分支
    git push
    如果当前分支只有一个远程分支，那么主机名都可以省略，形如 git push，可以使用git branch -r ，查看远程的分支名

 关于 refs/for：

refs/for 的意义在于我们提交代码到服务器之后是需要经过code review 之后才能进行merge的，而refs/heads 不需要

