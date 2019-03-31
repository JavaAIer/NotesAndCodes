package com.sang.c05s04multijdbc.model;

/**
 * @program: c05s04multijdbc
 * @description:
 * @author JavaAIer
 * @date 2019年3月31日
 */
public class Book {
	private Integer id;
	private String name;
	private String author;

	@Override
	public String toString() {
		return "Book{" + "id=" + id + ", name='" + name + '\'' + ", author='" + author + '\'' + '}';
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
