package org.sang.chapter02yml01.config.model;

import java.util.Arrays;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="list")
@PropertySource(value = "classpath:application.yml", encoding = "utf-8")
public class UsersModel {
	private UserModel[] users= {};

	public UserModel[]  getUsers() {
		return users;
	}

	public void setUsers(UserModel[]  users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "UsersModel [users=" + Arrays.toString(users)   + "]";
	}

}


