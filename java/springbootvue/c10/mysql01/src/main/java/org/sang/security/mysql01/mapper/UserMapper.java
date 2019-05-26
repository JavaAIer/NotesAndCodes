package org.sang.security.mysql01.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.sang.security.mysql01.model.Role;
import org.sang.security.mysql01.model.User;

import java.util.List;

@Mapper
public interface UserMapper {
    User loadUserByUsername(String username);
    List<Role> getUserRolesByUid(Integer id);
}
