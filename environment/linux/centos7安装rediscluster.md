```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable
source /usr/local/rvm/scripts/rvm
source  /etc/profile.d/rvm.sh
rvm list known
rvm install 2.6
gem install redis
```

```
mkdir /usr/local/redisCluster
cd /usr/local/redisCluster
wget http://download.redis.io/releases/redis-stable.tar.gz
tar -zxvf redis-stable.tar.gz
mv redis-stable redis
cd redis
make MALLOC=libc
make install
```

```
cp -f /usr/local/redisCluster/redis/src/redis-trib.rb /usr/local/redisCluster
mkdir 8001
mkdir 8002
mkdir 8003
mkdir 8004
mkdir 8005
mkdir 8006
cp -f /usr/local/redisCluster/redis/redis.conf /usr/local/redisCluster/8001
vim /usr/local/redisCluster/8001/redis.conf 
cp /usr/local/redisCluster/8001/redis.conf /usr/local/redisCluster/8002/
cp /usr/local/redisCluster/8001/redis.conf /usr/local/redisCluster/8003/
cp /usr/local/redisCluster/8001/redis.conf /usr/local/redisCluster/8004/
cp /usr/local/redisCluster/8001/redis.conf /usr/local/redisCluster/8005/
cp /usr/local/redisCluster/8001/redis.conf /usr/local/redisCluster/8006/
vim /usr/local/redisCluster/8002/redis.conf 
vim /usr/local/redisCluster/8003/redis.conf 
vim /usr/local/redisCluster/8004/redis.conf 
vim /usr/local/redisCluster/8005/redis.conf 
vim /usr/local/redisCluster/8006/redis.conf 
```

``` proper
port 8001
#bind 127.0.0.1
cluster-enabled yes
cluster-config-file nodes-8001.conf
#protected no 
protected-mode no
daemonize yes
requirepass 123@456
masterauth 123@456

```

``` bash
cd /usr/local/redisCluster/redis/
redis-server /usr/local/redisCluster/8001/redis.conf 
redis-server /usr/local/redisCluster/8002/redis.conf 
redis-server /usr/local/redisCluster/8003/redis.conf 
redis-server /usr/local/redisCluster/8004/redis.conf 
redis-server /usr/local/redisCluster/8005/redis.conf 
redis-server /usr/local/redisCluster/8006/redis.conf 
```

