import {Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostService} from "./post.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiResponse} from "@nestjs/swagger";
import {Post as PostModel} from "./post.model";
import {Request} from "express";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @ApiResponse({type: PostModel})
    @UseGuards(JwtAuthGuard)
    // @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreatePostDto, @UploadedFile() image, @Req() req) {
        return this.postService.createPost(dto, image, req.user)
    }
}
