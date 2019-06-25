package com.javaaier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import javax.swing.text.AttributeSet;
import java.security.Principal;

/**
 * @BelongsProject: websocket-demo-01
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-25 10:45
 * @Description: 测试用控制器
 */
@Controller
public class GreetingController {
    /**
     * @SendTo注解将方法处理过的消息转发到broker,再由broker进行消息广播.
     *
     * 使用SimpMessagingTemplate进行消息的发送,在spring boot 中,SimpMessagingTemplate已配置好.
     * 开发者直接注入进来即可 ,使用SimpMessagingTemplate开发者可以在任意地方发送消息到broker,
     * 也可以发送消息给某一个用户,这就是点对点的消息发送.
     */
    @Autowired
    SimpMessagingTemplate messagingTemplate;

    /**
     * 群发消息依然使用@SendTo注解来实现,
     * @param message
     * @return
     * @throws Exception
     */
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")

    //@SendTo("/topic/greetings")
    public Message greeting(Message message)
            throws Exception {
        //return message;

        //messagingTemplate.convertAndSend("/topic/greetings", message);

        return message;
    }

    /**
     * 点对点的消息发送则使用SimpMessagingTemplate来实现
     *  注解MessageMapping("/chat")表示来自"/app/chat"路径的消息将被chat方法处理
     *  chat方法的第一个参数Principal可以用来获取当前登录用户的信息,
     *  第二个参数则是客户端发送来的消息
     *  在Chat方法中,首先获取当前用户的用户名,设置给chat对象的from属性,
     *  再将消息发送出去,发送的目标用户就是chat对象的to属性值.
     *  消息发送使用的方法是convertAndSendToUser,该方法内部调用了
     *  convertAndSend方法,并对消息路径做了处理.
     *
     * @param principal
     * @param chat
     */
    @MessageMapping("/chat")
    public void chat(Principal principal, Chat chat){
        String from = principal.getName();
        chat.setFrom(from );
        messagingTemplate.convertAndSendToUser(chat.getTo(),
                "/queue/chat", chat);
    }
}


