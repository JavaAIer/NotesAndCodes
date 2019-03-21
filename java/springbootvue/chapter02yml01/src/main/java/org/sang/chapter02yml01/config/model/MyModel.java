package org.sang.chapter02yml01.config.model;

import java.util.Arrays;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @program: chapter02yml01
 * @description: 描述一下这个类或接口的作用
 * @author: JavaAIer
 * @create: 2019年3月21日
 *
 */
@Component
@ConfigurationProperties(prefix = "my")
@PropertySource(value = "classpath:application.yml", encoding = "utf-8")
public class MyModel {

	@Override
	public String toString() {
		return "MyModel [myname=" + myname + ", myaddress=" + myaddress + ", myfavorites="
				+ Arrays.toString(myfavorites) + "]";
	}

	private String myname;
	private String myaddress;
	private String[] myfavorites = {};

	public String getMyname() {
		return myname;
	}

	public void setMyname(String myname) {
		this.myname = myname;
	}

	public String getMyaddress() {
		return myaddress;
	}

	public void setMyaddress(String myaddress) {
		this.myaddress = myaddress;
	}

	public String[] getMyfavorites() {
		return myfavorites;
	}

	public void setMyfavorites(String[] myfavorites) {
		this.myfavorites = myfavorites;
	}

}
