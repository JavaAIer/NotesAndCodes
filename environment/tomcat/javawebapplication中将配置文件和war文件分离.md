### [java web application中将配置文件和.war文件分离](https://panyongzheng.iteye.com/blog/2165042)


http://blog.sina.com.cn/s/blog_6b19f21d01015594.html 

将webapp的配置文件存放于生成的.war文件中会造成部署中的很多不便， 

尤其是在升级的时候。 

下面提供一种简单的方法将配置文件从.war中分离出去。 

1. 在WEB-INF/web.xml中定义一个context-param元素，指向配置文件的本地路径， 

   例如： 

```xml
<contex-param>    
  <param-name>customConfigDir</param-name>  
  <param-value>file:/usr/local/webapp_conf/registryService</param-value>  
</context-param>  
```



2. 在spring中配置property configurer 

``` xml
<bean id="propertyConfigurer"     
      class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">  
  <property name="locations">  
    <list>   
      <value>${customConfigDir}/jdbc.properties</value>  
    </list>   
  </property>   
</bean>   
```



OK，完成，很简单。 

如果部署人员需要自定义配置目录，则可以修改webapp的Context Descriptor。以tomcat为例： 

在如下目录${CATALINA_HOME}/conf/Catalina/localhost/下建立[webapp_name].xml，这里是 

registryService.xml，内容如下： 

``` xml
<?xml version="1.0" encoding="UTF-8"?>  
<Context>  
  <Parameter name="customConfigDir" value="classpath:" override="false"/>  
</Context>  
```

