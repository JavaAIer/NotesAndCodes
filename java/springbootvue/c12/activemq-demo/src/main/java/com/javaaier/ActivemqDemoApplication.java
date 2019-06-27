package com.javaaier;

import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.jms.Queue;


@SpringBootApplication
public class ActivemqDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ActivemqDemoApplication.class, args);
    }
    @Bean
    Queue queue() {
        return new ActiveMQQueue("amq");
    }
}
