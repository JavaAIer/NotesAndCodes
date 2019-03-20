/**
 * 
 */
package org.sang.chapter01.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @program: chapter01
 * @description: 就是一个控制器鸭
 * @author: JavaAIer
 * @create: 2019年3月20日
 *
 */
@RestController
public class HelloController {
	@GetMapping("/hello")
	public String hello() {
		return "Hello Spring Boot Vue";
	}
}
