package com.javaaier;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

/**
 * @BelongsProject: oauth-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-21 16:40
 * @Description:
 *  继承 ResourceServerConfigurerAdapter 并开启@EnableResourceServer资源服务器配置
 *
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig  extends ResourceServerConfigurerAdapter {
    /**
     * 配置资源id,这里的资源id和授权服务器中的资源id一致,然后设置这些资源仅基于令牌认证.
     * @param resources
     * @throws Exception
     */
    @Override
    public void configure(ResourceServerSecurityConfigurer resources)
            throws Exception {
        resources.resourceId("rid").stateless(true);
    }

    /**
     * 配置httpsecurity
     * @param http
     * @throws Exception
     */
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/admin/**").hasRole("admin")
                .antMatchers("/user/**").hasRole("user")
                .anyRequest().authenticated();
    }
}
