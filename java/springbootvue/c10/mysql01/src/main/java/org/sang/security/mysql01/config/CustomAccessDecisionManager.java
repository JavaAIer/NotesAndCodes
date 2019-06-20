package org.sang.security.mysql01.config;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;

/**
 * 用于角色信息的比对
 */
@Component
public class CustomAccessDecisionManager
        implements AccessDecisionManager {
    /**
     * 判断当前登录的用户是否具备当前请求URL所需要的角色信息
     * 如果不具备,就抛出AccessDeniedException异常
     * 否则不做任何事即可
     *
     * @param auth   包含当前登录用户的信息
     * @param object 一个FilterInvocation对象,可以获取当前请求对象等
     * @param ca     FilterInvocationSecurityMetadataSource中的getAttributes方法的返回值,即当前请求URL所需要的角色.
     */
    @Override
    public void decide(Authentication auth,
                       Object object,
                       Collection<ConfigAttribute> ca) {

        //进行角色信息对比,如果需要的角色是ROLE_LOGIN,说明当前请求的URL用户登录后即可访问.
        //如果auth是UsernamePasswordAuthenticationToken的实例,那么说明当前用户已登录,该方法到此结束,否则进入正常的判断流程.
        //如果当前用户具备当前请求需要的角色,那么方法结束.
        Collection<? extends GrantedAuthority> auths = auth.getAuthorities();
        for (ConfigAttribute configAttribute : ca) {
            if ("ROLE_LOGIN".equals(configAttribute.getAttribute())
                    && auth instanceof UsernamePasswordAuthenticationToken) {
                return;
            }
            for (GrantedAuthority authority : auths) {
                if (configAttribute.getAttribute().equals(authority.getAuthority())) {
                    return;
                }
            }
        }
        throw new AccessDeniedException("权限不足");
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}
