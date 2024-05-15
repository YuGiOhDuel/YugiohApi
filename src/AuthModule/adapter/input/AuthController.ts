import { AuthServiceInterface } from "src/AuthModule/domain/AuthService";
import { AuthProviders } from "src/AuthModule/AuthProviders";
import { SignInResponseDto } from "./dto/SignInResponseDto";
import { SignUpResponseDto } from "./dto/SignUpResponseDto";
import { SignInRequestDto } from "./dto/SignInRequestDto";
import { SignUpRequestDto } from "./dto/SignUpRequestDto";
import { RequestError } from "src/types/RequestError";
import {
    ApiBody,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Inject,
    Post,
    ValidationPipe
} from "@nestjs/common";

@Controller("/auth")
@ApiTags("Auth")
export class AuthController {
    public constructor(
        @Inject(AuthProviders.AUTH_SERVICE)
        private readonly service: AuthServiceInterface
    ) {  }

    @Post("/signIn")
    @ApiBody({ type: SignInRequestDto })
    @ApiResponse({
        status: 201,
        type: SignInResponseDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async signIn(
        @Body(new ValidationPipe()) input: SignInRequestDto
    ): Promise<SignInResponseDto | RequestError> {
        return await this.service.signIn(input);
    }

    @Post("/signUp")
    @ApiBody({ type: SignUpRequestDto })
    @ApiResponse({
        status: 201,
        type: SignUpRequestDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async signUp(
        @Body(new ValidationPipe()) input: SignUpRequestDto
    ): Promise<SignUpResponseDto | RequestError> {
        return await this.service.signUp(input);
    }
}