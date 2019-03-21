package org.sang.chapter02yml01.config.model;

import java.util.List;

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
@ConfigurationProperties()
@PropertySource(value="classpath:my.yml")
public class MyModel {
	private String name;
	private String address;
	private List<String> favorites;
	
	
	@Override
	public String toString() {
		return "MyModel [name=" + name + ", address=" + address + ", favorites=" + favorites + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MyModel other = (MyModel) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public List<String> getFavorites() {
		return favorites;
	}
	public void setFavorites(List<String> favorites) {
		this.favorites = favorites;
	}
	
	
}
