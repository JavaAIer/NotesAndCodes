package com.javaaier;

import com.javaaier.common.CodeGenerator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LombokDruidMybatisplusApplicationTests {

    @Test
    public void contextLoads() {
    }


    @Test
    public void testCodeGenerator() {
        CodeGenerator gse = new CodeGenerator();
        //要给那些表生成
        gse.generateByTables(false, "user", "role", "user_role");

    }
}
