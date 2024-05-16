import { CardEventAdapterInterface } from "../adapter/output/CardEventAdapter";
import { CreateCardEventDto } from "../adapter/input/dto/CreateCardEventDto";
import { UpdateCardEventDto } from "../adapter/input/dto/UpdateCardEventDto";
import { GetCardEventDto } from "../adapter/input/dto/GetCardEventDto";
import { MongooseDbProviders } from "../MongooseDbProviders";
import { RequestError } from "src/types/RequestError";
import { Inject, Injectable } from "@nestjs/common";
import { CardEvent } from "../schema/CardEvent";
import { Types } from "mongoose";

export interface CardEventServiceInterface {
    findAll(): Promise<GetCardEventDto | RequestError>
    find(id: Types.ObjectId): Promise<CardEvent | RequestError>
    save(input: CreateCardEventDto): Promise<CardEvent | RequestError>
    update(id: Types.ObjectId, input: UpdateCardEventDto): Promise<CardEvent | RequestError>
    remove(id: Types.ObjectId): Promise<CardEvent | RequestError>
}

@Injectable()
export class CardEventService implements CardEventServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.CARD_EVENT_ADAPTER)
        private readonly adapter: CardEventAdapterInterface
    ) {  }


}