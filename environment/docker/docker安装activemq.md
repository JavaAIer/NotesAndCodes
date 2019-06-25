``` bash  
docker pull webcenter/activemq  

docker run -d --name activemq01 -p 61616:61616 -p 8161:8161 webcenter/activemq

docker start activemq01  


```  
 
[http://localhost:8161/admin/topics.jsp](http://localhost:8161/admin/topics.jsp)  

用户名和密码都是:admin  