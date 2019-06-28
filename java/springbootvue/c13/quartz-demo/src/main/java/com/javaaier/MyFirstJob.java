package com.javaaier;

import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @BelongsProject: quartz-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-28 17:39
 * @Description: 第一个任务
 */
@Component
public class MyFirstJob {
    public void sayHello() {
        System.out.println("MyFirstJob:sayHello:" + new Date());
    }
}
