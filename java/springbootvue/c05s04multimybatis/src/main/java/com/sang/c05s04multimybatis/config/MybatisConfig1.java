package com.sang.c05s04multimybatis.config;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
@Configuration
@MapperScan(value = "com.sang.c05s04multimybatis.mapper1",sqlSessionFactoryRef="sqlSessionFactoryBean1")
public class MybatisConfig1 {
	@Autowired
	@Qualifier("dsOne")
	DataSource dsOne;
	
	@Bean
	SqlSessionFactory sqlSessionFactoryBean1() throws Exception {
		SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
		factoryBean.setDataSource(dsOne);
		return factoryBean.getObject();
	}


	@Bean
	SqlSessionTemplate sqlSessionTemplate1() throws Exception {
		return new SqlSessionTemplate(sqlSessionFactoryBean1());
	}

}
