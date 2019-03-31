package com.sang.c05s04multijpa.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sang.c05s04multijpa.dao1.UserDao;
import com.sang.c05s04multijpa.dao2.UserDao2;
import com.sang.c05s04multijpa.model.User;

/**
 * @program: c05s04multijpa
 * @description:
 * @author JavaAIer
 * @date 2019年3月31日
 */
@RestController
public class UserController {
	@Autowired
	UserDao userDao;
	@Autowired
	UserDao2 userDao2;

	@GetMapping("/test1")
	public List<User> test1() {
		List<User> list = new ArrayList<User>();
		User u1 = new User();
		u1.setAge(55);
		u1.setName("鲁迅");
		u1.setGender("男");
		userDao.save(u1);
		User u2 = new User();
		u2.setAge(80);
		u2.setName("泰戈尔");
		u2.setGender("男");
		userDao2.save(u2);

		list.add(u1);
		list.add(u2);
		return list;
	}
}
