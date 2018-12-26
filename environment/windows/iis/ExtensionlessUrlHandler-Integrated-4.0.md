[处理程序“ExtensionlessUrlHandler-Integrated-4.0”在其模块列表中有一个错误模块“ManagedPipelineHandler”](https://www.cnblogs.com/mrma/p/3529859.html)

IIS上部署MVC网站，打开后ExtensionlessUrlHandler-Integrated-4.0解决办法
IIS上部署MVC网站，打开后ExtensionlessUrlHandler-Integrated-4.0解决方法

IIS上部署MVC网站，打开后500错误：处理程序“ExtensionlessUrlHandler-Integrated-4.0”在其模块列表中有一个错误模块“ManagedPipelineHandler” 

 解决方法如下：

 

 

以管理员运行下面的命令注册：

32位机器：

>  C:\Windows\Microsoft.NET\Framework\v4.0.30319\aspnet_regiis.exe -i

64位机器：

>  C:\Windows\Microsoft.NET\Framework64\v4.0.30319\aspnet_regiis.exe -i



后续：

C:\WINDOWS\system32>C:\Windows\Microsoft.NET\Framework64\v4.0.30319\aspnet_regiis.exe -i
Microsoft (R) ASP.NET RegIIS 版本 4.0.30319.0
用于在本地计算机上安装和卸载 ASP.NET 的管理实用工具。
版权所有(C) Microsoft Corporation。保留所有权利。
开始安装 ASP.NET (4.0.30319.0)。
此操作系统版本不支持此选项。管理员应使用“打开或关闭 Windows 功能”对话框、“服务器管理器”管理工具或 dism.exe 命令行工 具安装/卸载包含 IIS8 的 ASP.NET 4.5。有关更多详细信息，请参见 http://go.microsoft.com/fwlink/?LinkID=216771。
ASP.NET (4.0.30319.0)安装完毕。

- 在iis里面添加
  - asp.net 3.5
  - asp.net 4.5