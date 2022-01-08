import {Module} from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Post} from "./post.model";
import {FileModule} from "../file/file.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
      SequelizeModule.forFeature([User, Post]),
      FileModule,
      AuthModule
  ],
})
export class PostModule {}
