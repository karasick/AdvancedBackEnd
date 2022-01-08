import {IsNumber, IsString} from "class-validator";

export class CreatePostDto {
    @IsString({message: 'Should be string.'})
    title: string

    @IsString({message: 'Should be string.'})
    content: string
}