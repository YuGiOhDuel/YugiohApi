import { CardServiceInterface } from "src/MongooseModule/domain/CardService";
import { MongooseDbProviders } from "src/MongooseModule/MongooseDbProviders";
import { Card } from "src/MongooseModule/schema/Card";
import { RequestError } from "src/types/RequestError";
import { CreateCardDto } from "./dto/CreateCardDto";
import { UpdateCardDto } from "./dto/UpdateCardDto";
import { GetCardDto } from "./dto/GetCardDto";
import { Types } from "mongoose";
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

@Controller("/card")
@ApiTags("Card")
export class CardController {
    public constructor(
        @Inject(MongooseDbProviders.CARD_SERVICE)
        private readonly service: CardServiceInterface
    ) {  }

    @Get("/")
    @ApiResponse({
        status: 200,
        type: GetCardDto
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async getAll(): Promise<GetCardDto | RequestError> {
        return await this.service.findAll();
    }

    @Get("/:id")
    @ApiParam({
        name: 'id',
        type: Types.ObjectId
    })
    @ApiResponse({
        status: 200,
        type: Card
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async get(
        @Param('id') id: Types.ObjectId
    ): Promise<Card | RequestError> {
        return await this.service.find(id);
    }

    @Post("/")
    @ApiBody({ type: CreateCardDto })
    @ApiResponse({
        status: 201,
        type: Card
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async post(
        @Body(new ValidationPipe()) input: CreateCardDto
    ): Promise<Card | RequestError> {
        return await this.service.save(input);
    }

    @Patch("/:id")
    @ApiBody({ type: UpdateCardDto })
    @ApiParam({
        name: 'id',
        type: Types.ObjectId
    })
    @ApiResponse({
        status: 201,
        type: Card
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async patch(
        @Param('id') id: Types.ObjectId,
        @Body(new ValidationPipe()) input: UpdateCardDto
    ): Promise<Card | RequestError> {
        return await this.service.upload(id, input);
    }

    @Delete("/:id")
    @ApiBody({ type: UpdateCardDto })
    @ApiResponse({
        status: 200,
        type: Card
    })
    @ApiResponse({
        status: 500,
        type: RequestError
    })
    public async delete(id: Types.ObjectId): Promise<Card | RequestError> {
        return await this.service.remove(id);
    }
}