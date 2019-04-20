package com.javaaier.poweroffwhenoffline.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.javaaier.poweroffwhenoffline.util.InternetDiagnosor;
import com.javaaier.poweroffwhenoffline.util.PowerManager;

/**
 * @program: poweroffwhenoffline
 * @description: 定时任务
 * @author JavaAIer
 * @date 2019年4月20日
 */
@Component
@EnableScheduling
@Service
public class ScheduledTaskService {
	/**
	 * 目标：实现定时任务；实例中是每隔3秒钟执行一次
	 * 
	 * private Integer count_first = 1; private Integer count_second = 1;
	 * 
	 * 
	 * @Scheduled(fixedRate = 10000) public void printCurrentTime() throws
	 *                      InterruptedException {
	 *                      System.out.println(String.format("① 第%s次执行，当前时间为：%s",
	 *                      count_first++, dateFormat.format(new Date()))); }
	 * 
	 * @Scheduled(fixedDelay = 10000) public void printCurrentTimeAfterSleep()
	 *                       throws InterruptedException {
	 *                       System.out.println(String.format("② 第%s次执行，当前时间为：%s",
	 *                       count_second++, dateFormat.format(new Date()))); }
	 * 
	 * 
	 * 
	 * 
	 */
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private Integer count_three = 1;
	@Autowired
	PowerManager powerManager;
	@Scheduled(cron = "*/10 * * * * *")
	public void printCurrentTimeCron() throws InterruptedException {
		System.out.println(powerManager.getPowerConfigModel().toString());
		System.out.println(String.format("③ 第%s次执行，当前时间为：%s", count_three++, dateFormat.format(new Date())));
		if (!InternetDiagnosor.isAccessable("http://www.baidu.com/")
				&& !InternetDiagnosor.isAccessable("http://www.alibaba.com/")
				&& !InternetDiagnosor.isAccessable("http://www.tencent.com/")) {
			// 如果Bat三家网站都连不上，那么只有可能是断网了
			System.out.println("连接不上Bat网站，极有可能停电了，马上关机");
			powerManager.shutDown();
		}
	}
}
