package com.javaaier;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class DirectReceiver {
    /**
     * 通过@RabbitListener注解指定一个方法是一个消息的消费方法,方法参数就是接收到的消息.
     * 然后可以在单元测试中注入一个rabbittemplate对象来进行消息发送.
     * 看边边能否接收到消息并打印出来
     *
     * @param msg
     */
    @RabbitListener(queues = "hello-queue")
    public void handler1(String msg) {
        System.out.println("DirectReceiver:" + msg);
    }
}
