/**
 * 
 */
package com.study.jvm.c04;

import java.util.ArrayList;
import java.util.List;

/**
 * @program: jvm
 * @description: 内存溢出的Jvm观察
 * @author: JavaAIer
 * @create: 2019年3月18日
 *
 *	Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
 */
public class TryOutOfMemory {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		List<TryOutOfMemory> list = new ArrayList<>();
		while(true) {
			list.add(new TryOutOfMemory());
		}

	}

}
