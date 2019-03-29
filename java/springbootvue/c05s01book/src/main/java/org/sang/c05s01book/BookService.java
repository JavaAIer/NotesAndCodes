package org.sang.c05s01book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
	@Autowired
	BookDao bookDao;

	public int addBook(BookModel book) {
		return bookDao.addBook(book);
	}

	public int updateBook(BookModel book) {
		return bookDao.updateBook(book);
	}

	public int deleteBookById(Integer id) {
		return bookDao.deleteBookById(id);
	}

	public BookModel getBookById(Integer id) {
		return bookDao.getBookById(id);
	}

	public List<BookModel> getAllBooks() {
		return bookDao.getAllBooks();
	}
}
