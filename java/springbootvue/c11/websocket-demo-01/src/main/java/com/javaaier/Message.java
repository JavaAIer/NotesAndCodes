package com.javaaier;

import lombok.Data;


/**
 * @BelongsProject: websocket-demo-01
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-25 10:47
 * @Description: 消息
 */
@Data
public class Message  {
    private String name;
    private String content;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Message{" +
                "name='" + name + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
