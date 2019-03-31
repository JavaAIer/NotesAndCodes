package com.sang.c05s04multimybatis.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sang.c05s04multimybatis.mapper1.BookMapper1;
import com.sang.c05s04multimybatis.mapper2.BookMapper2;
import com.sang.c05s04multimybatis.model.Book;

@RestController
public class BookController {
	@Autowired
	BookMapper1 bookMapper;
	@Autowired
	BookMapper2 bookMapper2;

	@GetMapping("/test1")
	public List<Book>  test1() {
		List<Book> books1 = bookMapper.getAllBooks();
		List<Book> books2 = bookMapper2.getAllBooks();
		System.out.println("books1:" + books1);
		System.out.println("books2:" + books2);
		books1.addAll(books2);
		return books1;
	}
}
