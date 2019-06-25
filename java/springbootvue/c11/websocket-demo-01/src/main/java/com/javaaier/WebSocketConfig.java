package com.javaaier;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * @BelongsProject: websocket-demo-01
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-25 10:31
 * @Description: WebSocket配置类
 *
 * 继承自WebSocketMessageBrokerConfigurer进行websocket配置,
 * 然后通过@EnableWebSocketMessageBroker注解开启websocket消息代理.
 */

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig
        implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        //表示设置消息代理的前缀,即如果消息的前缀是"/topic",就会将消息
        //转发给消息代理(broker),再由消息代理将消息广播给当前连接的客户端
        config.enableSimpleBroker("/topic","/queue");
        //表示配置一个或多个前缀,通过这些前缀过滤出需要被注解方法处理的消息
        //例如,前缀为"/app"的destination可以通过@MessageMapping注解的方法处理
        //而其他destination(例如"/topic","/queue")将直接交给broker处理
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //定义一个前缀为"/chat"的endpoint,并开启sockjs支持,sockjs可以解决浏览器
        //对websocket的兼容性问题,客户端将通过这里配置的url来建立websocket连接.
        registry.addEndpoint("/chat").withSockJS();
    }
}
