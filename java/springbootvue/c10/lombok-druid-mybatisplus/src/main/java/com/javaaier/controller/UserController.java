package com.javaaier.controller;


import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.javaaier.entity.User;
import com.javaaier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 好好xio习
 * @since 2019-06-20
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/all")
    @ResponseBody
    public List<User> getAll() {
        return userService.selectList(new EntityWrapper<User>());
    }

    @RequestMapping("/allbypage")
    @ResponseBody
    public Page<User> getAllByPage(Integer pageNum, Integer pageSize) {
        return userService.selectPage(new Page<User>(pageNum, pageSize));
    }

    @RequestMapping("/insert")
    @ResponseBody
    public boolean insert(User tbUser) {
        return userService.insert(tbUser);
    }

    @RequestMapping("/delete")
    @ResponseBody
    public boolean delete(Integer id) {
        return userService.deleteById(id);
    }

    @RequestMapping("/get")
    @ResponseBody
    public List<User> getUserById(Integer id) {
        return userService.selectList(
                new EntityWrapper<User>()
                        .eq("id", id));

    }
}

