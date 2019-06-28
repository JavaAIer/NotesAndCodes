package com.javaaier;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;
import java.io.StringWriter;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailVerifyApplicationTests {
    @Autowired
    MailService mailService;
    @Test
    public void contextLoads() {
    }

    /**
     * 邮件的正文是一段html文本,用cid标注出两个静态资源,分别是p01和p02.
     */
    @Test
    public void sendMailWithImg() {
        mailService.sendMailWithImg("javaaier@qq.com",
                "javaaier@qq.com",
                "测试邮件主题(图片)",
                "<div>hello,这是一封带图片资源的邮件：" +
                        "这是图片1：<div><img src='cid:p01'/></div>" +
                        "这是图片2：<div><img src='cid:p02'/></div>" +
                        "</div>",
                new String[]{"C:\\360Downloads\\325742.jpg",
                        "C:\\360Downloads\\315023.jpg"},
                new String[]{"p01", "p02"});
    }

    @Test
    public void sendAttachFileMail() {
        mailService.sendAttachFileMail("javaaier@qq.com",
                "javaaier@qq.com",
                "测试邮件主题",
                "测试邮件内容",
                new File("C:\\360Downloads\\325742.jpg"));
    }

    @Test
    public void sendSimpleMail() {
        mailService.sendSimpleMail("javaaier@qq.com",
                "javaaier@qq.com",
                "javaaier@qq.com",
                "测试邮件主题",
                "测试邮件内容");
    }

    @Autowired
    TemplateEngine templateEngine;
    @Test
    public void sendHtmlMailThymeleaf() {
        Context ctx = new Context();
        ctx.setVariable("username", "sang");
        ctx.setVariable("gender", "男");
        String mail = templateEngine.process("mailtemplate.html", ctx);
        mailService.sendHtmlMail("javaaier@qq.com",
                "javaaier@qq.com",
                "测试邮件主题",
                mail);
    }

    @Test
    public void sendHtmlMail2() {
        try {
            Configuration configuration =
                    new Configuration(Configuration.VERSION_2_3_0);
            ClassLoader loader = EmailVerifyApplication.class.getClassLoader();
            configuration
            .setClassLoaderForTemplateLoading(loader,"ftl");
            Template template = configuration.getTemplate("mailtemplate.ftl");
            StringWriter mail = new StringWriter();
            User user = new User();
            user.setGender("男");
            user.setUsername("蒟蒻");
            template.process(user, mail);
            mailService.sendHtmlMail("javaaier@qq.com",
                    "javaaier@qq.com",
                    "测试邮件主题",
                    mail.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
