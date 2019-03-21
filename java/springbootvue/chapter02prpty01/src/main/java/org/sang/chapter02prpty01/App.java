package org.sang.chapter02prpty01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;


/**
 * @program: chapter02prpty01
 * @description: 描述一下这个类或接口的作用
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
public class App 
{
    public static void main( String[] args )
    {
       SpringApplication.run(App.class, args);
    }
}
