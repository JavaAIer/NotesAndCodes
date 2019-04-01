# [ASP.NET MVC 使用 FluentScheduler 定时器计划任务](https://www.cnblogs.com/mafly/p/FluentScheduler.html)

# MacBook Pro 只有四个 USB Type-C 接口是否错了？

一项新技术的诞生总会对已存在的事物造成冲击或影响，如果大家都害怕冲击与影响，那这个世界永远像现在不变就行了，大家都好好的，待在自己的舒适区，社会丝毫没有创新与进步而言。

其实， USB Type-C 接口协议在三年前几个科技巨头公司就参与制定了协议，并答应要在自家的产品上推广它，但谁都怕一下子在自家产品上升级 USB Type-C 接口被消费者骂出翔进而影响产品销量，这时候，苹果公司跳出来了干了这件事，在去年的 MacBook 升级中就已经把 USB Type-A 取消了，好像大家也并没用过多抵触，可能是使用的人少的原因，但是就在刚刚发布的 MacBook Pro 中取消了全部接口，仅仅只有四个 USB Type-C 了，然后大家都莫名高潮了，说「什么苹果智障！不考虑消费者！出门要带一堆转接头！！苹果就是为了赚配件的钱！！新款手机连接不是新款电脑！！我要去买老款的 MacBook Pro ！！！库克是个同性恋！！！苹果吃枣药丸！！！」。

好吧，你们赢了。

如果你作为消费者来仔细想想，当然你本来就是消费者，可以正反随便插、想怎么插怎么插，晚上也不用开灯就能插，速度而且快的惊人，这个口用处多的数不清，想怎么用怎么用，你现在会怎么想？反正现在好多 Android 手机已经是 USB Type-C 了。

# FluentScheduler 是什么？

> Automated job scheduler with fluent interface.

这是作者在 Github 上的介绍，就是一个定时任务管理器。在 .Net 下类似的有微软的 Timer 、 Quartz.NET 、 FluentScheduler 以及Windows服务等，关于 Quartz.NET 的使用几乎和 Java 下的 Quartz 没什么区别，我之前写过一篇 [Spring 使用 Quartz 任务调度定时器](http://blog.mayongfa.cn/169.html) 是关于 Quartz 的。

定时任务或者说作业调度，可能也只有在你指定一个时间做统计、发邮件或者一些你想完成的业务逻辑时有用，这也是它出现的目的。

## 如何使用 FluentScheduler ？

我是推荐你去作者的 Github 去看看源码或例子，地址： <https://github.com/fluentscheduler/FluentScheduler>
当然，这里我用作者的例子做了演示和翻译，保证谁都能看的懂。

**一、安装FluentScheduler程序包**
打开**程序包管理控制台**，输入`Install-Package FluentScheduler`即可。步骤：状态栏选择 **工具 - 库程序包管理器 - 程序包管理控制台**，如下图：
![FluentScheduler package.png](http://blog.mayongfa.cn/usr/uploads/2016/10/832354406.png)

输入`Install-Package FluentScheduler`。
![Install-Package.png](http://blog.mayongfa.cn/usr/uploads/2016/10/4039018993.png)

**二、写代码**
我这里只简单贴一下作者的示例代码，更推荐你去 Github 看，但我随手翻译了一下，或许更容易阅读一些。

```
public class Demo : Registry
{
    public Demo()
    {
        // Schedule an IJob to run at an interval
        // 立即执行每两秒一次的计划任务。（指定一个时间间隔运行，根据自己需求，可以是秒、分、时、天、月、年等。）
        Schedule<MyJob>().ToRunNow().AndEvery(2).Seconds();

        // Schedule an IJob to run once, delayed by a specific time interval
        // 延迟一个指定时间间隔执行一次计划任务。（当然，这个间隔依然可以是秒、分、时、天、月、年等。）
        Schedule<MyJob>().ToRunOnceIn(5).Seconds();

        // Schedule a simple job to run at a specific time
        // 在一个指定时间执行计划任务（最常用。这里是在每天的下午 1:10 分执行）
        Schedule(() => Trace.WriteLine("It's 1:10 PM now.")).ToRunEvery(1).Days().At(13, 10);

        Schedule(() => {

            // 做你想做的事儿。
            Trace.WriteLine("It's 1:10 PM now.");

        }).ToRunEvery(1).Days().At(13, 10);

        // Schedule a more complex action to run immediately and on an monthly interval
        // 立即执行一个在每月的星期一 3:00 的计划任务（可以看出来这个一个比较复杂点的时间，它意思是它也能做到！）
        Schedule<MyComplexJob>().ToRunNow().AndEvery(1).Months().OnTheFirst(DayOfWeek.Monday).At(3, 0);

        // Schedule multiple jobs to be run in a single schedule
        // 在同一个计划中执行两个（多个）任务
        Schedule<MyJob>().AndThen<MyOtherJob>().ToRunNow().AndEvery(5).Minutes();

    }


}

public class MyJob : IJob
{

    void IJob.Execute()
    {
        Trace.WriteLine("现在时间是："+DateTime.Now);
    }
}

public class MyOtherJob : IJob
{

    void IJob.Execute()
    {
        Trace.WriteLine("这是另一个 Job ，现在时间是：" + DateTime.Now);
    }
}

public class MyComplexJob : IJob
{

    void IJob.Execute()
    {
        Trace.WriteLine("这是比较复杂的 Job ，现在时间是：" + DateTime.Now);
    }
}
```

**三、初始化**
在`Global.asax`中加入一句

```
JobManager.Initialize(new Demo());
```

上面是简单的使用，其实已经足够了，当然还有更多变态的需求，作者也在文档里写了，比如这个：你想执行一个计划任务，每周一 14:00 运行。但现在是星期一上午 10:00 ，那你的程序应该在今天运行还是在下周星期一？这里用到了 `ToRunEvery`。
还有并发任务的处理，有兴趣可以去看看。

# [总结一下](http://blog.mayongfa.cn/186.html)

FluentScheduler 是 .Net 下，可以让你轻松实现定时任务的工具，不需要再去写**Windows服务**了，更重要的是时间设置起来灵活很多，定时任务难点不就是在这么。