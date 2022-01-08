import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService,
                private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if(!requiredRoles) {
                return true
            }

            const req = context.switchToHttp().getRequest()
            const user = req.user
            if(!user) {
                throw new UnauthorizedException({message: 'User is not authorized for role check.'})
            }

            return user.roles.some(role => requiredRoles.includes(role.value))
        }
        catch (e) {
            throw new HttpException('Access denied.', HttpStatus.FORBIDDEN)
        }
    }
}