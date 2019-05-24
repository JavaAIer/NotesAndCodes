package org.sang.securitybcrypt;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

/**
 * @BelongsProject: securitybcrypt
 * @BelongsPackage: org.sang.securitybcrypt
 * @Author:JavaAier
 * @CreateTime: 2019-05-24 16:04
 * @Description: 方法验证服务
 */
@Service
public class MethodService {
    @Secured("ROLE_ADMIN")
    public String admin(){
        return "hello admin";
    }
    @PreAuthorize(" hasRole('ADMIN') and hasRole('DBA') ")
    public String dba(){
        return "hello dba";
    }

    @PreAuthorize("hasAnyRole('ADMIN','DBA','USER')")
    public String user(){
        return "hello user";
    }




}
