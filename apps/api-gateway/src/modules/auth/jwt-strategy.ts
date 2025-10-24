import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { ModuleRef } from "@nestjs/core";
import { UserPayLoad } from "./interfaces/jwt/user-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private authService: AuthService;

    constructor(private moduleRef: ModuleRef) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET as string,
            ignoreExpiration: false
        })
    }

    async validate(payload: UserPayLoad) {
        if (payload.type != 'access') {
            throw new UnauthorizedException();
        }

        if (!this.authService) {
            this.authService = this.moduleRef.get(AuthService, { strict: false })
        }

        await this.authService.getUserById(payload.sub)
        return payload
    }

}