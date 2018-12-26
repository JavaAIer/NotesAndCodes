## [不能在此路径中使用此配置节。如果在父级别上锁定了该节,便会出现这种情况](https://www.cnblogs.com/jxxy2012nw/p/5629225.html)

不能在此路径中使用此配置节。如果在父级别上锁定了该节,便会出现这种情况。锁定


在全新安装的IIS7下搭建网站，访问页面时出现错误信息如下：

配置错误 不能在此路径中使用此配置节。如果在父级别上锁定了该节，便会出现这种情况。锁定是默认设置的(overrideModeDefault="Deny")，或者是通过包含 overrideMode="Deny" 或旧有的 allowOverride="false" 的位置标记明确设置的。 
 配置文件 \\?\X(盘符):\目录名\目录名\web.config

```xml
 <system.webServer>
         <handlers>
             <add name="isa_rewrite" path="*" verb="*" modules="IsapiModule" scriptProcessor="C:\Windows\Microsoft.NET\Framework\v2.0.50727\aspnet_isapi.dll" resourceType="Unspecified" requireAccess="None" preCondition="classicMode,runtimeVersionv2.0,bitness32" />
         </handlers>
  </system.webServer>
```




 配置源

```bash
   104:   </modules>
   105:  <handlers>               '//（这里红色标记）
   106:    <add name="isa_rewrite" path="*" verb="*" modules="IsapiModule" scriptProcessor="C:\Windows\Microsoft.NET\Framework\v2.0.50727\aspnet_isapi.dll" resourceType="Unspecified" requireAccess="None" preCondition="classicMode,runtimeVersionv2.0,bitness32" />
```





解决办法： 

出现这个错误是因为 IIS 7 采用了更安全的 web.config 管理机制，默认情况下会锁住配置项不允许更改。要取消锁定可以以管理员身份运行命令行 

>  %windir%\system32\inetsrv\appcmd unlock config -section:system.webServer/handlers

 。其中的 handlers 是错误信息中红字显示的节点名称。

如果modules也被锁定，可以运行

> %windir%\system32\inetsrv\appcmd unlock config -section:system.webServer/modules



注意：要以管理员身份运行才可以，默认不是管理员身份，方法，在开始菜单中的搜索程序与文件输入CMD，就会在上方出现一个CMD.EXE，在这个CMD.EXE文件上点击键，选择“以管理员身份运行”，打开命令行窗口，输入以上命令即可。
 另外，如果使用Asp.net的朋友，在安装IIS7的时候一定记得勾选Asp.net，默认不选，也会出现类似的错误信息