package org.sang.c06s03session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;


/**
 * @BelongsProject: c06s03session
 * @BelongsPackage: org.sang.c06s03session
 * @Author: JavaAIer
 * @CreateTime: 2019-04-09 13:41
 * @Description: 一个打招呼的Controller
 */
@RestController
public class HelloController {
    @Value("${server.port}")
    String port;
    @PostMapping("/save")
    public String saveName(String name, HttpSession session) {
        session.setAttribute("name", name);
        return port;
    }
    @GetMapping("/get")
    public String getName(HttpSession session) {
        return port + ":"
                + session.getAttribute("name").toString();
    }
}
