package org.sang.c06s01redis;

import java.io.Serializable;

/**
 * @BelongsProject: c06s01redis
 * @BelongsPackage: org.sang.c06s01redis
 * @Author: JavaAIer
 * @CreateTime: 2019-04-01 15:32
 * @Description: 书
 */
public class Book implements Serializable {
    public Integer id;
    public String name;
    public String author;

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
