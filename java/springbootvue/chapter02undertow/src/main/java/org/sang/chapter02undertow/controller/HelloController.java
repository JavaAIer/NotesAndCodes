/**
 * 
 */
package org.sang.chapter02undertow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @program: chapter02undertow
 * @description: Hello From Undertow
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@RestController
public class HelloController {
	@GetMapping("/hello")
	public String hello() {
		return "Hello from undertow";
	}
}
