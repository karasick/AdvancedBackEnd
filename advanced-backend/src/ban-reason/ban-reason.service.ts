import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {BanReason} from "./ban-reason.model";
import {BanReasonDto} from "./dto/ban-reason.dto";

@Injectable()
export class BanReasonService {
    constructor(@InjectModel(BanReason) private readonly bannedUserRepository: typeof BanReason) {}

    async createBanReason(dto: BanReasonDto) {
        const role = await this.bannedUserRepository.create(dto)
        return role
    }

    async getBanReasonByUserId(userId: string) {
        const role = await this.bannedUserRepository.findOne({where: {userId}})
        return role
    }
}
