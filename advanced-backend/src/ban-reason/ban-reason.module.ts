import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import { BanReasonService } from './ban-reason.service';
import {BanReason} from "./ban-reason.model";
import {UserService} from "../user/user.service";

@Module({
    providers: [BanReasonService],
    imports: [
        SequelizeModule.forFeature([BanReason, User])
    ],
    exports: [
        BanReasonService
    ]
})
export class BanReasonModule {}
