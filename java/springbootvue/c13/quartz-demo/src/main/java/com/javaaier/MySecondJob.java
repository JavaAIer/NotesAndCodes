package com.javaaier;

import org.quartz.JobExecutionContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

import java.util.Date;

/**
 * @BelongsProject: quartz-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-28 17:40
 * @Description: 第二个任务
 */
public class MySecondJob extends QuartzJobBean {
    private  String name;
    public void setName(String name ){
        this.name=name;
    }

    @Override
    protected  void executeInternal(JobExecutionContext context){
        System.out.println("hello:"+name+":"+new Date());
    }
}
