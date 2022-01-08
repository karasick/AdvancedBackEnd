import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class UserCredentialsDto {
    @ApiProperty({example: 'example@mail.com', description: 'Unique e-mail address'})
    @IsString({message: 'Should be string.'})
    @IsEmail({}, {message: 'Should be correct e-mail address.'})
    readonly email: string

    @ApiProperty({example: '1234', description: 'Password'})
    @IsString({message: 'Should be string.'})
    @Length(4, 24, {message: 'Should be 4 - 24 characters long.'})
    readonly password: string
}