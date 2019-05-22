关掉csrf 原文：[security禁用csrf](https://blog.csdn.net/icanactnow2/article/details/53515844) 

```java
项目中启用了 security，post请求无法通过，页面报错如下：

搜了下CSRF

CSRF（Cross-site request forgery跨站请求伪造，也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。为了防止跨站提交攻击，通常会配置csrf。

原因找到了：Spring Security 3默认关闭csrf，Spring Security 4默认启动了csrf。

解决方案：

如果不采用csrf，可禁用security的csrf

java注解方式配置：



加上 .csrf().disable()即可。
```

[Security关闭CSRF]()

问题
在项目中添加了Security模块后，在发送post请求时会失败，出现以下日志：

>  Invalid CSRF token found for ...

原因
在Security的默认拦截器里，默认会开启CSRF处理，判断请求是否携带了token，如果没有就拒绝访问。并且，在请求为(GET|HEAD|TRACE|OPTIONS)时，则不会开启，可参考如下源码：

``` java
// 先从tokenRepository中加载token  
  CsrfToken csrfToken = tokenRepository.loadToken(request);  
  final boolean missingToken = csrfToken == null;  
  // 如果为空，则tokenRepository生成新的token，并保存到tokenRepository中  
  if(missingToken) {  
      CsrfToken generatedToken = tokenRepository.generateToken(request);  
      // 默认的SaveOnAccessCsrfToken方法，记录tokenRepository，  
      // tokenRepository，response，获取token时先将token同步保存到tokenRepository中  
      csrfToken = new SaveOnAccessCsrfToken(tokenRepository, request, response, generatedToken);  
  }  
  // 将token写入request的attribute中，方便页面上使用  
  request.setAttribute(CsrfToken.class.getName(), csrfToken);  
  request.setAttribute(csrfToken.getParameterName(), csrfToken);  

  // 如果不需要csrf验证的请求，则直接下传请求（requireCsrfProtectionMatcher是默认的对象，对符合^(GET|HEAD|TRACE|OPTIONS)$的请求不验证）  
  if(!requireCsrfProtectionMatcher.matches(request)) {  
      filterChain.doFilter(request, response);  
      return;  
  }  

  // 从用户请求中获取token信息  
  String actualToken = request.getHeader(csrfToken.getHeaderName());  
  if(actualToken == null) {  
      actualToken = request.getParameter(csrfToken.getParameterName());  
  }  
  // 验证，如果相同，则下传请求，如果不同，则抛出异常  
  if(!csrfToken.getToken().equals(actualToken)) {  
      if(logger.isDebugEnabled()) {  
          logger.debug("Invalid CSRF token found for " + UrlUtils.buildFullRequestUrl(request));  
      }  
      if(missingToken) {  
          accessDeniedHandler.handle(request, response, new MissingCsrfTokenException(actualToken));  
      } else {  
          accessDeniedHandler.handle(request, response, new InvalidCsrfTokenException(csrfToken, actualToken));  
      }  
      return;  
  }  

  filterChain.doFilter(request, response);  
```



解决
既然是因为默认开启了CSRF，那关掉便是，我本地使用springboot，只需在WebSecurityConfigurerAdapter的配置类的http中关闭：


--------------------- 

``` java
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        ...
        http.csrf().disable()
        ...
    }
 }
```



