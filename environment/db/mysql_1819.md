show variables like '%56%';

SHOW VARIABLES LIKE 'validate_password%';

 set global validate_password_policy=0;

set global validate_password_length=1;

SHOW VARIABLES LIKE 'validate_password%';

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' ;

flush privileges;

grant all privileges on *.* to root@'%' identified by 'root';
