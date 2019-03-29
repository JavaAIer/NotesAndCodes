package org.sang.c05s01book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BookDao {
	@Autowired
	JdbcTemplate jdbcTemplate;

	public int addBook(BookModel book) {
		return jdbcTemplate.update("INSERT INTO book(name,author) VALUES (?,?)", book.getName(), book.getAuthor());
	}

	public int updateBook(BookModel book) {
		return jdbcTemplate.update("UPDATE book SET name=?,author=? WHERE id=?", book.getName(), book.getAuthor(),
				book.getId());
	}

	public int deleteBookById(Integer id) {
		return jdbcTemplate.update("DELETE FROM book WHERE id=?", id);
	}

	public BookModel getBookById(Integer id) {
		return jdbcTemplate.queryForObject("select * from book where id=?",
				new BeanPropertyRowMapper<>(BookModel.class), id);
	}

	public List<BookModel> getAllBooks() {
		return jdbcTemplate.query("select * from book", new BeanPropertyRowMapper<>(BookModel.class));
	}
}
