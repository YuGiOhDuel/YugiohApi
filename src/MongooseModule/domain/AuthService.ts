import { SignInResponseDto } from "../adapter/input/dto/SignInResponseDto";
import { SignUpResponseDto } from "../adapter/input/dto/SignUpResponseDto";
import { SignInRequestDto } from "../adapter/input/dto/SignInRequestDto";
import { MongooseDbProviders } from "../MongooseDbProviders";
import { RequestError } from "src/types/RequestError";
import { UserServiceInterface } from "./UserService";
import { JwtService } from "@nestjs/jwt";
import { User } from "../schema/User";
import {
    Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";

export interface AuthServiceInterface {
    signIn: (input: SignInRequestDto) => Promise<SignInResponseDto | RequestError>
}

@Injectable()
export class AuthService implements AuthServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.USER_SERVICE)
        private readonly userService: UserServiceInterface,
        @Inject(MongooseDbProviders.JWT_SERVICE)
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
        const token = await this.jwtService.signAsync({
            username: input.username,
            id: user._id
        });

        return {
            token: token
        }
    }

    // public async signUp(): Promise<SignUpResponseDto | RequestError> {
        
    // }
}