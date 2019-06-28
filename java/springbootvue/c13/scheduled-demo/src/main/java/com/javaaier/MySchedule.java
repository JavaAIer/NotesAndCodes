package com.javaaier;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @BelongsProject: scheduled-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-28 17:27
 * @Description: 定时任务类
 */
@Component
public class MySchedule {

    @Scheduled(fixedDelay = 1000)
    public void fixedDelay(){
        System.out.println("fixedDelay:"+new Date());
    }

    @Scheduled(fixedRate = 2000)
    public void fixedRate(){
        System.out.println("fixedRate:"+new Date());
    }


    @Scheduled(initialDelay =1000,fixedRate = 2000)
    public void initialDelay(){
        System.out.println("initialDelay:"+new Date());
    }

    @Scheduled(cron ="0 * * * * ?")
    public void cron(){
        System.out.println("cron:"+new Date());
    }
}
