package org.sang.c03thymeleaf.controller;

import java.util.ArrayList;
import java.util.List;

import org.sang.c03thymeleaf.model.BookModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BookController {
	@GetMapping("/books")
	public ModelAndView books() {
		List<BookModel> books = new ArrayList<BookModel>();
		BookModel b1 = new BookModel();
		b1.setId(1);
		b1.setAuthor("罗贯中");
		b1.setName("三国演义");
		BookModel b2 = new BookModel();
		b2.setId(2);
		b2.setAuthor("曹雪芹");
		b2.setName("红楼梦");
		books.add(b1);
		books.add(b2);
		ModelAndView mv = new ModelAndView();
		mv.addObject("books", books);
		mv.setViewName("books");
		return mv;
	}
}