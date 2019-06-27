@T //通过@符号进行引用该方法，类似java中的注解
class User {
    constructor(name, age = 20) {
        this.name = name;
        this.age = age;
    }
}

function T(target) {
    //定义一个普通的方法      
    console.log(target);
    //target对象为修饰的目标对象，这里是User对象    
    target.country = "中国";
    //为User类添加一个静态属性country
}

console.log(User.country); //打印出country属性值
