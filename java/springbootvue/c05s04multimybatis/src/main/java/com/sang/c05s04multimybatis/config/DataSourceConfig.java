package com.sang.c05s04multimybatis.config;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;

/**
 * @program:  c05s04multimybatis
 * @description:  
 * @author JavaAIer
 * @date 2019年3月31日
 */
@Configuration
public class DataSourceConfig {

	@Bean
	@ConfigurationProperties("spring.datasource.one")
	DataSource dsOne() {
		return DruidDataSourceBuilder.create().build();
	}
	
	@Bean
	@ConfigurationProperties("spring.datasource.two")
	DataSource dsTwo() {
		return DruidDataSourceBuilder.create().build();
	}
}
