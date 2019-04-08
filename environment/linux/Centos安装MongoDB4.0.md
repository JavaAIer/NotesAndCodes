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
cd /usr/local/mongodb/bin
vim mongo.conf

```

## mongo.conf

``` proper
dbpath=/usr/local/mongodb/db
logpath=/usr/local/mongodb/logs/mongodb.log
port=27017
fork=true

```

## 启动和关闭

```bash
/usr/local/mongodb/bin/mongod -f /usr/local/mongodb/bin/mongo.conf --bind_ip all

/usr/local/mongodb/bin/mongo
db.version()

```

