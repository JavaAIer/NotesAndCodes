/**
 * 
 */
package org.sang.chapter02prpty01.controller;

import org.sang.chapter02prpty01.config.model.BookModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @program: chapter02prpty01
 * @description: 配置application.properties
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@RestController
public class HelloController {
	@Autowired
	BookModel book ;
	
	@GetMapping("/hello")
	public String hello() {
		return "Hello "+book.toString();
	}
}
