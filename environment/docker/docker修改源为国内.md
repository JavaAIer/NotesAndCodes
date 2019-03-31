# 修改docker-仓库资源地址Error response from daemon: Get https://index.docker.io/v1/search

2017年10月23日 15:31:53 [松门一枝花](https://me.csdn.net/zengmingen) 阅读数：17615

<https://blog.csdn.net/zengmingen/article/details/78319334>



 版权声明：有问题咨询请发邮件zengmiaogen@126.com。CSDN的留言和私信不好使。 https://blog.csdn.net/zengmingen/article/details/78319334



[root@zengmg /]# docker search centos
Error response from daemon: Get https://index.docker.io/v1/search?q=centos: read tcp 52.200.132.201:443: i/o timeout



docker在中国已经有了仓库：<https://www.docker-cn.com/registry-mirror>



根据上面网站提供的修改方法。



进入/etc/docker

查看有没有 daemon.json。这是docker默认的配置文件。

如果没有新建，如果有，则修改。



[root@zengmg docker]# vi daemon.json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}

保存退出。



重启docker服务

service docker restart

成功！



[root@zengmg docker]# docker search centos
NAME                               DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
centos                             The official build of CentOS.                   3732      [OK]       
ansible/centos7-ansible            Ansible on Centos7                              102                  [OK]
jdeathe/centos-ssh                 CentOS-6 6.9 x86_64 / CentOS-7 7.4.1708 x8...   87                   [OK]
tutum/centos                       Simple CentOS docker image with SSH access      33                   
imagine10255/centos6-lnmp-php56    centos6-lnmp-php56                              31                   [OK]
gluster/gluster-centos             Official GlusterFS Image [ CentOS-7 +  Glu...   20                   [OK]
kinogmt/centos-ssh                 CentOS with SSH                                 17                   [OK]
centos/php-56-centos7              Platform for building and running PHP 5.6 ...   10                   
openshift/base-centos7             A Centos7 derived base image for Source-To...   10                   
centos/python-35-centos7           Platform for building and running Python 3...   9                    
openshift/mysql-55-centos7         DEPRECATED: A Centos7 based MySQL v5.5 ima...   6                    
openshift/jenkins-2-centos7        A Centos7 based Jenkins v2.x image for use...   5                    
openshift/ruby-20-centos7          DEPRECATED: A Centos7 based Ruby v2.0 imag...   3                    
darksheer/centos                   Base Centos Image -- Updated hourly             3                    [OK]
indigo/centos-maven                Vanilla CentOS 7 with Oracle Java Developm...   1                    [OK]
openshift/php-55-centos7           DEPRECATED: A Centos7 based PHP v5.5 image...   1                    
pivotaldata/centos-gpdb-dev        CentOS image for GPDB development. Tag nam...   1                    
pivotaldata/centos-mingw           Using the mingw toolchain to cross-compile...   1                    
miko2u/centos6                     CentOS6 æ—¥æœ¬èªžç’°å¢ƒ                                   1                    [OK]
blacklabelops/centos               CentOS Base Image! Built and Updates Daily!     1                    [OK]
smartentry/centos                  centos with smartentry                          0                    [OK]
pivotaldata/centos                 Base centos, freshened up a little with a ...   0                    
openshift/wildfly-101-centos7      A Centos7 based WildFly v10.1 image for us...   0                    
jameseckersall/sonarr-centos       Sonarr on CentOS 7                              0                    [OK]
pivotaldata/centos-gcc-toolchain   CentOS with a toolchain, but unaffiliated ...   0                    
[root@zengmg docker]# 