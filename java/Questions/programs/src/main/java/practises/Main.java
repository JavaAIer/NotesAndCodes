package practises;

import java.util.*;

public class Main {
	public static void main(String args[]) {
		Scanner sc = null;
		try {
			// 存单词的频率
			Map<String, Integer> map = new TreeMap<String, Integer>();
			sc = new Scanner(System.in);
			String line;
			// 一直读输入，读一句处理一句
			while (sc.hasNextLine()) {
				//if(!"".equals(line = sc.nextLine()))
				line = sc.nextLine();
				if (line.equals("")) {
					break;
				}
				// 把逗号和句号用空格代替。
				line = line.replace(",", " ").replace(".", " ");
				String[] words = line.split(" ");
				for (String word : words) {
					if(!word.isEmpty()&& word!=" ")
					{
						if (map.containsKey(word)) {
							int count = map.get(word);
							map.put(word, count + 1);
						} else {
							map.put(word, 1);
						}
					}
				}
			}
	        Iterator<String> it = map.keySet().iterator();  
	        while (it.hasNext()) {  	          
	        	String key = it.next();
	            System.out.println(key+":"+map.get(key));  
	        }  
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sc != null) {
				sc.close();
			}
		}
	}
}