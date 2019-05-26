package org.sang.security.mysql01.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.sang.security.mysql01.model.Menu;

import java.util.List;

@Mapper
public interface MenuMapper {
    List<Menu> getAllMenus();
}
