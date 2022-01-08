import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Role} from "../role/role.model";
import {UserRole} from "../role/user-role.model";
import {RoleModule} from "../role/role.module";
import {AuthModule} from "../auth/auth.module";
import {BanReasonModule} from "../ban-reason/ban-reason.module";
import {Post} from "../post/post.model";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRole, Post]),
        RoleModule,
        forwardRef(() => AuthModule),
        BanReasonModule
    ],
    exports: [
        UserService
    ]
})
export class UserModule {}
