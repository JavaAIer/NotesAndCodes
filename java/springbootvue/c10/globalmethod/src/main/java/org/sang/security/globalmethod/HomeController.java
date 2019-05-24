package org.sang.security.globalmethod;

import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Bean
    MethodService methodService;


    @GetMapping("/hello")
    public String user() {
        return methodService.user();
    }

    @GetMapping("/admin/hello")
    public String admin() {
        return methodService.admin();
    }

    @GetMapping("/dba/hello")
    public String admin() {
        return methodService.dba();
    }

    public String SeeAdminMethod(){
        return
    }
}
