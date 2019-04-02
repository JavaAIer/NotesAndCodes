[如何在 CentOS 上启用 软件集 Software Collections（SCL）](<https://linux.cn/article-6776-1.html>)



```
sudo yum install centos-release-SCL
yum install scl-utils-build
yum --disablerepo="*" --enablerepo="scl" list available
```

