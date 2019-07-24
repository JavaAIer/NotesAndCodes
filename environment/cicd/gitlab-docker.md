``` bash
docker pull gitlab/gitlab-ce 

mkdir -p /data/docker/gitlab/{config,data,logs}

#   根据需要增减映射相应端口
docker run -d \ 
  --name gitlab \ 
 --hostname gitlab \ 
  --restart always \ 
 -p4100:443 -p 8100:80 -p 2100:22 \ 
 -v /data/docker/gitlab/config:/etc/gitlab \ 
 -v /data/docker/gitlab/data:/var/opt/gitlab \ 
  -v /data/docker/gitlab/logs:/var/log/gitlab \ 
  gitlab/gitlab-ce
```


[centos7下使用docker安装gitlab](https://www.cnblogs.com/ding2016/p/10422605.html)