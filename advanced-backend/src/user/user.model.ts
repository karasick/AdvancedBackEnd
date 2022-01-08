import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../role/role.model";
import {UserRole} from "../role/user-role.model";
import {BanReason} from "../ban-reason/ban-reason.model";
import {Post} from "../post/post.model";

interface UserCreationAttr {
    email: string,
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {
    @ApiProperty({example: 1, description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'example@mail.com', description: 'Unique e-mail address'})
    @Column({type: DataType.STRING, allowNull: false})
    email: string

    @ApiProperty({example: '1234', description: 'Password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: false, description: 'Unique id'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isBanned: boolean

    @HasOne(() => BanReason)
    banReasons: BanReason[]

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}