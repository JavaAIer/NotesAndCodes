# redis4集群

## 安装前置条件

```bash
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable
source /usr/local/rvm/scripts/rvm
source  /etc/profile.d/rvm.sh
rvm list known
rvm install 2.6
gem install redis
```

## 安装redis4

``` bash
mkdir /usr/local/redisCluster4
cd /usr/local/redisCluster4
wget http://download.redis.io/releases/redis-4.0.10.tar.gz
tar -zxvf redis-4.0.10.tar.gz
mv redis-4.0.10 redis
cd redis
make MALLOC=libc
make install
```

## 创建六个节点及对应的配置信息

```bash
cp -f /usr/local/redisCluster4/redis/src/redis-trib.rb /usr/local/redisCluster4
cd /usr/local/redisCluster4
mkdir 8001
mkdir 8002
mkdir 8003
mkdir 8004
mkdir 8005
mkdir 8006
cp -f /usr/local/redisCluster4/redis/redis.conf /usr/local/redisCluster4/8001
vim /usr/local/redisCluster4/8001/redis.conf 
cp /usr/local/redisCluster4/8001/redis.conf /usr/local/redisCluster4/8002/
cp /usr/local/redisCluster4/8001/redis.conf /usr/local/redisCluster4/8003/
cp /usr/local/redisCluster4/8001/redis.conf /usr/local/redisCluster4/8004/
cp /usr/local/redisCluster4/8001/redis.conf /usr/local/redisCluster4/8005/
cp /usr/local/redisCluster4/8001/redis.conf /usr/local/redisCluster4/8006/
vim /usr/local/redisCluster4/8002/redis.conf 
vim /usr/local/redisCluster4/8003/redis.conf 
vim /usr/local/redisCluster4/8004/redis.conf 
vim /usr/local/redisCluster4/8005/redis.conf 
vim /usr/local/redisCluster4/8006/redis.conf 
```

## 每台节点需要修改的配置信息，8001这个参数是要改的跟每个节点一致的

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

## 启动需要集群的节点

``` bash
cd /usr/local/redisCluster4/redis/
redis-server /usr/local/redisCluster4/8001/redis.conf 
redis-server /usr/local/redisCluster4/8002/redis.conf 
redis-server /usr/local/redisCluster4/8003/redis.conf 
redis-server /usr/local/redisCluster4/8004/redis.conf 
redis-server /usr/local/redisCluster4/8005/redis.conf 
redis-server /usr/local/redisCluster4/8006/redis.conf 
```

## 集群



``` bash
cd /usr/local/redisCluster4/
vim /usr/local/redisCluster4/redis-trib.rb
./redis-trib.rb create --replicas 1 192.168.0.159:8001 192.168.0.159:8002 192.168.0.159:8003 192.168.0.159:8004 192.168.0.159:8005 192.168.0.159:8006 

```



``` bash
[root@localhost redisCluster4]# ./redis-trib.rb create --replicas 1 192.168.0.159:8001 192.168.0.159:8002 192.168.0.159:8003 192.168.0.159:8004 192.168.0.159:8005 192.168.0.159:8006
>>> Creating cluster
>>> Performing hash slots allocation on 6 nodes...
Using 3 masters:
192.168.0.159:8001
192.168.0.159:8002
192.168.0.159:8003
Adding replica 192.168.0.159:8005 to 192.168.0.159:8001
Adding replica 192.168.0.159:8006 to 192.168.0.159:8002
Adding replica 192.168.0.159:8004 to 192.168.0.159:8003
>>> Trying to optimize slaves allocation for anti-affinity
[WARNING] Some slaves are in the same host as their master
M: 019e40c8482ab24426d9fa94c7889ca16dc2d953 192.168.0.159:8001
   slots:0-5460 (5461 slots) master
M: a5fb06d4d85928edd5e9e4f06104813699fc9a97 192.168.0.159:8002
   slots:5461-10922 (5462 slots) master
M: 63b86d29dfc0daa64cf369ef57bd3b1ada4b82a4 192.168.0.159:8003
   slots:10923-16383 (5461 slots) master
S: ec261f18a0e28276f35f3e218aa91a4a29dda958 192.168.0.159:8004
   replicates 63b86d29dfc0daa64cf369ef57bd3b1ada4b82a4
S: 93c4cc7ee1e5743b8fd3dfdd271234cedaf3ea97 192.168.0.159:8005
   replicates 019e40c8482ab24426d9fa94c7889ca16dc2d953
S: 740112aa9356696ef9325ae3e8388c1b0e9b85ac 192.168.0.159:8006
   replicates a5fb06d4d85928edd5e9e4f06104813699fc9a97
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join....
>>> Performing Cluster Check (using node 192.168.0.159:8001)
M: 019e40c8482ab24426d9fa94c7889ca16dc2d953 192.168.0.159:8001
   slots:0-5460 (5461 slots) master
   1 additional replica(s)
S: ec261f18a0e28276f35f3e218aa91a4a29dda958 192.168.0.159:8004
   slots: (0 slots) slave
   replicates 63b86d29dfc0daa64cf369ef57bd3b1ada4b82a4
S: 93c4cc7ee1e5743b8fd3dfdd271234cedaf3ea97 192.168.0.159:8005
   slots: (0 slots) slave
   replicates 019e40c8482ab24426d9fa94c7889ca16dc2d953
S: 740112aa9356696ef9325ae3e8388c1b0e9b85ac 192.168.0.159:8006
   slots: (0 slots) slave
   replicates a5fb06d4d85928edd5e9e4f06104813699fc9a97
M: 63b86d29dfc0daa64cf369ef57bd3b1ada4b82a4 192.168.0.159:8003
   slots:10923-16383 (5461 slots) master
   1 additional replica(s)
M: a5fb06d4d85928edd5e9e4f06104813699fc9a97 192.168.0.159:8002
   slots:5461-10922 (5462 slots) master
   1 additional replica(s)
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
[root@localhost redisCluster4]#

```



## 检验集群结果

``` bash
[root@localhost redisCluster4]# redis-cli -h 192.168.0.159 -p 8001 -a 123@456 -c
Warning: Using a password with '-a' option on the command line interface may not be safe.
192.168.0.159:8001> cluster info
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:1
cluster_stats_messages_ping_sent:322
cluster_stats_messages_pong_sent:315
cluster_stats_messages_sent:637
cluster_stats_messages_ping_received:310
cluster_stats_messages_pong_received:322
cluster_stats_messages_meet_received:5
cluster_stats_messages_received:637
192.168.0.159:8001> cluster nodes
ec261f18a0e28276f35f3e218aa91a4a29dda958 192.168.0.159:8004@18004 slave 63b86d29dfc0daa64cf369ef57bd3b1ada4b82a4 0 1554702195000 3 connected
019e40c8482ab24426d9fa94c7889ca16dc2d953 192.168.0.159:8001@18001 myself,master - 0 1554702194000 1 connected 0-5460
93c4cc7ee1e5743b8fd3dfdd271234cedaf3ea97 192.168.0.159:8005@18005 slave 019e40c8482ab24426d9fa94c7889ca16dc2d953 0 1554702195000 5 connected
740112aa9356696ef9325ae3e8388c1b0e9b85ac 192.168.0.159:8006@18006 slave a5fb06d4d85928edd5e9e4f06104813699fc9a97 0 1554702194000 6 connected
63b86d29dfc0daa64cf369ef57bd3b1ada4b82a4 192.168.0.159:8003@18003 master - 0 1554702196354 3 connected 10923-16383
a5fb06d4d85928edd5e9e4f06104813699fc9a97 192.168.0.159:8002@18002 master - 0 1554702195348 2 connected 5461-10922
192.168.0.159:8001>
```

## 添加节点

``` bash
[root@localhost redisCluster4]# cp -r 8001 8007
[root@localhost redisCluster4]# cp -r 8001 8008
[root@localhost redisCluster4]# cp -r 8001 8009
vim /usr/local/redisCluster4/8007/redis.conf 
vim /usr/local/redisCluster4/8008/redis.conf 
vim /usr/local/redisCluster4/8009/redis.conf 

redis-server /usr/local/redisCluster4/8007/redis.conf 
redis-server /usr/local/redisCluster4/8008/redis.conf 
redis-server /usr/local/redisCluster4/8009/redis.conf 

# 添加主节点
./redis-trib.rb add-node 192.168.0.159:8007 192.168.0.159:8001
# 重新分配 slot
./redis-trib.rb reshard 192.168.0.159:8001
# 添加从节点
./redis-trib.rb add-node --slave --master-id 019e40c8482ab24426d9fa94c7889ca16dc2d953 192.168.0.159:8008 192.168.0.159:8001

# 再添加一个主节点，再删除
./redis-trib.rb add-node 192.168.0.159:8009 192.168.0.159:8001
./redis-trib.rb reshard 192.168.0.159:8001
./redis-trib.rb del-node 192.168.0.159:8001 47216e82b3c2c8e635f933e7e4af47adfc614dd3
```

``` bash
[root@localhost redisCluster4]# ./redis-trib.rb del-node 192.168.0.159:8001 47216e82b3c2c8e635f933e7e4af47adfc614dd3
>>> Removing node 47216e82b3c2c8e635f933e7e4af47adfc614dd3 from cluster 192.168.0.159:8001
[ERR] Node 192.168.0.159:8009 is not empty! Reshard data away and try again.
[root@localhost redisCluster4]# ./redis-trib.rb reshard 192.168.0.159:8001
>>> Performing Cluster Check (using node 192.168.0.159:8001)
M: 019e40c8482ab24426d9fa94c7889ca16dc2d953 192.168.0.159:8001
   slots:433-5460 (5028 slots) master
   1 additional replica(s)
M: 47216e82b3c2c8e635f933e7e4af47adfc614dd3 192.168.0.159:8009
   slots:333-432 (100 slots) master
   0 additional replica(s)
S: 34024fe524bc5b224f5100cb6f32650a8b0bc68d 192.168.0.159:8008
   slots: (0 slots) slave
   replicates 7029546efee9936e489df9d6f63a69dd4bb24738
M: 7029546efee9936e489df9d6f63a69dd4bb24738 192.168.0.159:8007
   slots:0-332,5461-5794,10923-11255 (1000 slots) master
   1 additional replica(s)
M: 63b86d29dfc0daa64cf369ef57bd3b1ada4b82a4 192.168.0.159:8003
   slots:11256-16383 (5128 slots) master
   1 additional replica(s)
M: a5fb06d4d85928edd5e9e4f06104813699fc9a97 192.168.0.159:8002
   slots:5795-10922 (5128 slots) master
   1 additional replica(s)
S: ec261f18a0e28276f35f3e218aa91a4a29dda958 192.168.0.159:8004
   slots: (0 slots) slave
   replicates 63b86d29dfc0daa64cf369ef57bd3b1ada4b82a4
S: 93c4cc7ee1e5743b8fd3dfdd271234cedaf3ea97 192.168.0.159:8005
   slots: (0 slots) slave
   replicates 019e40c8482ab24426d9fa94c7889ca16dc2d953
S: 740112aa9356696ef9325ae3e8388c1b0e9b85ac 192.168.0.159:8006
   slots: (0 slots) slave
   replicates a5fb06d4d85928edd5e9e4f06104813699fc9a97
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
How many slots do you want to move (from 1 to 16384)? 100
What is the receiving node ID? 019e40c8482ab24426d9fa94c7889ca16dc2d953
Please enter all the source node IDs.
  Type 'all' to use all the nodes as source nodes for the hash slots.
  Type 'done' once you entered all the source nodes IDs.
Source node #1:47216e82b3c2c8e635f933e7e4af47adfc614dd3
Source node #2:done

Ready to move 100 slots.
  Source nodes:
    M: 47216e82b3c2c8e635f933e7e4af47adfc614dd3 192.168.0.159:8009
   slots:333-432 (100 slots) master
   0 additional replica(s)
  Destination node:
    M: 019e40c8482ab24426d9fa94c7889ca16dc2d953 192.168.0.159:8001
   slots:433-5460 (5028 slots) master
   1 additional replica(s)
  Resharding plan:
    Moving slot 333 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 334 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 335 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 336 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 337 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 338 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 339 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 340 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 341 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 342 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 343 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 344 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 345 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 346 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 347 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 348 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 349 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 350 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 351 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 352 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 353 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 354 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 355 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 356 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 357 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 358 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 359 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 360 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 361 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 362 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 363 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 364 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 365 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 366 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 367 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 368 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 369 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 370 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 371 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 372 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 373 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 374 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 375 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 376 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 377 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 378 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 379 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 380 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 381 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 382 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 383 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 384 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 385 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 386 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 387 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 388 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 389 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 390 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 391 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 392 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 393 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 394 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 395 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 396 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 397 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 398 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 399 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 400 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 401 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 402 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 403 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 404 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 405 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 406 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 407 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 408 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 409 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 410 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 411 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 412 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 413 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 414 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 415 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 416 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 417 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 418 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 419 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 420 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 421 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 422 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 423 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 424 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 425 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 426 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 427 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 428 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 429 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 430 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 431 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
    Moving slot 432 from 47216e82b3c2c8e635f933e7e4af47adfc614dd3
Do you want to proceed with the proposed reshard plan (yes/no)? yes
Moving slot 333 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 334 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 335 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 336 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 337 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 338 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 339 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 340 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 341 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 342 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 343 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 344 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 345 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 346 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 347 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 348 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 349 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 350 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 351 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 352 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 353 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 354 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 355 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 356 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 357 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 358 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 359 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 360 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 361 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 362 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 363 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 364 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 365 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 366 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 367 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 368 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 369 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 370 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 371 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 372 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 373 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 374 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 375 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 376 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 377 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 378 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 379 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 380 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 381 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 382 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 383 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 384 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 385 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 386 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 387 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 388 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 389 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 390 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 391 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 392 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 393 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 394 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 395 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 396 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 397 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 398 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 399 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 400 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 401 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 402 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 403 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 404 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 405 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 406 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 407 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 408 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 409 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 410 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 411 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 412 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 413 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 414 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 415 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 416 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 417 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 418 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 419 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 420 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 421 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 422 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 423 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 424 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 425 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 426 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 427 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 428 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 429 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 430 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 431 from 192.168.0.159:8009 to 192.168.0.159:8001:
Moving slot 432 from 192.168.0.159:8009 to 192.168.0.159:8001:
[root@localhost redisCluster4]# ./redis-trib.rb del-node 192.168.0.159:8001 47216e82b3c2c8e635f933e7e4af47adfc614dd3
>>> Removing node 47216e82b3c2c8e635f933e7e4af47adfc614dd3 from cluster 192.168.0.159:8001
>>> Sending CLUSTER FORGET messages to the cluster...
>>> SHUTDOWN the node.
[root@localhost redisCluster4]#


```



# 参考

## [redis cluster 设置密码做集群时gem下client.rb文件修改](https://www.cnblogs.com/shihaiming/p/5949772.html)

