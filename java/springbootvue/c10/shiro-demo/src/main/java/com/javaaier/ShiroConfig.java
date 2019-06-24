package com.javaaier;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.realm.text.TextConfigurationRealm;
import org.apache.shiro.spring.web.config.DefaultShiroFilterChainDefinition;
import org.apache.shiro.spring.web.config.ShiroFilterChainDefinition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @BelongsProject: shiro-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-24 17:31
 * @Description: Shiro配置类啊
 */
@Configuration
public class ShiroConfig {
    /**
     * Realm可以是自定义Realm,也可以是Shiro提供的Realm.
     * 本案例没有配置数据库连接,这里直接配置了两个用户:
     *  sang/123,admin/123
     *  分别对应角色 user和admin,user具有read权限,admin则具有read,write权限
     * @return
     */
    @Bean
    public Realm realm() {
        TextConfigurationRealm realm = new TextConfigurationRealm();
        realm.setUserDefinitions("sang=123,user\n admin=123,admin");
        realm.setRoleDefinitions("admin=read,write\n user=read");
        return realm;
    }

    /**
     * 配置了基本的过滤规则,"login"和"dologin"可以匿名访问
     * "logout"是一个注销登录请求,其余请求则都需要认证后才能访问
     * @return
     */
    @Bean
    public ShiroFilterChainDefinition shiroFilterChainDefinition() {
        DefaultShiroFilterChainDefinition chainDefinition =
                new DefaultShiroFilterChainDefinition();
        chainDefinition.addPathDefinition("/login", "anon");
        chainDefinition.addPathDefinition("/doLogin", "anon");
        chainDefinition.addPathDefinition("/logout", "logout");
        chainDefinition.addPathDefinition("/**", "authe");
        return chainDefinition;
    }

    /**
     * 此Bean是为了支持在Thymeleaf中使用Shiro标签而提供
     * 如果不在Thymeleaf中使用Shiro标签,则可以不提供ShiroDialect
     * @return
     */
    @Bean
    public ShiroDialect shiroDialect() {
        return new ShiroDialect();
    }
}
