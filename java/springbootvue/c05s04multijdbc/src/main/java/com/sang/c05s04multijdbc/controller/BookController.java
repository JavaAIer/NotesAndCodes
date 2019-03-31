package com.sang.c05s04multijdbc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sang.c05s04multijdbc.model.Book;

import javax.annotation.Resource;
import java.util.List;

/**
 * @program: c05s04multijdbc
 * @description:
 * @author JavaAIer
 * @date 2019年3月31日
 */
@RestController
public class BookController {
	@Resource(name = "jdbcTemplateOne")
	// @Autowired
	JdbcTemplate jdbcTemplate;
	@Autowired
	@Qualifier("jdbcTemplateTwo")
	JdbcTemplate jdbcTemplateTwo;

	@GetMapping("/test1")
	public List<Book> test1() {
		List<Book> books1 = jdbcTemplate.query("select * from book", new BeanPropertyRowMapper<>(Book.class));
		List<Book> books2 = jdbcTemplateTwo.query("select * from book", new BeanPropertyRowMapper<>(Book.class));

		books1.stream().forEach(book -> {
			System.out.println(book.toString());
		});

		System.out.println("books1:" + books1);
		System.out.println("books2:" + books2);
		books1.addAll(books2);
		return books1;
	}
}
