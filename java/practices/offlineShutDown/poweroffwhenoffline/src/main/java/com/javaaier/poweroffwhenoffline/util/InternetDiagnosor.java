package com.javaaier.poweroffwhenoffline.util;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.URL;

public class InternetDiagnosor {
	private static String remoteInternetAddr = "8.8.8.8";// 需要连接的IP地址
	private static String remoteUrlAddr = "http://www.baicu.com/";// 需要连接的IP地址

	/**
	 * 传入需要连接的IP，返回是否连接成功
	 * 
	 * @param remoteInetAddr
	 * @return
	 */
	public static boolean isReachable(String remoteInetAddr) {
		boolean reachable = false;
		try {
			InetAddress address = InetAddress.getByName(remoteInetAddr);
			reachable = address.isReachable(5000);
			System.out.println("连接正常"+remoteInetAddr);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("无法连接到"+remoteInetAddr);
		}
		return reachable;
	}

	public static boolean isAccessable(String urlAddress) {
		URL url = null;
		Boolean bon = false;
		try {
			url = new URL(urlAddress);
			InputStream in = url.openStream();// 打开到此 URL 的连接并返回一个用于从该连接读入的 InputStream
			System.out.println("连接正常"+urlAddress);
			in.close();// 关闭此输入流并释放与该流关联的所有系统资源。
			bon = true;
		} catch (IOException e) {
			System.out.println("无法连接到：" + urlAddress);
			bon = false;
		}
		return bon;
	}

	public static void main(String[] args) {
		isAccessable(remoteUrlAddr);
		isReachable(remoteInternetAddr);
	}
}
