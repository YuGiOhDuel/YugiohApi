import { MongooseDbProviders } from "../../MongooseModule/MongooseDbProviders";
import { UserServiceInterface } from "../../MongooseModule/domain/UserService";
import { SignInResponseDto } from "../adapter/input/dto/SignInResponseDto";
import { SignUpResponseDto } from "../adapter/input/dto/SignUpResponseDto";
import { SignInRequestDto } from "../adapter/input/dto/SignInRequestDto";
import { SignUpRequestDto } from "../adapter/input/dto/SignUpRequestDto";
import { User } from "../../MongooseModule/schema/User";
import { RequestError } from "src/types/RequestError";
import { JwtService } from "@nestjs/jwt";
import {
    Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { AuthProviders } from "../AuthProviders";
import { Constants } from "../Constants";

export interface AuthServiceInterface {
    signIn: (input: SignInRequestDto) => Promise<SignInResponseDto | RequestError>
    signUp: (input: SignUpRequestDto) => Promise<SignUpResponseDto | RequestError>
}

@Injectable()
export class AuthService implements AuthServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.USER_SERVICE)
        private readonly userService: UserServiceInterface,
        @Inject(AuthProviders.JWT_SERVICE)
        private readonly jwtService: JwtService
    ) {  }

    public async signIn(input: SignInRequestDto): Promise<SignInResponseDto | RequestError> {
        let user: User | RequestError;
        if (input.username.includes("@")) {
            user = await this.userService.findByEmail(input.username);
        }
        else {
            user = await this.userService.findByUsername(input.username);
        }
        if (user instanceof RequestError) {
            return user;
        }
        if (!user) {
            return new RequestError("User Not Found", 404);
        }
        if (user.password !== input.password) {
            throw new UnauthorizedException();
        }
        const now = new Date();
        now.setDate(now.getDate() + 1);
        const token = await this.jwtService.signAsync({
            username: input.username,
            id: user._id,
            expiresIn: now
        }, { secret: Constants.secret });

        return {
            token: token,
            _id: user._id
        }
    }

    public async signUp(input: SignUpRequestDto): Promise<SignUpResponseDto | RequestError> {
        const user = await this.userService.save({
            ...input,
            admin: false
        });
        if (user instanceof RequestError) {
            return user;
        }
        return {
            created: true
        };
    }
}