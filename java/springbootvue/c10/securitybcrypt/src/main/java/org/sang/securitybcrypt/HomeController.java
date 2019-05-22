package org.sang.securitybcrypt;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {


    @GetMapping("/hello")
    public String user() {
        return "hello user";
    }

    @GetMapping("/admin/hello")
    public String admin() {
        return "Hello admin ";
    }
}
