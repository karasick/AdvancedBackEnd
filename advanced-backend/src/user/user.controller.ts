import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../role/role.decorator";
import {RoleGuard} from "../role/role.guard";
import {AddUserRoleDto} from "./dto/add-user-role.dto";
import {BanReasonDto} from "../ban-reason/dto/ban-reason.dto";
import {rolesConstants} from "../role/constants";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({summary: 'Get all Users'})
    @ApiResponse({type: [User]})
    @Roles(rolesConstants.ADMIN_ROLE_VALUE)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'User creation'})
    @ApiResponse({type: User})
    @Roles(rolesConstants.ADMIN_ROLE_VALUE)
    @UseGuards(JwtAuthGuard, RoleGuard)
    // @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Add role to user'})
    @Roles(rolesConstants.ADMIN_ROLE_VALUE)
    @UseGuards(JwtAuthGuard, RoleGuard)
    // @UsePipes(ValidationPipe)
    @Post('/role')
    addRole(@Body() roleDto: AddUserRoleDto) {
        return this.userService.addRoleToUser(roleDto)
    }

    @ApiOperation({summary: 'Ban user'})
    @Roles(rolesConstants.ADMIN_ROLE_VALUE)
    @UseGuards(JwtAuthGuard, RoleGuard)
    // @UsePipes(ValidationPipe)
    @Post('/ban')
    ban(@Body() banDto: BanReasonDto) {
        return this.userService.banUser(banDto)
    }
}
