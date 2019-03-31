create
	database chapter0501 DEFAULT character set
	utf8mb4 collate utf8mb4_unicode_ci;

use chapter0501;

create
	table
		book ( id int(11) not null AUTO_INCREMENT,
		name varchar(128) default null,
		author varchar(128) default null,
		PRIMARY key (id) ) engine = innodb AUTO_INCREMENT = 2 default charset = utf8;

	insert into book(id,name,author)values (1,'水浒传','施耐庵');
	


create
	database chapter0502 DEFAULT character set
	utf8mb4 collate utf8mb4_unicode_ci;

use chapter0502;

create
	table
		book ( id int(11) not null AUTO_INCREMENT,
		name varchar(128) default null,
		author varchar(128) default null,
		PRIMARY key (id) ) engine = innodb AUTO_INCREMENT = 2 default charset = utf8;

	insert into book(id,name,author)values (1,'三国演义','罗贯中');
	

