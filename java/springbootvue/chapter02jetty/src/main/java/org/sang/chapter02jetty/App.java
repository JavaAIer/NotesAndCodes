package org.sang.chapter02jetty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @program: chapter02jetty
 * @description: 是从jetty启动的
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
public class App {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}
