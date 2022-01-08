import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.model";

interface PostCreationAttr {
    title: string,
    content: string,
    userId: number,
    image: string
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttr> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'My post', description: 'Post title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @ApiProperty({example: 'Hello, Post!', description: 'Post content'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string

    @ApiProperty({example: '%image_local_path%', description: 'Post main image path'})
    @Column({type: DataType.STRING})
    image: string

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User
}