package com.groovy.load;

import groovy.lang.GroovyClassLoader;

/**
 * @program: jvm
 * @description: 听说这个类可以用字符串来创建对象了。好侵入，好黑客的感觉。23333
 * @author: JavaAIer
 * @create: 2019年3月27日
 *
 */
public class Parse {
	@SuppressWarnings({ "rawtypes", "resource" })
	public static void main(String[] args) throws InstantiationException, IllegalAccessException {
		String classDataString = "package com.deppon.dg.common.commonTarget.common;public class TestObj {public static int years =0;  public TestObj(){years++; System.out.println(\"爱你\"+years+\"年\");}}";
		GroovyClassLoader groovyClassLoader = new GroovyClassLoader();
		Class aClass = groovyClassLoader.parseClass(classDataString);
		for (int i = 0; i < 1000000; i++) {
			Object o = aClass.newInstance();
		}
		System.out.println("finished");
		groovyClassLoader.clearCache();
	}

}
