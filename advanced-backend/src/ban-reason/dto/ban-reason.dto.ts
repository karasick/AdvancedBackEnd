import {IsNumber, IsString} from "class-validator";

export class BanReasonDto {
    @IsString({message: 'Should be string.'})
    readonly banReason: string;

    @IsNumber({}, {message: 'Should be number.'})
    readonly userId: number;
}