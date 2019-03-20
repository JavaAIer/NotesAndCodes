package org.sang.chapter01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @program: chapter01
 * @description: 就是个启动类喽
 * @author: JavaAIer
 * @create: 2019年3月20日
 *
 */
//@SpringBootApplication = @EnableAutoConfiguration + @ComponentScan
@SpringBootApplication
public class App {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}
