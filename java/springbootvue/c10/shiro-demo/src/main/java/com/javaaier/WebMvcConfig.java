package com.javaaier;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @BelongsProject: shiro-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-24 17:53
 * @Description: WebMvc配置类
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/index").setViewName("index");
        registry.addViewController("/unauthorized").setViewName("unauthorized");
    }
}
