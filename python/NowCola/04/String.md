# 字符串

定义：用引号包裹的一串文字，字符串中可以是任意内容。如果要在字符串中包含引号，则需要使用反斜线将引号转义（标记出字符串内部的引号是字符串的一部分）。

[编程文件中的土味情话](https://www.sohu.com/a/220717956_101331)

- 字符：英文字母、数字、标点以及其他语言全都是字符
  - 可见字符（包括emoji，😉没想到吧）
  - 空白符，制表符，换行符，回车符等也是字符
  - 控制字符
- 编码：字符和数字的转换规则
  - ascii：美国信息交换标准代码，包含128个字符和整数的转换关系
    - 95个可见字符
    - 33个不可见字符
    - 每个字符对应0-127中的一个数字
      - A对应65，hec(0x41),bin(0b01000001)
    - ord，chr提供了字符和数字的转换
  - 汉字、西欧字母、假名、阿拉伯字母等字符原来有各种编码格式来表示
    - 结果因为编码格式不同，强转就会出现乱码
  - 全宇宙统一编码：Unicode
    - 兼容Ascii编码以及Emoji等全世界大部分的文字系统
    - Python3默认Unicode编码
    - ord和chr可以用来对unicode操作
- 字符串比较
  - 场景
    - 对字典单词排序
    - 对客户名单排序 
    - 对用户的出生日期进行排序 
  - 原理：对字符的编码进行比较
    - 依次从左到右，从前到后，逐一比较两个字符串中字符的大小。
  - 字典序：ascii表中的排序进行比较的字符串
    - 汉字的排序不是字典序，所以对汉字排序不常见。
- 内置函数
  - len('hello'):字符串长度
  - 'hello'[0]：字符串第1个位置的字符
  - ‘hello’[1:4]:截取字符串第1个位置到第4位置的字符，前闭后开区间即
    - 'hello'【1，2，3】,'ell'
  - +号操作符：连接两个字符串
  - *号操作符：把字符串复制几次
  - in操作符：判断前面字符串是不是后面字符串子串
  - not in 操作符：判断前面字符串是否不是后面字符串的子串
  - find
  - index
  - isalnum
  - isalpha
  - isdigit
  - isnumeric
  - isdecimal
  - strip
  - replace
  - translate
- format的更多用法 
  - %在format中的用法 

