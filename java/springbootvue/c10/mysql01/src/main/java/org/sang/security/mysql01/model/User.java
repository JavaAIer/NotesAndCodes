package org.sang.security.mysql01.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


/**
 * 用户实体类需要实现UserDetails接口，并实现该接口中的7个方法。
 * 用户根据实际情况设置这7个方法的返回值。
 * 因为默认情况下不需要开发者自己进行密码和用户等信息的比对，开发者只需要提供相关信息即可。
 *
 * 例如：
 * getPassword()方法返回的密码和用户输入的登录密码不匹配，会自动抛出BadCredentialsException异常。
 * isAccountNonExpired()方法返回了false,会自动抛出AccountExpiredException异常。
 *
 * 因此对于开发者而方言，只需要按照数据库中的数据在这里返回相应的配置即可。
 *
 * 本例中因为数据库只有enabled和locked状态，所以账户未过期和密码未过期都返回true。
 *
 *
 */
public class User implements UserDetails {
    private Integer id;
    private String username;
    private String password;
    private Boolean enabled;
    private Boolean locked;
    private List<Role> roles;

    /**
     * 获取当前用户对象所具有的角色信息
     * 在本例中用户所具有的角色存储在roles属性中，因此该方法直接遍历roles属性
     * 然后构造SimpleGrantedAuthority集合并返回。
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }

    /**
     * 获取当前用户对象的密码
     * @return
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * 获取当前用户对象的用户名
     * @return
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * 当前账户是否未过期
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 当前用户是否未锁定
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    /**
     * 当前账户密码是否未过期
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 当前账户是否可用
     * @return
     */
    @Override
    public boolean isEnabled() {
        return enabled;
    }
    //省略getter/setter

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public Boolean getEnabled() {
//        return enabled;
//    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
