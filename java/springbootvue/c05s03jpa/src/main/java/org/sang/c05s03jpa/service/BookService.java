package org.sang.c05s03jpa.service;

import org.sang.c05s03jpa.dao.BookDao;
import org.sang.c05s03jpa.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * @program: c05s03jpa
 * @description: 描述一下这个类或接口的作用
 * @author: JavaAIer
 * @create: 2019年3月29日
 *
 */
@Service
public class BookService {
    @Autowired
    BookDao bookDao;
    public void addBook(Book book) {
        bookDao.save(book);
    }
    public Page<Book> getBookByPage(Pageable pageable) {
        return bookDao.findAll(pageable);
    }
    public List<Book> getBooksByAuthorStartingWith(String author){
        return bookDao.getBooksByAuthorStartingWith(author);
    }
    public List<Book> getBooksByPriceGreaterThan(Float price){
        return bookDao.getBooksByPriceGreaterThan(price);
    }
    public Book getMaxIdBook(){
        return bookDao.getMaxIdBook();
    }
    public List<Book> getBookByIdAndAuthor(String author, Integer id){
        return bookDao.getBookByIdAndAuthor(author, id);
    }
    public List<Book> getBooksByIdAndName(String name, Integer id){
        return bookDao.getBooksByIdAndName(name, id);
    }
}