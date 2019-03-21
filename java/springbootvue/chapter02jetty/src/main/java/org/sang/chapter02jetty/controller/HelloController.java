/**
 * 
 */
package org.sang.chapter02jetty.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @program: chapter02jetty
 * @description: 从Jetty发出的Hello信息
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */

@RestController
public class HelloController {
	@GetMapping("/hello")
	public String hello() {
		return "Hello Jetty ";
	}
}
