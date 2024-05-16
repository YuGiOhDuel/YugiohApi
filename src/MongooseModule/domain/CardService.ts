import { CardEventAdapterInterface } from "../adapter/output/CardEventAdapter";
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
import { CardEventType } from "../schema/CardEvent";
import { UserServiceInterface } from "./UserService";
import { CardEventServiceInterface } from "./CardEventService";

export interface CardServiceInterface {
    findAll: () => Promise<GetCardDto | RequestError>
    find: (id: Types.ObjectId) => Promise<Card | RequestError>
    save: (input: CreateCardDto, userId: Types.ObjectId) => Promise<Card | RequestError>
    upload: (id: Types.ObjectId, input: UpdateCardDto, userId: Types.ObjectId) => Promise<Card | RequestError>
    remove: (id: Types.ObjectId, userId: Types.ObjectId) => Promise<Card | RequestError>
}

@Injectable()
export class CardService implements CardServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.CARD_ADAPTER)
        private readonly adapter: CardAdapterInterface,
        @Inject(MongooseDbProviders.CARD_EVENT_SERVICE)
        private readonly eventService: CardEventServiceInterface,
        @Inject(MongooseDbProviders.USER_SERVICE)
        private readonly userService: UserServiceInterface
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

    public async save(input: CreateCardDto, userId: Types.ObjectId): Promise<Card | RequestError> {
        const user = await this.userService.find(userId);
        if (user instanceof RequestError) {
            return user;
        }
        const card = await this.adapter.save({
            ...input,
            createdAt: new Date()
        });
        if (card instanceof RequestError) {
            return card;
        }
        await this.eventService.save({
            card: card,
            type: CardEventType.CREATE,
            user: user
        })
        return card;
    }

    public async upload(id: Types.ObjectId, input: UpdateCardDto, userId: Types.ObjectId): Promise<Card | RequestError> {
        const user = await this.userService.find(userId);
        if (user instanceof RequestError) {
            return user;
        }
        const card = await this.adapter.upload(id, input);
        if (card instanceof RequestError) {
            return card;
        }
        await this.eventService.save({
            card: card,
            type: CardEventType.UPDATE,
            user: user
        })
        return card;
    }

    public async remove(id: Types.ObjectId, userId: Types.ObjectId): Promise<Card | RequestError> {
        const user = await this.userService.find(userId);
        if (user instanceof RequestError) {
            return user;
        }
        const card = await this.adapter.remove(id);
        if (card instanceof RequestError) {
            return card;
        }
        await this.eventService.save({
            card: card,
            type: CardEventType.DELETE,
            user: user
        })
        return card;
    }
}
