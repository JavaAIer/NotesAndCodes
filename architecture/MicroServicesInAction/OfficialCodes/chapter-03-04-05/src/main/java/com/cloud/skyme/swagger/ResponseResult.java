package com.cloud.skyme.swagger;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "ResponseResult")
public class ResponseResult {
	/**
	 * 错误反馈编码
	 */
	@ApiModelProperty(value = "反馈编码")
	private String respCode;

	/**
	 * 错误反馈描述
	 */
	@ApiModelProperty(value = "反馈描述")
	private String respDesc;

	private String reqUrl;

	public String getRespCode() {
		return respCode;
	}

	public void setRespCode(String respCode) {
		this.respCode = respCode;
	}

	public String getRespDesc() {
		return respDesc;
	}

	public void setRespDesc(String respDesc) {
		this.respDesc = respDesc;
	}

	public String getReqUrl() {
		return reqUrl;
	}

	public void setReqUrl(String reqUrl) {
		this.reqUrl = reqUrl;
	}

}
