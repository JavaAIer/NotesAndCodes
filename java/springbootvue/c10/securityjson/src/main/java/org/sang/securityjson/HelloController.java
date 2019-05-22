package org.sang.securityjson;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.View;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }

    @GetMapping("/admin/hello")
    public String admin() {
        return "hello admin";
    }

    @GetMapping("/user/hello")
    public String user() {
        return "hello user";
    }

    @GetMapping("/db/hello")
    public String dba() {
        return "hello dba";
    }

}
