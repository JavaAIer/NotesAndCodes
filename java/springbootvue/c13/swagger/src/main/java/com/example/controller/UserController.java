package com.example.controller;

import com.example.User;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

/**
 * @BelongsProject: swagger
 * @BelongsPackage: com.example.controller
 * @Author:
 * @CreateTime: 2019-07-01 17:43
 * @Description: 接口测试控制器
 * <p>
 * <p>
 * Api注解用在类上,用来描述整个Controller信息
 */
@RestController
@Api(tags = "用户数据接口")
public class UserController {
    /**
     * ApiOperation注解用在开发方法上,用来描述一个方法的基本信息,value是对方法作用的一个简短描述,notes则用来备注该方法的详细作用
     * ApiImplicitParam注解用在方法上,用来描述方法的参数,paramType是指方法参数的类型,可选值有path(参数获取方式@PathVariable),query(参数获取方式@RequestParam),header(参数获取方式@RequestHeader),body以及form;name表示参数名称,和参数变量对应;value是参数的描述信息;required表示该字段是否必填;defaultValue表示该字段的默认值.注意,这里的required和defaultValue等字段只是文档上的约束描述,并不能真正约束接口,约束接口还需要在@RequestParam中添加相关属性.
     * 如果方法有多个参数,可以将多个参数的@ApiImplicitParam注解放到@ApiImplicitParams中.
     *
     * @param id
     * @return
     */
    @ApiOperation(value = "查询用户", notes = "根据id查询用户")
    @ApiImplicitParam(paramType = "path", name = "id", value = "用户id", required = true)
    @GetMapping("/user/{id}")
    public String getUserById(@PathVariable Integer id) {
        return "/user/" + id;
    }

    /**
     * ApiResponse注解是对响应结果的描述,code表示响应码,message表示相应的描述信息,若有多个@ApiResponse,则放在一个@ApiResponses中
     *
     * @param id
     * @return
     */
    @ApiResponses({
            @ApiResponse(code = 200, message = "删除成功!"),
            @ApiResponse(code = 500, message = "删除失败!"),
    })
    @ApiOperation(value = "删除用户", notes = "通过id删除用户")
    @DeleteMapping("/user/{id}")
    public Integer deleteUserById(@PathVariable Integer id) {
        return id;
    }

    @ApiOperation(value = "添加用户", notes = "添加一个用户,传入用户名和地址")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "username",
                    value = "用户名", required = true, defaultValue = "sang"),
            @ApiImplicitParam(paramType = "query", name = "address",
                    value = "用户地址", required = true, defaultValue = "shenzhen")
    })
    @PostMapping("/user")
    public String addUser(@RequestParam String username,
                          @RequestParam String address) {
        return username + ":" + address;
    }

    /**
     * 使用@RequestBody注解来接收数据,此时可以通过@ApiModel注解和@ApiModelProperty注解配置User对象的描述信息.
     */
    @ApiOperation(value = "修改用户", notes = "修改用户,传入用户信息")
    @PutMapping("/user")
    public String updateUser(@RequestBody User user) {
        return user.toString();
    }

    /**
     * ApiIgnore注解表示不对某个接口生成文档
     */
    @GetMapping("/ignore")
    @ApiIgnore
    public void ignoreMethod() {

    }

}
