# 如何使Hyper-V和VMware共存

在Windows下以管理员身份运行命令提示符->输入命令 bcdedit /copy {current} /d “Windows 10 (Close Hyper-V)” ->成功后提示 已将该项成功复制到{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}，记下{}里的一串代码->输入命令 bcdedit /set {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} hypervisorlaunchtype OFF ，将上面代码替换掉xxx即可->成功后会显示 操作成功完成->再次启动Windows即可手动选择是否启动Hyper-V

在关闭Hyper-V的模式中，即可运行VMware虚拟机，而另一个选项可以运行Hyper-V虚拟机，这样就可以避免为了运行VMware虚拟机而卸载Hyper-V功能了。

---------------------
作者：ForTheDreamSMS 
来源：CSDN 
原文：https://blog.csdn.net/baidu_34045013/article/details/60870519 
版权声明：本文为博主原创文章，转载请附上博文链接！

<https://blog.csdn.net/baidu_34045013/article/details/60870519>