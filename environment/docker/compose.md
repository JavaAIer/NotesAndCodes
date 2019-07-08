# [CentOS7 安装 Docker 和 Docker-compose](https://www.centos.bz/2019/01/centos7-安装-docker-和-docker-compose/)





- 安装docker 

  ```bash
  # 安装依赖
  sudo yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
  
  # 添加docker下载仓库
  sudo yum-config-manager \
      --add-repo \
      https://download.docker.com/linux/centos/docker-ce.repo
  
  # 安装docker-ce
  sudo yum install docker-ce
  
  # 启动docker-ce
  sudo systemctl start docker
  
  # 验证
  sudo docker --version
  
  sudo docker run hello-world
  ```



- 安装docker-compose ,官网上截止至2019-7-8最新的版本.

  ```bash
  curl -L https://github.com/docker/compose/releases/download/1.24.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  ```

  

- 报错怎么办?

  > [79003] Cannot open self /usr/local/bin/docker-compose or archive /usr/local/bin/docker-compose.pkg

  

  

  ```bash
  # 下载最新版的docker-compose包
  # 上传到/usr/local/bin/下
  cd /usr/local/bin/
  wget https://github.com/docker/compose/releases/download/1.24.1/docker-compose-Linux-x86_64
  mv docker-compose-Linux-x86_64 docker-compose
  chmod +x /usr/local/bin/docker-compose
  
  
  # https://github.com/docker/compose/releases/download/1.24.1/docker-compose-Linux-x86_64
  ```

  