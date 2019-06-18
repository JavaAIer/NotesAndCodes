- 开启docker服务
net start com.docker.service
- 关闭docker服务
net stop com.docker.service

- 设置docker daemon
右下角docker图标-右键-settings-daemon-basic(点一下后会从灰色变成蓝色的Advanced)-修改以下内容:
 "registry-mirrors": [能够使用的镜像地址],
