package org.sang.security.globalmethod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
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
    public String dba() {
        return methodService.dba();
    }

    @GetMapping("/methodadmin")
    public String SeeAdminMethod(){
        return methodService.admin();
    }

    @GetMapping("/methoddba")
    public String SeeDbaMethod(){
        return methodService.dba();
    }

    @GetMapping("/methoduser")
    public String SeeUserMethod(){
        return methodService.user();
    }
}
