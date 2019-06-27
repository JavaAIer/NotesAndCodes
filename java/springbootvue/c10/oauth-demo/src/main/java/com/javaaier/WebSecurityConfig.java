package com.javaaier;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @BelongsProject: oauth-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-21 16:45
 * @Description: 配置spring security
 * 两个bean的作用是注入授权服务器配置内中使用.
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    @Override
    protected UserDetailsService userDetailsService() {
        return super.userDetailsService();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin")
                .password("$2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq")
                .roles("admin")
                .and()
                .withUser("sang")
                .password("$2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq")
                .roles("user");
    }

    @Override

    /**
     * 配置/oauth/**模式的url,这一类请求直接放行.
     * 在srping security 配置和 资源服务器配置中,一共涉及两个httpsecurity,其中spring security的配置优先级高于资源服务器的配置.
     * 即资源先经过 spring security 的 httpsecurity,再经过 资源服务器的httpsecurity.
     */
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/oauth/**").authorizeRequests()
                .antMatchers("/oauth/**").permitAll()
                .and().csrf().disable();
    }
}
