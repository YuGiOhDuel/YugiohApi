import { LobbyServiceInterface } from "src/MongooseModule/domain/LobbyService";
import { MongooseDbProviders } from "src/MongooseModule/MongooseDbProviders";
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
import { Lobby } from "src/MongooseModule/schema/Lobby";
import { RequestError } from "src/types/RequestError";
import { GetLobbyDto } from "./dto/GetLobbyDto";
import { Types } from "mongoose";
import { CreateLobbyDto } from "./dto/CreateLobbyDto";
import { UpdateLobbyDto } from "./dto/UpdateLobbyDto";

@Controller("/lobby")
@ApiTags("Lobby")
export class LobbyController {
    public constructor(
        @Inject(MongooseDbProviders.LOBBY_SERVICE)
        private readonly service: LobbyServiceInterface
    ) {  }

    @Get("/")
    @ApiResponse({
        status: 200,
        type: GetLobbyDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getAll(): Promise<GetLobbyDto | RequestError> {
        return await this.service.findAll()
    }

    @Get("/:id")
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiResponse({
        status: 200,
        type: Lobby
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async get(
        @Param('id') id: Types.ObjectId
    ): Promise<Lobby | RequestError> {
        return await this.service.find(id);
    }

    @Post("/")
    @ApiBody({ type: CreateLobbyDto })
    @ApiResponse({
        status: 201,
        type: Lobby
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async post(
        @Body(new ValidationPipe()) input: CreateLobbyDto
    ): Promise<Lobby | RequestError> {
        return await this.service.save(input);
    }

    @Patch("/:id")
    @ApiBody({ type: UpdateLobbyDto })
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiResponse({
        status: 201,
        type: Lobby
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async patch(
        @Param('id') id: Types.ObjectId,
        @Body(new ValidationPipe()) input: UpdateLobbyDto
    ): Promise<Lobby | RequestError> {
        return await this.service.update(id, input);
    }

    @Delete("/:id")
    @ApiParam({
        name: 'id',
        type: String
    })
    @ApiResponse({
        status: 200,
        type: Lobby
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async delete(
        @Param('id') id: Types.ObjectId
    ): Promise<Lobby | RequestError> {
        return await this.service.remove(id);
    }
}