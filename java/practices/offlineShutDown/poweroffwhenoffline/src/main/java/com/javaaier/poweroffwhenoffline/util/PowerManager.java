package com.javaaier.poweroffwhenoffline.util;

import java.io.IOException;

import org.apache.commons.lang3.SystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaaier.poweroffwhenoffline.model.PowerConfigModel;

@Component
public class PowerManager {
	@Autowired
	PowerConfigModel powerConfigModel ;
	

	

	public PowerConfigModel getPowerConfigModel() {
		return powerConfigModel;
	}




	public void setPowerConfigModel(PowerConfigModel powerConfigModel) {
		this.powerConfigModel = powerConfigModel;
	}




	public void shutDown() {
		try {
			
			if (SystemUtils.IS_OS_LINUX) {
				Runtime.getRuntime().exec(powerConfigModel.getLinuxShutdownCommands());
			} else {
				Runtime.getRuntime().exec(powerConfigModel.getWindowsShutdownCommands());// 其实就这一句 shutdown -r是重启
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
