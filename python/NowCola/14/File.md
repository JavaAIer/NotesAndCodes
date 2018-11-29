# 文件操作

## 文件系统基本概念

- 文件用途：文本、照片、表格等

  - 程序读取和修改数据
  - 网络中的数据传输

- 现代计算机中我们使用文件系统来保存数据

  - 使用目录结构组织文件数据的系统

    - 文件路径 
    - 文件

  - windows为例：C:\colecode\guess_number.py

    - c: 磁盘编号
    - colecode 目录（文件夹）
    - guess_number.py 文件名
    - \ 路径分隔符

  - Unix/Linux系统

    - mac os: /Users/colecode/guess_number.py
    - linux:/home/colecode/guess_number.py
    - / 路径分隔符
    - 没有盘符概念

  - 绝对路径 ：以盘符或路径分隔符开头的路径 

  - 相对路径

    ```
    cd c:\colecode
    python guess_number.py
    ```

  - 扩展名
    - windows对扩展名依赖比较大
    - linux和macos对扩展名依赖不大
    - 但是让文件带扩展名是一个良好习惯 
  - 大小写
    - windows和mac系统中的文件名、目录名对大小写不敏感
    -  Linux系统中大小写不同，路径 不同
    - 建议文件名或目录名都使用小写英文字母、数字、下划线组成

  ## python 操作文件

  ```python
  f=open(r'D:\Codes\NowCoder\NotesAndCodes\python\NowCola\14\read_file.py','r')
  for l in f.readlines():
      print(l,end='')
  f.close()
  ```



  - open ()函数

    - 参数1 文件路径 
    - 参数2
      -  字符r，表示用只读模式打开
        - 不能使用写入操作
      - 字符w，只写模式
        - 不能使用读取操作，打开后，文件指针位于0.
        - 新写入的文件内容会覆盖原有文件内容
      - r+模式：读操作+写操作
      - a(append)模式：只写模式的一种追加模式
        - 打开文件后，文件指针置于文件末尾
      - b标记位：二进制模式打开文件
    - 返回文件对象

  - readlines()函数：读取整个文件，并返回一个列表

    - 列表中的每个对象，是文件中的一行文本。

  - print()函数：输出完成后再输出一个默认值为换行符'\n'

    - end参数：修改默认值为空字符串（因为文件中默认有换行符了），避免打出多的换行出来。

  - close()函数：关闭文件对象

    - 永远记得关闭打开的文件，虽然不关的话，python的垃圾回收过程也会帮我们关

  - with关键字:打开上下文管理器

    - 在下面例子中可以自动关闭文件

    ```
    with open(r'D:\Codes\NowCoder\NotesAndCodes\python\NowCola\14\read_file.py','r') as f:
        for l in f.readlines():
            print(l,end='')
    ```


  ## 文本文件和二进制文件

  - 上例Python程序读取自己的代码文件。
    - 虽然文件均为01两个二进制位组成，但是我们还是将文件分成文本文件和二进制文件。
  - 文本文件:仅由ascii，unicode等字符集或字符编码组成的文件
    - 代码文件
    - 记事本编写的文件
    - 按行进行组织 
      - 行尾均带有ascii换行符 \n
      - windows记事本上：行尾带有ascii换行符 \r\n
    - python3默认使用utf-8编码
      - utf-8是ascii码的超集，兼容ascii码。
      - 建议python程序都用utf-8编码格式进行保存。
    - 乱码：
      - 字符组成文件
      - 各种各样的字符集
      - 各种各样的编码格式
      - 各种编码格式的文件
      - 编码格式判断错了，读出来的文件就是乱码
  - 二进制文件：非文本文件都是二进制文件
    -  图片、视频、编译好的应用程序
    - word、excel等专用软件生成的非文本文件

  ## Python文件函数

  - readline()函数：一次读取并返回一行，反复调用可以返回文件下一行

    - 文件即数据流

    - ```
      f=open(r'D:\Codes\NowCoder\NotesAndCodes\python\NowCola\14\read_file.py','r')\n   for l in f.readlines():\n        print(l,end='')\nf.close()
      ```

    - 文件指针：指向数据流中的某个位置作为读操作的开始位置

    - 对于刚刚打开的文件，文件指针在0

  - tell()函数：查看当前文件指针的位置

    - windows中，一行文本是以'\r\n'结尾的
    - linux和mac中，一行文本以\n结尾
    - Python3在读入文件时，会自动去掉'\r'

  - seek()函数：人为修改文件指针 的位置

  - read()函数：读取文件，并只返回一个单独的字符串

  - write()函数：文件写入操作。

  - writelines()函数：将列表按行写入文件。

    - 写入列表时不会自动添加换行符

  - flush()函数：主动将缓冲区的数据刷入磁盘

  - close()函数也会触发flush()函数，达到将缓冲区的数据刷入磁盘的效果。

- 用readline替换readlines,重写读取并打印文本文件内容的方法

  - 使用while循环，反复调用readline函数

    ```python
    with open(r'D:\Codes\NowCoder\NotesAndCodes\python\NowCola\14\read_file.py','r') as f:
        while True:
            l=f.readline()
            if l=='':
                break
            print(l,end='')
    ```

  - 缓冲区（缓存 ）

    ```python
    line_list = ['line 1 \n','line 2 \n','line 3 \n',]
    with open(r'D:\Codes\NowCoder\NotesAndCodes\python\NowCola\14\writelines_test.txt','w') as f:
        f.writelines(line_list)
    
    ```



    - 上个例子的列表数据只写入了缓冲区
    - 原因：硬盘读写速度 <<< 内存读写速度
      - <<<:远小于



## python路径操作

open()函数可以很好地处理文件不存在的问题，但是无法解决目录不存在的问题

- os模块
  - path子模块
    - exists()函数：验证目录是否存在
  - makedirs()函数：创建目录
    - 参数exist_ok=True