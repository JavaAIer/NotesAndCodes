package org.sang.c05s01book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {
	@Autowired
	BookService bookService;

	@GetMapping("/bookOps")
	public void bookOps() {
		BookModel b1 = new BookModel();
		b1.setId(99);
		b1.setName("西厢记");
		b1.setAuthor("王实甫");
		int i = bookService.addBook(b1);
		System.out.println("addBook>>>" + i);
		BookModel b2 = new BookModel();
		b2.setId(1);
		b2.setName("朝花夕拾");
		b2.setAuthor("鲁迅");
		int updateBook = bookService.updateBook(b2);
		System.out.println("updateBook>>>" + updateBook);
		BookModel b3 = bookService.getBookById(1);
		System.out.println("getBookById>>>" + b3);
		int delete = bookService.deleteBookById(2);
		System.out.println("deleteBookById>>>" + delete);
		List<BookModel> allBooks = bookService.getAllBooks();
		System.out.println("getAllBooks>>>" + allBooks);
	}
}
