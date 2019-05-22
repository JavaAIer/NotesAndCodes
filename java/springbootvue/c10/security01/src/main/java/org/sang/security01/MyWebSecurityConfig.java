package org.sang.security01;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class MyWebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    /* 第一步时用的用户名和密码配置如下
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin").password("123").roles("ADMIN", "USER")
                .and()
                .withUser("a").password("b").roles("USER");
    }
     */

    @Override
    protected  void configure (AuthenticationManagerBuilder auth) throws Exception{
        auth.inMemoryAuthentication()
                .withUser("root").password("123").roles("ADMIN","DBA")
                .and()
                .withUser("admin").password("123").roles("ADMIN","USER")
                .and()
                .withUser("a").password("b").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity security) throws Exception {
        //开启HttpSecurity 配置
        security.authorizeRequests()
                //能够访问“/admin/**”模式URL必须具备ADMIN的角色
                .antMatchers("/admin/**")
                .hasRole("ADMIN")

                //能够 访问“/user/**”模式URL的用户必须具备ADMIN或USER的角色
                .antMatchers("/user/**")
                .access("hasAnyRole('ADMIN','USER')")

                //能够 访问“/db/**”模式URL的用户必须具备ADMIN和DBA的角色
                .antMatchers("/db/**")
                .access(" hasRole('ADMIN')  and hasRole('DBA')")

                //除了前面定义的URL模式，用户访问其他URL都必须认证后访问（要先登录）
                .anyRequest()
                .authenticated()

                //开启表单登录，同时配置了登录接口为“/login”，
                // 即可以直接调用“/login”发起一个POST请求进行登录
                //登录参数中用户名必须命名为“username”，密码必须命名为“password”。
                //配置loginProcessingUrl接口主要是方便Ajax或移动端调用登录接口。
                .and()
                .formLogin()
                .loginProcessingUrl("/login")

                //表示和登录相关的接口都不需要认证即可访问
                .permitAll()
                .and()

                //关闭csrf
                .csrf()
                .disable();
    }
}
