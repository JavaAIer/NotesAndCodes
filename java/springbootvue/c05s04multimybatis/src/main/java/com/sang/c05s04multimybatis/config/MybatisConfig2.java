package com.sang.c05s04multimybatis.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(value = "com.sang.c05s04multimybatis.mapper2", sqlSessionFactoryRef = "sqlSessionFactoryBean2")
public class MybatisConfig2 {
	@Autowired
	@Qualifier("dsTwo")
	DataSource dsTwo;

	@Bean
	SqlSessionFactory sqlSessionFactoryBean2() throws Exception {
		SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
		factoryBean.setDataSource(dsTwo);
		return factoryBean.getObject();
	}

	@Bean
	SqlSessionTemplate sqlSessionTemplate2() throws Exception {
		return new SqlSessionTemplate(sqlSessionFactoryBean2());
	}
}
