import { LobbyUserServiceInterface } from "src/MongooseModule/domain/LobbyUserService";
import { MongooseDbProviders } from "src/MongooseModule/MongooseDbProviders";
import { LobbyUser } from "src/MongooseModule/schema/LobbyUser";
import { CreateLobbyUserDto } from "./dto/CreateLobbyUserDto";
import { UpdateLobbyUserDto } from "./dto/UpdateLobbyUserDto";
import { GetLobbyUserDto } from "./dto/GetLobbyUserDto";
import { RequestError } from "src/types/RequestError";
import {
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
    Inject,
    Param,
    Patch,
    Post,
    ValidationPipe
} from "@nestjs/common";


@Controller("/lobby-user")
@ApiTags("LobbyUser")
export class LobbyUserController {
    public constructor(
        @Inject(MongooseDbProviders.LOBBY_USER_SERVICE)
        private readonly service: LobbyUserServiceInterface
    ) {  }

    @Get("/")
    @ApiResponse({
        status: 200,
        type: GetLobbyUserDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async findAll(): Promise<GetLobbyUserDto | RequestError> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiResponse({
        status: 200,
        type: LobbyUser
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async find(
        @Param("id") id: string
    ): Promise<LobbyUser | RequestError> {
        return await this.service.find(id);
    }

    @Post("/")
    @ApiBody({ type: CreateLobbyUserDto })
    @ApiResponse({
        status: 201,
        type: LobbyUser
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async save(
        @Body(new ValidationPipe()) input: CreateLobbyUserDto
    ): Promise<LobbyUser | RequestError> {
        return await this.service.save(input);
    }

    @Patch("/:id")
    @ApiBody({ type: UpdateLobbyUserDto })
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiResponse({
        status: 201,
        type: LobbyUser
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async update(
        @Param("id") id: string,
        @Body(new ValidationPipe()) input: UpdateLobbyUserDto
    ): Promise<LobbyUser | RequestError> {
        return await this.service.update(id, input);
    }

    @Delete("/:id")
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiResponse({
        status: 200,
        type: LobbyUser
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async remove(
        @Param("id") id: string
    ): Promise<LobbyUser | RequestError> {
        return await this.service.remove(id);
    }
}