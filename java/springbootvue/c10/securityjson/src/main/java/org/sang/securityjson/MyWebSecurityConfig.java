package org.sang.securityjson;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

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
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("root").password("123").roles("ADMIN", "DBA")
                .and()
                .withUser("admin").password("123").roles("ADMIN", "USER")
                .and()
                .withUser("a").password("b").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity security) throws Exception {
        //开启HttpSecurity 配置
        security.authorizeRequests()
                .antMatchers("/admin/**")
                .hasRole("ADMIN")
                .antMatchers("/user/**")
                .access("hasAnyRole('ADMIN','USER')")
                .antMatchers("/db/**")
                .access("hasRole('ADMIN') and hasRole('DBA')")
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()

                //配置loginPage登录页面，如果用户未获授权就访问一个需要授权才能访问的接口
                //就会自动跳转到login_page页面让用户登录，这个login_page是开发者自定义的
                //登录界面，而不再是spring security提供的默认登录页
                .loginPage("/login_page")

                //loginProcessingUrl表示登录请求处理接口，无论是自定义登录页面还是移动端登录
                //都需要使用该接口
                .loginProcessingUrl("/login")

                //认证所需要的用户名和密码的参数名，默认用户名参数是username,密码参数是password。
                //可以在这儿自定义
                .usernameParameter("name")
                .passwordParameter("passwd")

                //下面定义了登录成功的处理逻辑。用户登录成功后可以跳转到某一页面，也可以
                //返回一段json，这个要看具体的罗男中。下面的代码是返回一段登录成功的json。
                //onAuthenticationSuccess方法的第三个参数一般用来获取当前登录用户的信息，
                //在登录成功后，可以获取当前登录用户的信息一起返回给客户端
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest req,
                                                        HttpServletResponse resp,
                                                        Authentication auth)
                            throws IOException {
                        Object principal = auth.getPrincipal();
                        resp.setContentType("application/json;charset=utf-8");
                        PrintWriter out = resp.getWriter();
                        resp.setStatus(200);
                        Map<String, Object> map = new HashMap<>();
                        map.put("status", 200);
                        map.put("msg", principal);
                        ObjectMapper om = new ObjectMapper();
                        out.write(om.writeValueAsString(map));
                        out.flush();
                        out.close();
                    }
                })
//                .successForwardUrl("/hello")


                //下面代码定义了登录失败的处理逻辑，和登录成功类似。
                //不同的是，登录失败的回调方法里有一个AuthenticationException参数
                //通过这个参数可以获取登录失败的原因，进而给用户一个明确的提示。
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest req,
                                                        HttpServletResponse resp,
                                                        AuthenticationException e)
                            throws IOException {
                        resp.setContentType("application/json;charset=utf-8");
                        PrintWriter out = resp.getWriter();
                        resp.setStatus(401);
                        Map<String, Object> map = new HashMap<>();
                        map.put("status", 401);
                        if (e instanceof LockedException) {
                            map.put("msg", "账户被锁定，登录失败!");
                        } else if (e instanceof BadCredentialsException) {
                            map.put("msg", "账户名或密码输入错误，登录失败!");
                        } else if (e instanceof DisabledException) {
                            map.put("msg", "账户被禁用，登录失败!");
                        } else if (e instanceof AccountExpiredException) {
                            map.put("msg", "账户已过期，登录失败!");
                        } else if (e instanceof CredentialsExpiredException) {
                            map.put("msg", "密码已过期，登录失败!");
                        } else {
                            map.put("msg", "登录失败!");
                        }
                        ObjectMapper om = new ObjectMapper();
                        out.write(om.writeValueAsString(map));
                        out.flush();
                        out.close();
                    }
                })
                .permitAll()
                .and()

                //开启注销的配置
                .logout()
                //表示配置注销登录请求URL为“/logout”，默认也是“/logout”
                .logoutUrl("/logout")
                //表示是否清除身份认证信息，默认为true，表示清除
                .clearAuthentication(true)
                //表示是否使session失效，默认为true
                .invalidateHttpSession(true)
                //配置一个Logouthandler，开发者可以在logouthandler中完成一些数据清除工作
                //例如cookie的清除。spring security提供了一些常见的实现。
                .addLogoutHandler(new LogoutHandler() {
                    @Override
                    public void logout(HttpServletRequest req,
                                       HttpServletResponse resp,
                                       Authentication auth) {

                    }
                })
                //可以在下面处理注销成功后的业务逻辑，例如返回一段json提示或跳转到登录界面
                .logoutSuccessHandler(new LogoutSuccessHandler() {
                    @Override
                    public void onLogoutSuccess(HttpServletRequest req,
                                                HttpServletResponse resp,
                                                Authentication auth)
                            throws IOException {
                        resp.sendRedirect("/login_page");
                    }
                })
                .and()
                .csrf()
                .disable();
    }
}


/***
 *
 * http://localhost:8080/login?name=admin&passwd=123
 *
 * {
 *   "msg": {
 *     "password": null,
 *     "username": "admin",
 *     "authorities": [
 *       {
 *         "authority": "ROLE_ADMIN"
 *       },
 *       {
 *         "authority": "ROLE_USER"
 *       }
 *     ],
 *     "accountNonExpired": true,
 *     "accountNonLocked": true,
 *     "credentialsNonExpired": true,
 *     "enabled": true
 *   },
 *   "status": 200
 * }
 */
/***
 *  http://localhost:8080/login?name=admin&passwd=12345
 *  {
 *     "msg": "账户名或密码输入错误，登录失败!",
 *     "status": 401
 * }
 *
 */
