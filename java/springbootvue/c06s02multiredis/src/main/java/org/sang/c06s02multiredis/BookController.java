package org.sang.c06s02multiredis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 */
@RestController
public class BookController {
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    StringRedisTemplate stringRedisTemplate;
    @GetMapping("/test1")
    public Book test1() {
        ValueOperations ops = redisTemplate.opsForValue();
        Book book = new Book();
        book.setName("水浒传");
        book.setAuthor("施耐庵");
        ops.set("b1", book);
        Book b2 =(Book) ops.get("b1");
        System.out.println(b2);
        ValueOperations<String, String> ops2 = stringRedisTemplate.opsForValue();
        ops2.set("k1", "v1");
        System.out.println(ops2.get("k1"));
        return b2;
    }
}
