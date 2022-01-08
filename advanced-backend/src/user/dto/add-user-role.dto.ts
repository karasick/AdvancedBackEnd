import {IsNumber, IsString} from "class-validator";

export class AddUserRoleDto {
    @IsNumber({}, {message: 'Should be number.'})
    readonly userId: number;

    @IsString({message: 'Should be string.'})
    readonly value: string;
}