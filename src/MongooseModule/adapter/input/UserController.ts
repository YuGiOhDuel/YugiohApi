import { UserServiceInterface } from "src/MongooseModule/domain/UserService";
import { MongooseDbProviders } from "../../MongooseDbProviders";
import { RequestError } from "src/types/RequestError";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { GetUserDto } from "./dto/GetUserDto";
import { User } from "../../schema/User";
import { Types } from "mongoose";
import {
    ApiBearerAuth,
    ApiBody,
    ApiParam,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    Patch,
    Post,
    UseGuards,
    ValidationPipe
} from "@nestjs/common";
import { AuthGuards } from "src/AuthModule/adapter/AuthGuards";

@Controller("/user")
@ApiTags("User")
export class UserController {
    public constructor(
        @Inject(MongooseDbProviders.USER_SERVICE)
        private readonly service: UserServiceInterface
    ) {  }

    @Get("/")
    @ApiResponse({
        status: 200,
        type: GetUserDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @UseGuards(AuthGuards)
    @ApiBearerAuth()
    public async getAll(): Promise<GetUserDto | RequestError> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiParam({
        name: 'id',
        type: Types.ObjectId
    })
    @ApiResponse({
        status: 200,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async get(
        @Param('id') id: Types.ObjectId
    ): Promise<User | RequestError> {
        return this.service.find(id);
    }

    @Post("/")
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @HttpCode(201)
    public async post(
        @Body(new ValidationPipe()) input: CreateUserDto
    ): Promise<User | RequestError> {
        return await this.service.save(input);
    }

    @Patch("/:id")
    @ApiBody({ type: UpdateUserDto })
    @ApiParam({
        name: 'id',
        type: Types.ObjectId
    })
    @ApiResponse({
        status: 201,
        type: User
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @HttpCode(201)
    public async patch(
        @Param('id') id: Types.ObjectId,
        @Body(new ValidationPipe()) input: UpdateUserDto
    ): Promise<User | RequestError> {
        return await this.service.update(id, input);
    }

    @Delete("/:id")
    @ApiParam({
        name: 'id',
        type: Types.ObjectId
    })
    @ApiResponse({
        status: 204,
        type: null,
        description: "No Content"
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    @HttpCode(204)
    public async remove(
        @Param('id') id: Types.ObjectId
    ): Promise<void | RequestError> {
        return this.service.remove(id);
    }
}