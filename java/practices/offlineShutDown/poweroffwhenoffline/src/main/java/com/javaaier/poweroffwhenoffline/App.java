package com.javaaier.poweroffwhenoffline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @program:  poweroffwhenoffline
 * @description:  断网就关机程序
 * 背景：
 * 廉价ups（没关机和开机功能）上接Nas、服务器等
 * 路由器直接接在市电上
 * 如果停电了，则路由器就断了
 * 然后nas和服务器就要用程序自动关机（防止ups没电导致突然关机，损坏硬件（主要是硬盘））
 * 
 * 思路：Nas和服务器上运行一个jar程序
 * 每隔十秒左右去连一次百度或其他网址
 * 连不上则判断停电了，就关机。
 * @author JavaAIer
 * @date 2019年4月20日
 */

@SpringBootApplication
@ComponentScan
public class App {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}

