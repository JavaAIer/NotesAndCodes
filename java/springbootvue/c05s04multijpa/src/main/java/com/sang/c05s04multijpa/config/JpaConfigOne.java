package com.sang.c05s04multijpa.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.Resource;
import javax.sql.DataSource;



@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.sang.c05s04multijpa.dao1",
        entityManagerFactoryRef = "entityManagerFactoryBeanOne",
        transactionManagerRef = "platformTransactionManagerOne")
public class JpaConfigOne {
    @Resource(name = "dsOne")
    DataSource dsOne;
    @Autowired
    JpaProperties jpaProperties;
    @Bean
    @Primary
    LocalContainerEntityManagerFactoryBean entityManagerFactoryBeanOne(
            EntityManagerFactoryBuilder builder) {
        return builder.dataSource(dsOne)
                .properties(jpaProperties.getProperties())
                .packages("com.sang.c05s04multijpa.model")
                .persistenceUnit("pu1")
                .build();
    }
    @Bean
    PlatformTransactionManager platformTransactionManagerOne(
            EntityManagerFactoryBuilder builder) {
        LocalContainerEntityManagerFactoryBean factoryOne = entityManagerFactoryBeanOne(builder);
        return new JpaTransactionManager(factoryOne.getObject());
    }
}
