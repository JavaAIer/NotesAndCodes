package com.fang.c04fastjson.config;

import java.nio.charset.Charset;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;

@Configuration
public class MyFastjsonConfig {
	   @Bean
	    FastJsonHttpMessageConverter fastJsonHttpMessageConverter() {
	        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
	        FastJsonConfig config = new FastJsonConfig();
	        config.setDateFormat("yyyy-MM-dd");
	        config.setCharset(Charset.forName("UTF-8"));
	        config.setSerializerFeatures(
	                SerializerFeature.WriteClassName,
	                SerializerFeature.WriteMapNullValue,
	                SerializerFeature.PrettyFormat,
	                SerializerFeature.WriteNullListAsEmpty,
	                SerializerFeature.WriteNullStringAsEmpty
	        );
	        converter.setFastJsonConfig(config);
	        return converter;
	    }
}
