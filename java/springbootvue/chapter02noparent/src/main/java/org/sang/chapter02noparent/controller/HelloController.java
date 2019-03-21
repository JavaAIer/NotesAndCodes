/**
 * 
 */
package org.sang.chapter02noparent.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @program: chapter02noparent
 * @description: 你好啊，Controller
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@RestController
public class HelloController {
	@GetMapping("/hello")
	public String hello() {
		return "你好，第二章了。";
	}
}
