package com.javaaier;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 9527
 * directExchange和binding两个bean的配置可以省略掉,即如果用directexchange,只配置一个queue的实例即可.
 */
@Configuration
public class RabbitDirectConfig {

    public final static String DIRECTNAME = "sang-direct";
    @Bean
    Queue queue() {
        return new Queue("hello-queue");
    }
    /**
     * 定义directExchange
     * 三个参数分别是:
     * directExchange名字
     * 重启后是否依然有效
     * 长期未用时是否删除
     */
    @Bean
    DirectExchange directExchange() {
        return new DirectExchange(DIRECTNAME, true, false);
    }

    /**
     * 创建一个binding对象,将exchange和queue绑定在一起
     * @return
     */
    @Bean
    Binding binding() {
        return BindingBuilder.bind(queue())
                .to(directExchange()).with("direct");
    }
}
