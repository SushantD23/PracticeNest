import { Module } from "@nestjs/common";
import { testController } from "../controller/test.controller";
import { testService } from "../provider/test.service";


@Module({
    controllers: [testController],
    providers: [testService,
        {provide: "DB_Id", useValue:"xBdd23DS"}
    ],
    exports: [testService],  
})

export class testModule {}