package com.javaaier.service.impl;

import com.javaaier.entity.User;
import com.javaaier.mapper.UserMapper;
import com.javaaier.service.UserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 好好xio习
 * @since 2019-06-20
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
