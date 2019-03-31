package com.sang.c05s04multijpa.dao1;


import org.springframework.data.jpa.repository.JpaRepository;

import com.sang.c05s04multijpa.model.User;


/**
 * @program:  c05s04multijpa
 * @description:  
 * @author JavaAIer
 * @date 2019年3月31日
 */
public interface UserDao extends JpaRepository<User,Integer>{
}
