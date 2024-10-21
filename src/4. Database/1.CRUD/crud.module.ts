import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { crudModel } from "./crud.model";
import { crudService } from "./crud.service";
import { crudController } from "./crud.controller";


@Module({
    imports:[SequelizeModule.forFeature([crudModel])],
    providers:[crudService],
    controllers:[crudController],
})

export class crudModule {}