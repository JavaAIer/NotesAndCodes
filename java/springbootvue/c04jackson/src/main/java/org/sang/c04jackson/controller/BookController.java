package org.sang.c04jackson.controller;

import java.util.Date;

import org.sang.c04jackson.model.BookModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BookController {
	@GetMapping("/books")
	@ResponseBody
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