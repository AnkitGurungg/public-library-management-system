package com.csplms.seed.Shelf;

import com.csplms.entity.Shelf;
import com.csplms.util.GlobalDateUtil;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class SeedShelf implements ApplicationRunner  {

    private final GlobalDateUtil globalDateUtil;

    public SeedShelf(GlobalDateUtil globalDateUtil) {
        this.globalDateUtil = globalDateUtil;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

    }

}
