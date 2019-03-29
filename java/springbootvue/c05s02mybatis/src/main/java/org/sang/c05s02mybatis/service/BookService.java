package org.sang.c05s02mybatis.service;

import org.sang.c05s02mybatis.mapper.BookMapper;
import org.sang.c05s02mybatis.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * @program: c05s02mybatis
 * @description: 描述一下这个类或接口的作用
 * @author: JavaAIer
 * @create: 2019年3月29日
 *
 */
@Service
public class BookService {
    @Autowired
    BookMapper bookMapper;
    public int addBook(Book book) {
        return bookMapper.addBook(book);
    }
    public int updateBook(Book book) {
        return bookMapper.updateBookById(book);
    }
    public int deleteBookById(Integer id) {
        return bookMapper.deleteBookById(id);
    }
    public Book getBookById(Integer id) {
        return bookMapper.getBookById(id);
    }
    public List<Book> getAllBooks() {
        return bookMapper.getAllBooks();
    }
}
