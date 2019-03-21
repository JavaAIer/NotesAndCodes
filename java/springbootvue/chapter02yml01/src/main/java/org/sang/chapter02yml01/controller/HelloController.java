/**
 * 
 */
package org.sang.chapter02yml01.controller;

import org.sang.chapter02yml01.config.model.MyModel;
import org.sang.chapter02yml01.config.model.UsersModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @program: chapter02yml01
 * @description: 描述一下这个类或接口的作用
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@RestController
public class HelloController {
	@Autowired
	MyModel myModel;

	@Autowired
	UsersModel usersModel;

	@GetMapping("/hello")
	public String hello() {
		return "" + myModel.toString() + usersModel.toString();
	}
}
