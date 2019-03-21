package org.sang.chapter02undertow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * @program: chapter02undertow
 * @description: 从undertow启动。这个好奇怪，其他类可以只加一个注解：@SpringBootConfiguration。
 * 但是这个undertow好任性，加了一个不行，得加另外两个，不然死活不行。
 * 我也是服气的。
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
public class App {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}
