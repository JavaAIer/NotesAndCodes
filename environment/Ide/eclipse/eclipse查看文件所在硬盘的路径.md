# eclipse查看文件所在硬盘的路径


  

方法1.在eclipse中嵌入windows自带的explorer.exe，委托它来找到eclipse项目中的文件在硬盘的路径。

（1）Run——External Tools——External Tools Configurations...——双击（或右键Program——New）Program

（2）编辑两个标签页Main和Common：

①Main标签页：（建议复制，以免出错）

 

Location：C:/WINDOWS/explorer.exe

Arguments：${container_loc}

 



 

②Common标签页：

勾上External Tools——Apply——Run



 

（3）点击如下图图标按钮的倒三角找到“打开文件所在位置的”，就会调用windows自带的explorer弹出当前项目中打开的文件所在硬盘位置的窗口。



 

 

方法2.安装eclipse文件查看插件eExplorer。

如果是Eclipse从本地导入的项目包而不是从线上git导入的项目，则强烈建议使用此方法找到代码在硬盘上的真实位置。因为此时，当前代码不在当前工作空间的位置。你所做的代码更改也都在你从本地导入代码的位置，而不是当前的工作空间，当前工作空间也没有代码。是不是很奇怪很长见识？

（1）Help——Eclipse Marketplace——在输入框中输入“explorer”——找到eExplorer——install



（2）Window——Show View——Other...——输入“ex”——找到explorer——OK

打开一个文件就可以在explorer窗口中看到它在硬盘上的路径。

---------------------
作者：ispotu 
来源：CSDN 
原文：https://blog.csdn.net/superit401/article/details/77095762 
版权声明：本文为博主原创文章，转载请附上博文链接！