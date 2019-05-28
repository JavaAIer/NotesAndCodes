package org.sang.security.mysql01.config;

import org.sang.security.mysql01.mapper.MenuMapper;
import org.sang.security.mysql01.model.Menu;
import org.sang.security.mysql01.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.util.Collection;
import java.util.List;

/**
 * Spring Security 中通过FilterInvocationSecurityMetadataSource接口中的
 * getAttributes方法来确定一个请求需要哪些角色。
 * FilterInvocationSecurityMetadataSource接口的默认实现类是：
 * DefaultFilterInvocationSecurityMetadataSource，参考DefaultFilterInvocationSecurityMetadataSource的实现
 * 开发者可以定义自己的FilterInvocationSecurityMetadataSource。
 */
@Component
public class CustomFilterInvocationSecurityMetadataSource
        implements FilterInvocationSecurityMetadataSource {
    //创建一个AntPathMatcher，主要用来实现ant风格的url匹配
    AntPathMatcher antPathMatcher = new AntPathMatcher();
    @Autowired
    MenuMapper menuMapper;

    /**
     * 主要实现该方法，参数是一个FilterInvocation，开发者可以从FilterInvocation中提取出当前
     * 请求的URL，返回值是Collection<ConfigAttribute>，表示当前请求Url所需的角色。
     * @param object
     * @return
     * @throws IllegalArgumentException
     */
    @Override
    public Collection<ConfigAttribute> getAttributes(Object object)
            throws IllegalArgumentException {
        //从参数中提取出当前请求的url。
        String requestUrl = ((FilterInvocation) object).getRequestUrl();
        //从数据库中获取所有的资源信息，即本案例中的menu表以及menu所对应的role。
        //在真实项目中，开发者可以将资源信息缓存在redis或者其他缓存数据库中。
        List<Menu> allMenus = menuMapper.getAllMenus();
        for (Menu menu : allMenus) {
            if (antPathMatcher.match(menu.getPattern(), requestUrl)) {
                List<Role> roles = menu.getRoles();
                String[] roleArr = new String[roles.size()];
                for (int i = 0; i < roleArr.length; i++) {
                    roleArr[i] = roles.get(i).getName();
                }
                return SecurityConfig.createList(roleArr);
            }
        }
        return SecurityConfig.createList("ROLE_LOGIN");
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return FilterInvocation.class.isAssignableFrom(clazz);
    }
}
