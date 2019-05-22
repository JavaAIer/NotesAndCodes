package org.sang.securityjson;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@EnableAutoConfiguration

@SpringBootApplication
public class SecurityjsonApplication extends SpringBootServletInitializer {
//返回jsp页面必须继承SpringBootServletInitializer类重写里面的方法

    public static void main(String[] args) {
        SpringApplication.run(SecurityjsonApplication.class, args);
    }

    protected SpringApplicationBuilder config(SpringApplicationBuilder applicationBuilder) {
        return applicationBuilder.sources(SecurityjsonApplication.class);
    }
}
