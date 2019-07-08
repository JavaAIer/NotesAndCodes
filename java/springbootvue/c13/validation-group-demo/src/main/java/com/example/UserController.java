package com.example;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * @BelongsProject: validattion-demo
 * @BelongsPackage: com.example.controller
 * @Author:
 * @CreateTime: 2019-07-02 09:59
 * @Description: 用户控制器
 *
 * post:
 * http://localhost:8080/user?email=123@123.com&name=12333&age=300&address=123
 */
@RestController
public class UserController {
    /**
     * 给User参数添加@Validated注解,表示需要对该参数做校验,紧接着的BindingResult参数表示在校验出错时保存的出错信息.
     * 如果BindingResult中的hasErrors方法返回true,表示有错误信息,此时遍历错误信息,将之返回给前端.
     * @param user
     * @param result
     * @return
     */
    @PostMapping("/user")
    public List<String> addUser(@Validated(ValidationGroup2.class) User user, BindingResult result) {
        List<String> errors = new ArrayList<>();
        if (result.hasErrors()) {
            List<ObjectError> allErrors = result.getAllErrors();
            for (ObjectError error : allErrors) {
                errors.add(error.getDefaultMessage());
            }
        }
        return errors;
    }

}
