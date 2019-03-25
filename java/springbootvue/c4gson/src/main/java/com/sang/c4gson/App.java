package com.sang.c4gson;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * @program:  c4gson
 * @description:  Gson做为Json处理器
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

