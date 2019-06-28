package com.javaaier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Component
public class MailService {
    /**
     * JavaMailSender是在MailSenderPropertiesConfiguration中配置好的,该类在Mail自动配置类
     * MailSenderAutoConfiguration中导入,因此这儿注入就可以使用了.
     */
    @Autowired
    JavaMailSender javaMailSender;

    /**
     * 发送带图片资源的邮件
     * 在发送邮件时分别传入图片资源路径 和资源Id,通过FileSystemResources构造静态资源.
     * 然后通过调用addInline方法将资源加入邮件对象中.
     * 注意,在调用MimeMessageHelper中的setText方法时,第二个参数true表示邮件正文是html格式的,该参数不传默认为false .
     * @param from
     * @param to
     * @param subject
     * @param content
     * @param srcPath
     * @param resIds
     */
    public void sendMailWithImg(String from, String to,
                                String subject, String content,
                                String[] srcPath,String[] resIds) {
        if (srcPath.length != resIds.length) {
            System.out.println("发送失败");
            return;
        }
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message,true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content,true);
            for (int i = 0; i < srcPath.length; i++) {
                FileSystemResource res =
                        new FileSystemResource(new File(srcPath[i]));
                helper.addInline(resIds[i], res);
            }
            javaMailSender.send(message);
        } catch (MessagingException e) {
            System.out.println("发送失败");
        }
    }

    /**
     * 发送简单邮件
     * @param from 发件人
     * @param to 收件人
     * @param cc 抄送
     * @param subject 主题
     * @param content 内容
     */
    public void sendSimpleMail(String from, String to, String cc, String subject, String content) {
        SimpleMailMessage simpMsg = new SimpleMailMessage();
        simpMsg.setFrom(from);
        simpMsg.setTo(to);
        simpMsg.setCc(cc);
        simpMsg.setSubject(subject);
        simpMsg.setText(content);
        javaMailSender.send(simpMsg);
    }

    /**
     *  发送带附件的邮件
     * @param from 发件人
     * @param to 收件人
     * @param subject 主题
     * @param content 内容
     * @param file 附件
     */
    public void sendAttachFileMail(String from, String to,
                       String subject, String content, File file) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            //第二个参数表示这是一封带附件的邮件(multipart表示一个邮件有多个正文,多个附件以及内嵌资源,邮件的表现方式更加丰富)
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content);
            helper.addAttachment(file.getName(), file);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendHtmlMail(String from, String to,
                             String subject, String content){
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setFrom(from);
            helper.setSubject(subject);
            helper.setText(content, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            System.out.println("发送失败");
        }
    }
}
