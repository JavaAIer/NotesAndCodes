下面是使用ubuntu的轻松模式

```bash
# or run:
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -

# add Typora's repository
sudo add-apt-repository 'deb https://typora.io/linux ./'
sudo apt-get update

# install typora
sudo apt-get install typora
```

下面才是centos的艰难模式

``` bash
mkdir /usr/local/typora
cd /usr/local/typora
wget https://typora.io/linux/Typora-linux-x64.tar.gz
tar -zvxf Typora-linux-x64.tar.gz
ls
rm Typora-linux-x64.tar.gz
cp -r /usr/local/typora/Typora-linux-x64/. /usr/local/typora/
ls
rm /usr/local/typora/Typora-linux-x64 -rf

# 在当前目录下打开typora
./Typora

# 如果报错了error while loading shared libraries: libXss.so.1，则需要安装下面的软件
yum install libXScrnSaver



```

[运行Visual Studio code，遇到error while loading shared libraries: libXss.so.1: cannot open shared object](<https://blog.csdn.net/jimmyleeee/article/details/82895747>)

