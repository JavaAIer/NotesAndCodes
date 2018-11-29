日期和时间

- 时间和日期的处理模块：time、datetime、calendar

  - 时间戳： 自公元1970年1月1日0：00：00到现在总共经历的秒数

    - 不方便的地方
      - 1970年以前的时间要用负数，不直观
      - 老机器是用Int来表示的，会溢出
      - 人类还不具备看到一个时间戳就自动脑补出时分秒的能力，真弱鸡。

  - 结构体时间：

    - print(time.localtime())

    - ```
      time.struct_time(tm_year=2018, tm_mon=11, tm_mday=29, tm_hour=12, tm_min=42, tm_sec=12, tm_wday=3, tm_yday=333, tm_isdst=0)
      ```

      - tm_year:公元纪年
      - tm_mon:月份  
      - tm_mday:日期
      - tm_hour 小时
      - tm_min分钟 
      - tm_sec 秒 （可能是60或61）
      - tm_wday 星期
      - tm_yday一年中的第几天
      - tm_isdst是否是夏令时

    - 带参数print(time.localtime(0))，返回时间戳对应的结构体时间

    - ```
      time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=8, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)
      ```

      - 为啥是8点，因为咱们比英国格林尼治天文台早了八个小时天亮啊。

  - 格式化时间：time.strftime("%a %b %d %I:%M%p %Y",t)

    - %a 星期
    - %b 月份
    - %d 日期
    - %I 小时（12）
    - %H 小时 （24）
    - %M 分钟 
    - %p am/pm
    - %Y 完整年份

  - 格式化时间：asctime,ctime

  - 结构体时间转换成时间戳：mktime

  - 转换成时间格式：tt = time.strptime(s,"%a %b %d %I:%M%p %Y")

    - tm_isdst=-1:该位未知，不知道是不是设置了夏令时

  - datetime工具箱

    - date
      - year 年
      - month月
      - day日
      - timetuple()函数：date对象和结构体时间的转换
      - fromtimestamp()函数：date对象和时间戳的转换。
      - weekday()函数：返回该日期是星期几，0是星期一
      - isoweekday()函数：iso标准的星期几，1是星期一
      - strftime()函数：日期格式化成字符串
      - 
    - time
      - hour 小时
      - minute 分钟 
      - second 秒
      - microsecond 微秒
      - isoformat()函数
      - strftime()函数
    - datetime
      - now()函数，创建 当前时间的datetime类型的对象
      - year 年
      - month 月
      - day 日
      - hour 小时
      - minute 分钟 
      - second 秒
      - microsecond 微秒
      - timetuple()函数：datetime对象和结构体时间的转换
      - fromtimestamp()函数：datetime对象和时间戳的转换。
      - strftime()函数：格式化输出
      - strptime()函数：将字符串转换成datetime对象
    - timedelta 
      - days 整天数
      - seconds 不足一整天的秒数
      - microseconds 不足一秒的毫秒数
      - 构造函数中参数意义：
        - weeks周数
        - days天数
        - hours小时数
        - minutes分钟数
        - seconds秒数
        - milliseconds毫秒数
        - microseconds微秒数
    - tzinfo
    - timezone


    

  - calendar 日历
    - weekday()一个日期是星期几
    - isleap()判断闺年
    - monthrange()一个月第一天是星期几？并显示这个月的天数

- 知识点
  - import +模块名：引入模块