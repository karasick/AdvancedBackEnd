import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
import {RoleService} from "./role.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {}

    // @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/:value')
    getOneByValue(@Param('value') value: string) {
        return this.roleService.getOneRoleByValue(value)
    }

}
