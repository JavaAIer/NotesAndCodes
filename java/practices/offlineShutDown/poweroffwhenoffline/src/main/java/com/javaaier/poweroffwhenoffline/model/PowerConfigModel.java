package com.javaaier.poweroffwhenoffline.model;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
@Component
@PropertySource({"classpath:application.properties"})
public class PowerConfigModel {
	@Value("${my.configuration.windows.commands.shutdown}")
	private String windowsShutdownCommands;
	@Value("${my.configuration.linux.commands.shutdown}")
	private String linuxShutdownCommands;
	public String getWindowsShutdownCommands() {
		return windowsShutdownCommands;
	}
	public void setWindowsShutdownCommands(String windowsShutdownCommands) {
		this.windowsShutdownCommands = windowsShutdownCommands;
	}
	public String getLinuxShutdownCommands() {
		return linuxShutdownCommands;
	}
	public void setLinuxShutdownCommands(String linuxShutdownCommands) {
		this.linuxShutdownCommands = linuxShutdownCommands;
	}
	
	@Override
	public String toString() {
		return "PowerConfigModel [windowsShutdownCommands=" + windowsShutdownCommands + ", linuxShutdownCommands="
				+ linuxShutdownCommands + "]";
	}

	
}
