package com.javaaier.config;

import com.baomidou.mybatisplus.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @BelongsProject: lombok-druid-mybatisplus
 * @BelongsPackage: com.javaaier.config
 * @Author:
 * @CreateTime: 2019-06-20 11:23
 * @Description: Mybatis-plus 配置类
 */
@Configuration
@MapperScan("com.javaaier.mapper")
public class MybatisPlusConfig {

    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
