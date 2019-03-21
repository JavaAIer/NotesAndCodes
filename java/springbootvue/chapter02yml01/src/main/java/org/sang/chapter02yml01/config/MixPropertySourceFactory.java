package org.sang.chapter02yml01.config;

import java.io.IOException;
import java.util.Properties;

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.support.DefaultPropertySourceFactory;
import org.springframework.core.io.support.EncodedResource;

/**
 * 名称：<br/>
 * 说明：<br/>
 * (At)PropertySource(value = {   "a.properties",   "b.yml"}, factory = MixPropertySourceFactory.class)
 * @author JavaAIer
 * @date 2019年3月21日
 */
public class MixPropertySourceFactory extends DefaultPropertySourceFactory {

	@Override
	public PropertySource<?> createPropertySource(String name, EncodedResource resource) throws IOException {
		String sourceName = name != null ? name : resource.getResource().getFilename();
		if (!resource.getResource().exists()) {
			return new PropertiesPropertySource(sourceName, new Properties());
		} else if (sourceName.endsWith(".yml") || sourceName.endsWith(".yaml")) {
			Properties propertiesFromYaml = loadYml(resource);
			return new PropertiesPropertySource(sourceName, propertiesFromYaml);
		} else {
			return super.createPropertySource(name, resource);
		}
	}

	private Properties loadYml(EncodedResource resource) throws IOException {
		YamlPropertiesFactoryBean factory = new YamlPropertiesFactoryBean();
		factory.setResources(resource.getResource());
		factory.afterPropertiesSet();
		return factory.getObject();
	}
}
