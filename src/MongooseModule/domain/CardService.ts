import { CardAdapterInterface } from "../adapter/output/CardAdapter";
import { CreateCardDto } from "../adapter/input/dto/CreateCardDto";
import { UpdateCardDto } from "../adapter/input/dto/UpdateCardDto";
import { GetCardDto } from "../adapter/input/dto/GetCardDto";
import { MongooseDbProviders } from "../MongooseDbProviders";
import { RequestError } from "src/types/RequestError";
import { Card } from "../schema/Card";
import { Types } from "mongoose";
import {
    Inject,
    Injectable
} from "@nestjs/common";

export interface CardServiceInterface {
    findAll: () => Promise<GetCardDto | RequestError>
    find: (id: Types.ObjectId) => Promise<Card | RequestError>
    save: (input: CreateCardDto) => Promise<Card | RequestError>
    upload: (id: Types.ObjectId, input: UpdateCardDto) => Promise<Card | RequestError>
    remove: (id: Types.ObjectId) => Promise<Card | RequestError>
}

@Injectable()
export class CardService implements CardServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.CARD_ADAPTER)
        private readonly adapter: CardAdapterInterface
    ) {  }

    public async findAll(): Promise<GetCardDto | RequestError> {
        const data = await this.adapter.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            cards: data
        }
    }

    public async find(id: Types.ObjectId): Promise<Card | RequestError> {
        return await this.adapter.find(id);
    }

    public async save(input: CreateCardDto): Promise<Card | RequestError> {
        return await this.adapter.save({
            ...input,
            createdAt: new Date()
        });
    }

    public async upload(id: Types.ObjectId, input: UpdateCardDto): Promise<Card | RequestError> {
        return await this.adapter.upload(id, input);
    }

    public async remove(id: Types.ObjectId): Promise<Card | RequestError> {
        return await this.adapter.remove(id);
    }
}
