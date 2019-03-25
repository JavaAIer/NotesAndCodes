package org.sang.c04jackson;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * @program:  c04jackson
 * @description:  默认的Json处理器：jackson
 * @author JavaAIer
 * @date 2019年3月23日
 */
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
public class App 
{
    /** 
      * @param args 
      */
    public static void main( String[] args )
    {
       SpringApplication.run(App.class, args);
    }
}
