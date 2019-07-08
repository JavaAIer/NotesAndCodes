package com.example;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @BelongsProject: swagger
 * @BelongsPackage: com.example
 * @Author:
 * @CreateTime: 2019-07-02 09:00
 * @Description: 测试接口用户
 */
@ApiModel(value = "用户实体类",description = "")
public class User {
    @ApiModelProperty(value = "用户名")
    private String username;

    @ApiModelProperty(value = "用户地址")
    private String address ;

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", address='" + address + '\'' +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
