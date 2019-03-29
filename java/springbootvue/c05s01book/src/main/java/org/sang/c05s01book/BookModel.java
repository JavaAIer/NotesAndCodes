package org.sang.c05s01book;

public class BookModel {
	private Integer id;
	private String name;
	private String author;

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

	@Override
	public String toString() {
		return "BookModel [id=" + id + ", name=" + name + ", author=" + author + "]";
	}

}
