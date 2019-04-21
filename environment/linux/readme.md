[Linux下搞一个Java开发环境](<https://blog.csdn.net/Howinfun/article/details/81560453>)

1、第一个必须安装JDK啦，随便找一篇文件教你安装就好。
我用到的是JDK1.8。但是这里我必须提醒一个，就是在/etc/profile配置java环境，下面是我的配置：

没错，就是框框里面的path配置，和Window配置一样，JAVA_HOME一定得放在前面！还有JRE_HOME是安装Eclipse用到，等一下会说到。

修改完/etc/profile记得关机或者执行命令source /etc/profile



2、第二个是安装Tomcat：
我用到的是Tomcat9.0，这个也是比较简单的，到官网直接下载然后丢到Linux系统然后解压即可。但是记得是先安装好JDK噢。

当然啦，如果你想修改启动的端口，到安装路径下的conf/server,xml文件修改即可。启动和关闭Tomcat服务的话是在安装路径下的bin文件夹里面，有两个sh脚本，一个是startup.sh，一个是shutdown.sh。查看日志的话到logs文件夹下面去看就好了，这些百度一下就ok。

3、第三个安装的是MySQL：
下载压缩包的地址为：https://dev.mysql.com/downloads/mysql/5.6.html#downloads，自己选择好版本和系统。

关于版本的话，我自己是选择5.6.X的，因为听说5.7挺难搞的，哈哈。

下面有一篇文章，写的挺详细的，可以按照他的去搞。https://www.cnblogs.com/fnlingnzb-learner/p/5830622.html

最后讲到远程连接，假如Window下连接Linux下的mysql服务，最需要注意的一个点就是：关闭防火墙，或者防火墙不阻止mysql的端口号3306（默认）。

4、最后是安装Eclipse。
这个搞了挺久的，下面我会将几个需要注意的点讲一下。

首先，给一个下载压缩包的地址，找这个也费了不少时间呢：https://www.linuxidc.com/Linux/2017-12/149907.htm这里面有下载链接

第二：上面下载Eclipse需要的JDK版本为1.8，如果你系统的JDK不想升级的话，就自己找个低版本的下载。

第三，还记得上面的JRE_HOME吗，因为我试过启动会报这个错：



就是找不到java虚拟机咯，确实，Eclipse解压完后是没有jre这个东西的哇，我们这时候给个软连接就好了。

ln -s $JRE_HOME {eclipse_home}/jre   :这里的｛eclipse_home｝是指eclipse解压后的路径。

这时候再重启就没问题咯。

第四：也有可能启动还是报错的，JVM terminated.Exit.code = 1，这可能是eclipse.ini里面的配置的堆内存太大；饿，需要改一下。-Xms和-Xmx，分别是初始化内存和最大内存。

接下来有时间，我还会继续安装Maven和Git。。。因为从一开始的目的就是将现在的开发环境搬到Linux去。

