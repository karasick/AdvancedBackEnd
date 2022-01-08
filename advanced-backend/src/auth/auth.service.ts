import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {UserCredentialsDto} from "../user/dto/user-credentials.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../user/user.model";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService) {}

    async login(userDto: UserCredentialsDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async register(userDto: CreateUserDto) {
        const candidate = await this.userService.getOneUserByEmail(userDto.email)
        if(candidate) {
            throw new HttpException('User with this email are already exist.', HttpStatus.BAD_REQUEST)
        }

        console.log("process.env.JWT_SECRET_KEY")
        console.log(process.env.JWT_SECRET_KEY)

        const salt = await bcrypt.genSalt(5);
        const hashPassword = await bcrypt.hash(userDto.password, salt)

        const user = await this.userService.createUser({...userDto, password: hashPassword})

        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: UserCredentialsDto) {
        const user = await this.userService.getOneUserByEmail(userDto.email)
        if(!user) {
            throw new HttpException('User with this email are not exist.', HttpStatus.BAD_REQUEST)
        }

        const isPasswordsEqual = await bcrypt.compare(userDto.password, user.password)
        if(!isPasswordsEqual) {
            throw new UnauthorizedException('Incorrect password.')
        }

        return user
    }
}
