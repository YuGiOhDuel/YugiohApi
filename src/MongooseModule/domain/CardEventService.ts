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
    findAll: () => Promise<GetCardEventDto | RequestError>
    find: (id: Types.ObjectId) => Promise<CardEvent | RequestError>
    save: (input: CreateCardEventDto) => Promise<CardEvent | RequestError>
    update: (id: Types.ObjectId, input: UpdateCardEventDto) => Promise<CardEvent | RequestError>
    remove: (id: Types.ObjectId) => Promise<CardEvent | RequestError>
}

@Injectable()
export class CardEventService implements CardEventServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.CARD_EVENT_ADAPTER)
        private readonly adapter: CardEventAdapterInterface
    ) {  }

    public async findAll(): Promise<GetCardEventDto | RequestError> {
        const data = await this.adapter.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            cardEvent: data
        }
    }

    public async find(id: Types.ObjectId): Promise<CardEvent | RequestError> {
        return await this.adapter.find(id);
    }

    public async save(input: CreateCardEventDto): Promise<CardEvent | RequestError> {
        return await this.adapter.save({
            ...input,
            date: new Date()
        });
    }

    public async update(id: Types.ObjectId, input: UpdateCardEventDto): Promise<CardEvent | RequestError> {
        return await this.adapter.update(id, input);
    }

    public async remove(id: Types.ObjectId): Promise<CardEvent | RequestError> {
        return await this.adapter.remove(id);
    }
}