import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Role name'})
    @IsString({message: 'Should be string.'})
    readonly value: string

    @ApiProperty({example: 'Service administrator', description: 'Role description'})
    @IsString({message: 'Should be string.'})
    readonly description: string
}