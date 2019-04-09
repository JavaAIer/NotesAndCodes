``` bash
# 不显示不保存输出
nohup java -jar c06s03session.jar --server.port=8080  >/dev/null 2>&1 &
nohup java -jar c06s03session.jar --server.port=8081  >/dev/null 2>&1 &
# 不显示输出，保存输出到log8081.log
nohup java -jar c06s03session.jar --server.port=8081  >log8081.log 2>&1 &
nohup java -jar c06s03session.jar --server.port=8080  >log8080.log 2>&1 &

```

