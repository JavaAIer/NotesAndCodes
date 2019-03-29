package org.sang.c05s02mybatis.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.sang.c05s02mybatis.model.Book;

import java.util.List;


/**
 * @program: c05s02mybatis
 * @description: 描述一下这个类或接口的作用
 * @author: JavaAIer
 * @create: 2019年3月29日
 *
 */
@Mapper
public interface BookMapper {
    int addBook(Book book);
    int deleteBookById(Integer id);
    int updateBookById(Book book);
    Book getBookById(Integer id);
    List<Book> getAllBooks();
}
