package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import java.nio.charset.Charset;
import java.util.List;

/**
 * @BelongsProject: validattion-demo
 * @BelongsPackage: com.example.config
 * @Author:
 * @CreateTime: 2019-07-02 10:24
 * @Description: Mvc配置类
 */
public class WebMvcConfig extends WebMvcConfigurationSupport {

    @Bean
    public HttpMessageConverter<String> responseBodyConverter() {
        return new StringHttpMessageConverter(Charset.forName("UTF-8"));
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(responseBodyConverter());
        // 这里必须加上加载默认转换器，不然bug玩死人，并且该bug目前在网络上似乎没有解决方案
        // 百度，谷歌，各大论坛等。你可以试试去掉。
        addDefaultHttpMessageConverters(converters);
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.favorPathExtension(false);
    }

}