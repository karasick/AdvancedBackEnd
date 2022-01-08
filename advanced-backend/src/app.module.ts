import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import { BanReasonModule } from './ban-reason/ban-reason.module';
import {User} from "./user/user.model";
import { RoleModule } from './role/role.module';
import {Role} from "./role/role.model";
import {UserRole} from "./role/user-role.model";
import { AuthModule } from './auth/auth.module';
import {BanReason} from "./ban-reason/ban-reason.model";
import { PostModule } from './post/post.module';
import {Post} from "./post/post.model";
import { FileModule } from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {doc} from "prettier";
import * as path from "path";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
      ConfigModule.forRoot({
        envFilePath: (process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '') + '.env'
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [User, BanReason, Role, UserRole, Post],
        autoLoadModels: true
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static'),
      }),
      UserModule,
      BanReasonModule,
      RoleModule,
      AuthModule,
      PostModule,
      FileModule,
  ],
})
export class AppModule {}
