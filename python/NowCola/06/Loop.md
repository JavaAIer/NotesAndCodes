# 循环语句

快速而不知疲倦地重复执行一个操作。

- 代码的注释
  - 格式：#+一行描述性的文字 就是代码的注释 。解释器会忽略注释，只执行程序。
  - 作用：阅读代码的人（包括这段代码的作者）更好地理解代码
  - 方便后期的管理和维护
- 循环控制语句
  - while（条件）：只要条件成立，while中的循环体会一直迭代执行。
    - 死循环：如果条件永远满足时，就会无限循环，也就是死循环。
      - PythonShell中按Ctrl+C可以强制退出当前运行的Python程序
  - for循环语句
  - else:当循环控制条件不被满足时，执行else块中的语句。
  - break:跳出当前循环，跳到循环语句块外面
  - continue:终止当前循环，直接进入下次循环，即跳过循环体中剩余部分，重新回到循环条件判断的地方
- 多重循环/循环嵌套
  - 用法举例：找出字符串中的重复内容。
  - 注意：速度快且稳定的程序是我们写程序的目标。
    - 多重循环的条件要进行斟酌和优化。
- 列表:顺序保存的若干元素
- range对象：range(1，101)，表示从1到100共100个数字。前闭后开区间