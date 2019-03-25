package com.fang.c04fastjson2.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fang.c04fastjson2.model.BookModel;

@RestController
//@Controller+@ResponseBody = @RestController
public class BookController {
	@GetMapping("/books")
	//@ResponseBody
	public BookModel books() {
		BookModel b1 = new BookModel();
		b1.setId(1);
		b1.setAuthor("罗贯中");
		b1.setName("三国演义");
		b1.setPrice(100f);
		b1.setPublicationDate(new Date());
		return b1;
	}
}