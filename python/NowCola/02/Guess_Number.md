# 玩个小游戏

## 安装Python的运行环境

- 运行环境：一系列程序集合
- Python运行环境包括：
  - Python解释工具
  - 工具
  - 资源模块
  - 模块

- 操作系统分类 ：

  - windows 
  - mac os 
  - linux

- Python运行环境下载方式：[Python.org](https://www.python.org/downloads/)

  - Python3和Python2不兼容，可乐建议大家下载Python3

  - 视频只演示windows 64位的安装 

    - 下载python 64位的安装包
    - 选中“add python to Enviroment path”

  - 验证

    - 在命令行中输入：python进行验证

    - Linux和Mac上要使用Python3命令。

      ```shell
      C:\Users\Caiwenji>python
      Python 3.7.0 (default, Jun 28 2018, 08:04:48) [MSC v.1912 64 bit (AMD64)] :: Anaconda, Inc. on win32
      Type "help", "copyright", "credits" or "license" for more information.
      >>> print ("Hello World")
      Hello World
      >>> 6*7
      42
      >>>
      
      ```

  - 编辑器

    - IDLE:Python运行环境带的代码编辑器
      - 命令行模式：打开idle就是这个模式
      - 编辑器模式：file-->new file
    - Sublime ,Atom等其他文本编辑器
    - 要修改Tab键为四个空格：因为Python通过四个空格的缩进来确定代码块的范围，如果是Tab键不是四个空格，程序可能会出现错误。

## 小游戏 猜数字 

- 代码地址：[guess_number](https://gitee.com/colecode/python_l1/blob/master/guess_number.py)

- 拷下代码到一个文本文件中
- 把文本文件保存为guess_number.py，比如我保存的是E:\guess_number.py
- 在命令行下运行：python guess_number.py
  - 在mac和linux下要用python3 guess_number.py
- 愉快地玩耍吧。

```
C:\Users\Caiwenji>python e:\guess_number.py
请输入一个[1, 100]的整数：1
小了，再猜猜！
请输入一个[1, 100]的整数：50
小了，再猜猜！
请输入一个[1, 100]的整数：75
大了，再猜猜！
请输入一个[1, 100]的整数：62
恭喜你，猜了4次，终于猜对了！答案是62！

C:\Users\Caiwenji>
```

