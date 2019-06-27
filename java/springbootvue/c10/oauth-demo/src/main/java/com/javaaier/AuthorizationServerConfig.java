package com.javaaier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;

/**
 * @BelongsProject: oauth-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-21 16:03
 * @Description: 继承AuthorizationServerConfigurerAdapter, 完成对授权服务器的配置, 然后通过@EnableAuthorizationServer注解开启授权服务器
 */
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
    /**
     * 用来支持password模式
     */
    @Autowired
    AuthenticationManager authenticationManager;
    /**
     * 完成redis缓存,将令牌信息存储到redis缓存中
     */
    @Autowired
    RedisConnectionFactory redisConnectionFactory;
    /**
     * 为刷新token提供支持
     */
    @Autowired
    UserDetailsService userDetailsService;

    /**
     * 加密密码的方式
     *
     * @return
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 配置password授权模式
     *       - authorizedGrantTypes 表示 Oauth2 中的授权模式为 password 和 refresh_token 两种,在标准的oauth2协议中,授权模式并不包括refresh_token,但是在spring security实现中将其归为一种,因此如果要实现access_token的刷新,就需要添加这样一种授权模式:
     *       - accessTokenValiditySeconds 方法配置了access_token的过期时间
     *       - resourceIds 配置了资源id
     *       - secret 配置了加密后的密码,密码明文是123
     * @param clients
     * @throws Exception
     */
    @Override
    public void configure(ClientDetailsServiceConfigurer clients)
            throws Exception {
        clients.inMemory()
                .withClient("password")
                .authorizedGrantTypes("password", "refresh_token")
                .accessTokenValiditySeconds(1800)
                .resourceIds("rid")
                .scopes("all")
                .secret("$2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq");
    }

    /**
     * 配置令牌的存储
     * @param endpoints
     * @throws Exception
     *
     * - authenticationManager 配置password模式
     * - userDetailsService 令牌刷新
     */
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints)
            throws Exception {
        endpoints.tokenStore(new RedisTokenStore(redisConnectionFactory))
                .authenticationManager(authenticationManager)
                .userDetailsService(userDetailsService);
    }

    /**
     * 支持client_id和client_secret做登录认证
     * @param security
     * @throws Exception
     */
    @Override
    public void configure(AuthorizationServerSecurityConfigurer security)
            throws Exception {
        security.allowFormAuthenticationForClients();
    }
}
