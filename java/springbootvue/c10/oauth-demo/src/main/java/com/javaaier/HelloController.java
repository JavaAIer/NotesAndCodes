package com.javaaier;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @BelongsProject: oauth-demo
 * @BelongsPackage: com.javaaier
 * @Author:
 * @CreateTime: 2019-06-21 16:56
 * @Description:
 */
@RestController
public class HelloController {
    @GetMapping("/admin/hello")
    public String admin() {
        return "Hello admin!";
    }
    @GetMapping("/user/hello")
    public String user() {
        return "Hello user!";
    }
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}
