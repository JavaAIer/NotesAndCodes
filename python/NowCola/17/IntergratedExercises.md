# 总结 做个小游戏 

- 考试小游戏开发目标

  - 根据题库内容出单选题 
  - 提示作答，并给出结果

- 分析

  - 可以用列表保存题目
  - 可以用字典保存题干、选项和答案
  - 遍历题目列表用于展示
  - input函数等待用户输入
  - 判断输入，并继续提示
  - 计算正确率并打印

- 题目示例

  ```json
  {
      "name": "样例题库",
      "question_list": [
          {
              "question": "生命、宇宙以及一切事物的终极答案是？",
              "choices": [
                  "42",
                  "43",
                  "44",
                  "45"
              ],
              "answer": 0
          },
          {
              "question": "机器人 Marvin 今天高兴吗？",
              "choices": [
                  "没有理由不高兴",
                  "他今天一定很忧郁",
                  "取决于他接到的任务",
                  "一会儿高兴，一会儿不高兴"
              ],
              "answer": 1
          }
      ]
  }
  ```

  - 代码示例

    ```python
    import json
    import os
    import sys
    
    def read_question_file(filename):
        if not os.path.isfile(filename):
            return None
        with open(filename, 'r', encoding='utf-8') as f:
            try:
                return json.load(f)
            except ValueError as e:
                print(e)
                print('加载题库错误。')
                return None
    
    
    def to_letter(n):
        return chr(ord('A') + n)
    
    
    def to_answer(letter, c_len):
        letter = letter.upper()
        if len(letter) == 1 and 'A' <= letter <= 'Z':
            digit = ord(letter) - ord('A')
            if 0 <= digit < c_len:
                return digit, True
            else:
                return None, False
        else:
            return None, False
    
    
    def ask_question(question, i):
        print('\n第 {0} 题：{1}'.format(i+1, question['question']))
    
        choices = question['choices']
        c_len = len(choices)
        for j in range(c_len):
            print('{0}：{1}'.format(to_letter(j), choices[j]))
    
        user_input = input('请输入答案：')
        user_answer, ok = to_answer(user_input, c_len)
        while not ok:
            user_input = input('输入错误，请输入选项前的单个字母做为答案：')
            user_answer, ok = to_answer(user_input, c_len)
    
        return user_answer == question['answer']
    
    
    def main(argv):
        if len(argv) != 2:
            print('请指定题库 JSON 文件')
            sys.exit(-1)
        filename = argv[1]
    
        # 读取题库列表，每道题目为一个字典
        question_json = read_question_file(filename)
        if not question_json:
            print('题库文件读取失败，请检查：{0}'.format(filename))
            sys.exit(-1)
    
        name = question_json['name']
        question_list = question_json['question_list']
    
        print('答题开始，当前题库为：{0}'.format(name))
    
        # 遍历题库列表
        q_len = len(question_list)
        correct_count = 0
        for i, q in enumerate(question_list):
            # 展示题目、提示用户输入、判断答案
            if ask_question(q, i):
                correct_count += 1
    
        # 计算并展示正确率
        print('\n答题完成，共 {0} 道题目，你答对了 {1} 题。正确率 {2:.2f}%。'
              .format(q_len, correct_count, correct_count/q_len*100))
    
    
    if __name__ == '__main__':
        main(sys.argv)
    ```

- 知识点总结

  - 整段缩进
    - 选中对应内容
    - 按ctrl+]向右缩进
    - 按ctrl+[向左缩进
  - 系统内置变量：__ name __
    - 总是保存当前模块的名字
  - 用函数
    - 把自己要实现的独立功能封装起来
  - 在主函数前
    - 提前写好函数定义
      - pass 空白语句
  - 在同一个函数内
    - 用一个空行来表示代码逻辑上的分离
  - 定义题库列表
    - 用len()函数计算题库列表的长度
  - 利用循环统计用户答对题目数量
  - 百分号格式化
    - "{2:.2f}%"
      - 2表示取第三个参数
      - .2f表示格式化保留两位小数
  - 遍历列表
    - enumerate()函数
      - 将一个可遍历的数据对象组合为一个索引序列
    - for i , q in enumerate(question_list)
      - i表示当前元素在列表中的索引 
      - q表示列表中的一个元素
  - 生成题目序号:1,2,3,4
  - 生成选项标号：A,B,C,D,E,F
  - 完善用户输入异常处理
  - 函数的多重返回值
  - 在制定规则的时候一定要多角度思考问题
  - 利用json数据结构建立可复用题库
  - isfile()函数：
    - 判断指定路径 是否存在且是一个文件
  - sys模块
    - exit()函数：程序中间的退出 
      - 参数0为正常退出 
      - 参数-1为非正常退出 
  - json文件读取失败：指明文件编码方式
    - windows默认GBK编码方式
    - json文件是utf-8编码方式
    - 在打开程序里面要默认encoding='utf-8'
  - 通过命令行参数的方式指定文件名
    - 命令行参数保存在sys模块中的argv变量里
    - python questions.py sample_question.json
      - python 命令，启动python解释器
      - 参数
        - questions.py 读取参数文件名
        - sample_questions.json 读取问题题库文件名
    - 第三方模块
      - 支持标准化的命令行参数处理
      - 如argparse,agetopt
    - argv列表
      - argv[0] :一般是python程序文件名
      - argv[1]:才是要传给程序使用的第一个参数

- 后续：改进计划
  - 支持多选题，把判断对错改为打分，全选对给三分，有漏选给一分，有选错零分。
  - 支持随机顺序出题，可以搜索一下列表的shuffle函数如何使用
  - 每做一道题 ，实时计算并展示当前的正确率
  - 记录做题进度，支持输入Q来退出 程序并保存进度，下次运行时可以从中断的题目继续 
  - 修复to_LETTER()函数的缺陷，看看如何 避免参数不合法的情况（小于0或大于25）
- 高级篇：
  - 内容摘要：
    - 面向对象的程序设计
    - 第三方模块使用和管理
    - 图形界面应用开发
  - 专题课程
    - web应用和restful api框架
    - 网络聊天应用开发，rpc
    - 科学计算，统计分析，数据挖掘





