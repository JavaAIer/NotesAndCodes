package org.sang.chapter02yml01.config.model;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties()
@PropertySource(value="classpath:users.yml")
public class UsersModel {
	private List<MyModel> users;

	public List<MyModel> getUsers() {
		return users;
	}

	public void setUsers(List<MyModel> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "UsersModel [users=" + users + "]";
	}

}
