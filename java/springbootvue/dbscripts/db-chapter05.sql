create database chapter05 default character set utf8mb4 collate utf8mb4_unicode_ci;

use chapter05;

create table book(
	id int(11) not null AUTO_INCREMENT,
	name varchar(128) DEFAULT null,
	author varchar(64) DEFAULT null,
	PRIMARY key (id)
) Engine=innoDB DEFAULT charset = utf8mb4;

insert into book(id,name,author) values(1,'三国演义','罗贯中'),(2,'水浒传','施耐庵');

