package org.sang.chapter02noparent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.Banner.Mode;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

/**
 * @program: chapter02noparent
 * @description: 不依赖Parent的项目的启动类
 * @author: JavaAIer
 * @create: 2019年3月20日
 *
 */
@SpringBootApplication
public class App {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
		/**
		 * 		下面两句是说在启动的时候不显示Banner
		 * 		SpringApplicationBuilder builder = new SpringApplicationBuilder(App.class);
		 * 		builder.bannerMode(Mode.OFF).run(args);
		 * 
		 */

	}
}
