package org.sang.chapter02noparent.config;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @program: chapter02noparent
 * @description: Tomcat的配置信息
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@Configuration
public class TomcatConfig {
	@Bean
	TomcatServletWebServerFactory tomcatServletWebServerFactory() {
		TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory() {
			@Override
			protected void postProcessContext(Context context) {
				SecurityConstraint constraint = new SecurityConstraint();
				constraint.setUserConstraint("CONFIDENTIAL");
				SecurityCollection collection = new SecurityCollection();
				collection.addPattern("/*");
				constraint.addCollection(collection);
				context.addConstraint(constraint);
			}
		};
		factory.addAdditionalTomcatConnectors(createTomcatConnector());
		return factory;
	}

	/**
	 * 设置Tomcat转发
	 * @return
	 */
	private Connector createTomcatConnector() {
		Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
		connector.setScheme("http");
		connector.setPort(8080);
		connector.setSecure(false);
		connector.setRedirectPort(8081);
		return connector;
	}
}
