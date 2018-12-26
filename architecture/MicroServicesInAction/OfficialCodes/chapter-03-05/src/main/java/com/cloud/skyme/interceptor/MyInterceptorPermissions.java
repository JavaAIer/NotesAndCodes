/******************************************************************
 *
 *    Copyright (c) 2010-2017 Digital Telemedia Co.,Ltd
 *    https://home.cnblogs.com/u/skyme/
 *
 *    Package:     com.cloud.skyme.interceptor
 *
 *    Filename:    MyInterceptorPermissions.java
 *
 *    Description: 权限验证
 *
 *    Copyright:   Copyright (c) 2010-2017
 *
 *    Company:     cloudskyme
 *
 *    @author:     zhangfeng
 *
 *    @version:    1.0.0
 *
 *    Create at:   2017年11月8日 上午10:40:31
 *
 *    Revision:
 *
 *    2017年11月8日 上午10:40:31
 *        - first revision
 *
 *****************************************************************/
package com.cloud.skyme.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName MyInterceptorPermissions
 * @Description 权限验证
 * @author zhangfeng
 * @Date 2017年11月8日 上午10:40:31
 * @version 1.0.0
 */
public class MyInterceptorPermissions implements HandlerInterceptor {
	
	private final static Logger logger = LoggerFactory.getLogger(MyInterceptorPermissions.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		logger.info(">>>权限验证>>>>>>>在请求处理之前进行调用（Controller方法调用之前）");
        return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		logger.info(">>>权限验证请求处理之后进行调用，但是在视图被渲染之前（Controller方法调用之后）");
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		logger.info(">>>权限验证在整个请求结束之后被调用，也就是在DispatcherServlet 渲染了对应的视图之后执行（主要是用于进行资源清理工作）");
	}

}
