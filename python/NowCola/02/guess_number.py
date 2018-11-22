import random

num = random.randint(1, 100)  # 获得一个随机数
is_done = False  # 是否猜中的标记
count = 0  # 玩家猜了几次

while not is_done:
    guess = int(input('请输入一个[1, 100]的整数：'))
    if guess == num:
        is_done = True
    elif guess > num:
        print('大了，再猜猜！')
    elif guess < num:
        print('小了，再猜猜！')
    count += 1

print('恭喜你，猜了{}次，终于猜对了！答案是{}！'.format(count, num))
