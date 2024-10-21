import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { userModel } from "./Database/user.model";
import { userService } from "./users.service";

@Module({
    imports: [SequelizeModule.forFeature([userModel])],
    providers: [userService],
    exports: [userService]
})

export class userModule {}