[如何在CentOS和RHEL上安装Ruby](<http://www.php.cn/linux-416704.html>)

[Centos7搭建Ruby环境](<https://www.liangzl.com/get-article-detail-18274.html>)

```bash
# 步骤1：安装要求


yum install gcc-c++ patch readline readline-devel zlib zlib-devel \

   libyaml-devel libffi-devel openssl-devel make \

   bzip2 autoconf automake libtool bison iconv-devel sqlite-devel
   
# 获取密钥
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

# 步骤2：安装RVM
curl -sSL https://get.rvm.io | bash -s stable
curl -sSL https://rvm.io/mpapis.asc | gpg2 --import -
curl -sSL https://rvm.io/pkuczynski.asc | gpg2 --import -
curl -L get.rvm.io | bash -s stabl

source /etc/profile.d/rvm.sh
rvm reload

# 查询可用的源 
rvm list known
# 查询现在安装的软件的可用更新
rvm list

#安装 ruby 
rvm install ruby-2.5.1
rvm use 2.5.1 default
ruby -v

gem install redis



   
   
```

