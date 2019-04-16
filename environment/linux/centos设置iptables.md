``` bash
#第一步： 关闭firewall防火墙

systemctl stop firewalld.service
systemctl disable firewalld.service
systemctl mask firewalld.service

#第二步： 安装iptables防火墙

yum install iptables-services -y

#第三步： 启动iptable防火墙

systemctl enable iptables
systemctl start iptables

#第四步： 编辑防火墙增加端口 防火墙文件位置为： /etc/sysconfig/iptables

vim /etc/sysconfig/iptables
#在倒数第三行上增加
-A INPUT -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT


#第五步： 重启防火墙
systemctl enable iptables.service
systemctl start iptables.service

```



