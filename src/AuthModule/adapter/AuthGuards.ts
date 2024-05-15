import { AuthProviders } from "../AuthProviders";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { Constants } from "../Constants";

@Injectable()
export class AuthGuards implements CanActivate {
    public constructor(
        @Inject(AuthProviders.JWT_SERVICE)
        private readonly jwtService: JwtService
    ) {  }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: Constants.secret }
            );
            request['user'] = payload;
            if (!payload?.expiresIn || new Date(payload?.expiresIn) <= new Date()) {
                throw new UnauthorizedException();
            }
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}