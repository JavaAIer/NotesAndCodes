package com.example;

import javax.validation.constraints.*;

/**
 * @BelongsProject: validattion-demo
 * @BelongsPackage: com.example.model
 * @Author:
 * @CreateTime: 2019-07-02 09:52
 * @Description: 用户类
 * <p>
 * Size注解 表示一个字符串的长度或者一个集合的大小,必须在一个范围中,min参数表示范围的下限;max参数表示范围的上限,message表示校验失败时的提示信息.
 * NotNull注解  表示该字段不能为空
 * DecimalMin注解 表示对应属性值的下限
 * DecimalMax注解 表示对应属性值的上限
 * Email注解 表示对应的属性格式是一个Email
 */
public class User {
    private Integer id;

    @Size(min = 5, max = 10, message = "{user.name.size}", groups = ValidationGroup1.class)
    private String name;
    @NotNull(message = "{user.address.notnull}", groups = ValidationGroup1.class)
    private String address;
    @DecimalMin(value = "1", message = "{user.age.size}")
    @DecimalMax(value = "200", message = "{user.age.size}")
    private Integer age;
    @Email(message = "{user.email.pattern}")
    @NotNull(message = "{user.email.notnull}", groups = {ValidationGroup1.class, ValidationGroup2.class})
    private String email;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
