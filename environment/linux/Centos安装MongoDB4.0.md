# 安装MongoDB4.0

## 下载及安装 

``` bash 
mkdir /usr/local/mongodb
cd /usr/local/mongodb
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.8.tgz
tar -zxvf mongodb-linux-x86_64-4.0.8.tgz
mv mongodb-linux-x86_64-4.0.8 mongodb
cp -r /usr/local/mongodb/mongodb/. /usr/local/mongodb/
rm /usr/local/mongodb/mongodb/ -rf
cd /usr/local/mongodb
mkdir db
mkdir logs
chmod 755 /usr/local/mongodb/db
chmod 755 /usr/local/mongodb/logs
cd /usr/local/mongodb/bin
vim mongo.conf

```

## mongo.conf

``` proper
dbpath=/usr/local/mongodb/db
logpath=/usr/local/mongodb/logs/mongodb.log
bind_ip=0.0.0.0
port=27017
fork=true

```

## 启动和关闭

```bash
/usr/local/mongodb/bin/mongod -f /usr/local/mongodb/bin/mongo.conf 
./mongod -f mongo.conf 
/usr/local/mongodb/bin/mongo
db.version()

mongo
use admin
db.shutdownServer()


ps -ef | grep mongo
vim /usr/local/mongodb/logs/mongodb.log
rm /usr/local/mongodb/logs/mongodb.log
rm /usr/local/mongodb/db/*.lock

```

## 创建用户和授权

``` bash
use admin
db.createUser({user:"sang",pwd:"123",roles:[{role:"readWrite",db:"test"}]})
db.shutdownServer()
./mongod -f mongo.conf --auth
./mongo
use admin
db.auth("sang","123")
```





## Error **child process failed, exited with error number 100**

[mongodb启动不了：child process failed, exited with error number 100](<https://blog.csdn.net/sinat_30397435/article/details/50774175>)

``` bash
vim /usr/local/mongodb/logs/mongodb.log
rm /usr/local/mongodb/db/mongod.lock
cd /usr/local/mongodb/bin/
./mongod -f mongo.conf --noIndexBuildRetry
./mongod -f mongo.conf --repair
./mongod -f mongo.conf --bind_ip all
./mongod -config  mongo.conf --noIndexBuildRetry
./mongod -config  mongo.conf --repair
./mongod -config  mongo.conf --bind_ip all

```

## Failed to start up WiredTiger under any compatibility version.

<https://blog.csdn.net/weixin_33717298/article/details/86810942>

``` bash
# 1.删除锁文件，这个锁文件位于你存储data数据的目录

rm /usr/local/mongodb/db/mongod.lock
# 2.修复数据文件

./mongod --dbpath /usr/local/mongodb/db --repair
# 3.重启mongo

./mongod --dbpath /usr/local/mongodb/db
```

## "errmsg" : "not authorized on admin to execute command { $eval: \"return 1111\" }"

<https://blog.csdn.net/yabingshi_tech/article/details/46834135>

``` bash
# not authorized on test to execute command-MongoDB的权限配置
# 直接报Command '$eval' failed: not authorized on这个错误，可以确认是权限的问题
# 解决方案：
# 在官网  http://docs.mongodb.org/manual/reference/command/eval/#dbcmd.eval 有一段描述：
# If authorization is enabled, you must have access to all actions on all resources in order to run eval. Providing such access is not recommended, but if your organization requires a user to run eval, create a role that grants anyAction on anyResource. Do not assign this role to any other user.
# 解决步骤：
# 1）新建一个角色，比如叫 sysadmin，需要先切换到admin库进行如下操作：
> use admin
switched to db admin
> db.createRole({role:'sysadmin',roles:[],
privileges:[
{resource:{anyResource:true},actions:['anyAction']}
]})
# 2）然后，新建一个用户，使用这个角色，注意，这个角色的db是admin，操作如下：
> use woplus
switched to db woplus
> db.createUser({
user:'sa',s
pwd:'sufeinet.com',
roles:[
{role:'sysadmin',db:'admin'}
]})
# 现在用这个新建的用户认证登录，就可以正常执行了。
```

``` bash
./mongo
use admin
db.auth("sang",123)
use test
db.book.find()
################下面是笔记#######
[root@localhost bin]# ./mongo
MongoDB shell version v4.0.8
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("21b59e9f-aae7-4aad-a0f6-0e49ea6c2e9a") }
MongoDB server version: 4.0.8
> use admin
switched to db admin
> db.auth("sang","123")
1
> use test
switched to db test
> db.book.select()
2019-04-09T10:51:29.999+0800 E QUERY    [js] TypeError: db.book.select is not a function :
@(shell):1:1
> db.book.find()
{ "_id" : 1, "name" : "朝花夕拾", "author" : "鲁迅", "_class" : "org.sang.c06s02mongodb.Book" }
{ "_id" : 2, "name" : "呐喊", "author" : "鲁迅", "_class" : "org.sang.c06s02mongodb.Book" }
{ "_id" : 3, "name" : "围城", "author" : "钱钟书", "_class" : "org.sang.c06s02mongodb.Book" }
{ "_id" : 4, "name" : "宋诗选注", "author" : "钱钟书", "_class" : "org.sang.c06s02mongodb.Book" }
>

```

