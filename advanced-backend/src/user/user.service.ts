import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RoleService} from "../role/role.service";
import {AddUserRoleDto} from "./dto/add-user-role.dto";
import {BanReasonDto} from "../ban-reason/dto/ban-reason.dto";
import {rolesConstants} from "../role/constants";
import {BanReasonService} from "../ban-reason/ban-reason.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User,
                private readonly roleService: RoleService,
                private readonly banReasonService: BanReasonService) {}

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getOneUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {email},
            include: {all: true}
        })

        return user
    }

    async createUser(userDto: CreateUserDto) {
        const user = await this.userRepository.create(userDto)

        const role = await this.roleService.getOneRoleByValue(rolesConstants.USER_ROLE_VALUE)
        await user.$set('roles', [role.id])
        user.roles = [role]

        return user
    }

    async addRoleToUser(dto: AddUserRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if(!user) {
            throw new HttpException('Given user cannot be found.', HttpStatus.BAD_REQUEST)
        }

        const role = await this.roleService.getOneRoleByValue(dto.value)
        if(!role) {
            throw new HttpException('Given role cannot be found.', HttpStatus.BAD_REQUEST)
        }

        await user.$add('roles', role.id)

        return dto
    }

    async banUser(dto: BanReasonDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if(!user) {
            throw new HttpException('Given user cannot be found.', HttpStatus.BAD_REQUEST)
        }

        user.isBanned = true

        const reasonSaving = this.banReasonService.createBanReason(dto)
        const userSaving = user.save()

        await Promise.all([reasonSaving, userSaving])

        return user
    }
}
