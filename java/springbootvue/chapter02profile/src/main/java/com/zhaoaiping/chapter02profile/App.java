package com.zhaoaiping.chapter02profile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;

/**
 * @program: chapter02profile
 * @description:
 * @author JavaAIer
 * @date 2019年3月21日
 */
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
public class App {
	public static void main(String[] args) {
		//SpringApplication.run(App.class, args);
		SpringApplicationBuilder builder = new SpringApplicationBuilder(App.class);
		builder.application().setAdditionalProfiles("prod");
		builder.run(args);
	}
}
