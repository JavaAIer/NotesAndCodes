# 异常

- 背景知识:异常的识别定位和解决

  - 程序出现问题的两个方面

    - 语法错误 SyntaxError
    - 代码异常 Exception

  - 看懂错误提示：单个错误提示

    ```
      File "<ipython-input-7-4b44b2436ba0>", line 2
        print ("Hello World
                           ^
    SyntaxError: EOL while scanning string literal
    
    File 文件名
    line 行号
    光标^指向：出错的代码位置
    SyntaxError:错误类型
    EOL while scanning string literal 在扫描字符串时遇到了EOL
    EOL:end of line 行尾
    stdin 标准输入。这个在shell里出现 ，在anaconda里面不是这个提示。
    
    ```

  - 看懂错误提示：Traceback，沿调用关系回溯

    ```
    ---------------------------------------------------------------------------
    ZeroDivisionError                         Traceback (most recent call last)
    <ipython-input-8-c66288af2537> in <module>()
          1 def devide(a,b):
          2     return a/b
    ----> 3 print(devide(1,0))
    
    <ipython-input-8-c66288af2537> in devide(a, b)
          1 def devide(a,b):
    ----> 2     return a/b
          3 print(devide(1,0))
    
    ZeroDivisionError: division by zero
    
    从上到下：
    	依次是顶层调用->....->底层调用->报错语句
    上下文提示：
        <ipython-input-8-c66288af2537> in <module>()
        <ipython-input-8-c66288af2537> in devide(a, b)
    错误类型：ZeroDivisionError
    错误描述：division by zero
    ```

  - 错误帮助：

    - python官方文档：https://docs.python.org/3/
    - 牛客网社区：https://www.nowcoder.com/discuss
    - stackoverflow:https://stackoverflow.com

- 异常的预判和防护

  - 猜数字程序分析

    - Input函数：接受数据，并返回字符串

    - int函数：将数据转换成整型

    - 如果用户输入的是非数字呢？

      - 会出现异常：字符串abc不能被转换成10进制整数

      ```
      请输入一个[1, 100]的整数：abc
      ---------------------------------------------------------------------------
      ValueError                                Traceback (most recent call last)
      <ipython-input-9-a3d9e7ebadfa> in <module>()
            6 
            7 while not is_done:
      ----> 8     guess = int(input('请输入一个[1, 100]的整数：'))
            9     if guess == num:
           10         is_done = True
      
      ValueError: invalid literal for int() with base 10: 'abc'
      ```

    - 

    - 只有0-9之间的字符才能正常运行

    - 所以加入is_decimal用来判断用户输入的字符是否合法

  - 防御性编程概念引出

    - 计算机会产生各种各样的异常，比如盲目信任用户输入的危害
      - 程序 崩溃
      - 结果 错误
      - 在网络中引发安全问题

  - try 关键词

    - try:监视语句是否发生异常
    - except：如果程序发生异常，将执行什么命令
      - 同时捕获多种不同类型的异常
        - except (xxxError,YYYError,ZZZError)
      - 不建议使用except:来捕获所有发生的异常
      - except as xxx
        - 将捕获的异常复制给变量xxx
        - raise xxx 将捕获的异常再抛给上一级来处理
    - finally：不管有没有发生异常，总会执行的命令
    - 