package com.javaaier;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


/**
 * @BelongsProject: shiro-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-24 17:42
 * @Description: 测试用控制器
 */
@Controller
public class UserController {
    /**
     * 在doLogin中,首先构造一个UsernamePasswordToken实例,然后获取一个Subject对象
     * 并调用该方法中的login方法执行登录操作,在登录操作执行过程中,当有异常抛出时
     * 说明登录失败,携带错误信息返回登录视图;
     * 当登录成功时,则重定向到"/index"
     * @param username
     * @param password
     * @param model
     * @return
     */
    @PostMapping("/doLogin")
    public String doLogin(String username,
                          String password,
                          Model model) {
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
        } catch (AuthenticationException e) {
            model.addAttribute("error", "用户名或密码输入错误!");
            return "login";
        }
        return "redirect:/index";
    }

    /**
     * 需要具有admin角色才可以访问
     * @return
     */
    @RequiresRoles("admin")
    @GetMapping("/admin")
    public String admin(){
        return "admin";
    }

    /**
     * 具备admin和user角色其中任意一个即可访问
     * @return
     */
    @RequiresRoles(value = {"admin","user"},logical = Logical.OR)
    @GetMapping("/user")
    public String user(){
        return "user";
    }
}
