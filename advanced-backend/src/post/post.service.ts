import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./post.model";
import path from "path";
import {FileService} from "../file/file.service";
import {User} from "../user/user.model";

@Injectable()
export class PostService {
    constructor(@InjectModel(Post) private readonly postRepository: typeof Post,
                private readonly fileService: FileService) {}

    async createPost(dto: CreatePostDto, image: any, user: User) {
        if(!user) {
            throw new UnauthorizedException({message: 'User is not authorized.'})
        }

        const postData = {
            ...dto,
            userId: user.id,
            image: null
        }

        if(image) {
            const imageFileName = await this.fileService.createFile(image)
            postData.image = imageFileName
        }

        const post = await this.postRepository.create(postData)

        return post
    }
}
