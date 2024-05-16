import { CardEventAdapter } from "./adapter/output/CardEventAdapter";
import { CardController } from "./adapter/input/CardController";
import { UserController } from "./adapter/input/UserController";
import { AuthProviders } from "src/AuthModule/AuthProviders";
import { CardEventService } from "./domain/CardEventService";
import { MongooseDbProviders } from "./MongooseDbProviders";
import { CardAdapter } from "./adapter/output/CardAdapter";
import { UserAdapter } from "./adapter/output/UserAdapter";
import { CardService } from "./domain/CardService";
import { UserService } from "./domain/UserService";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import {
    CardEvent,
    CardEventSchema
} from "./schema/CardEvent";
import {
    Card, 
    CardSchema 
} from "./schema/Card";
import {
    User,
    UserSchema
} from "./schema/User";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Card.name, schema: CardSchema },
            { name: CardEvent.name, schema: CardEventSchema },
            { name: User.name, schema: UserSchema },
        ]),
        
    ],
    controllers: [
        CardController, UserController
    ],
    providers: [
        {
            provide: MongooseDbProviders.CARD_ADAPTER,
            useClass: CardAdapter
        },
        {
            provide: MongooseDbProviders.CARD_SERVICE,
            useClass: CardService
        },
        {
            provide: MongooseDbProviders.CARD_EVENT_ADAPTER,
            useClass: CardEventAdapter
        },
        {
            provide: MongooseDbProviders.CARD_EVENT_SERVICE,
            useClass: CardEventService
        },
        {
            provide: AuthProviders.JWT_SERVICE,
            useClass: JwtService
        },
        {
            provide: MongooseDbProviders.USER_ADAPTER,
            useClass: UserAdapter
        },
        {
            provide: MongooseDbProviders.USER_SERVICE,
            useClass: UserService
        }
    ]
})
export class MongooseDbModule {  }