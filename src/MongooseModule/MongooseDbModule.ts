import { UserController } from "./adapter/input/UserController";
import { MongooseDbProviders } from "./MongooseDbProviders";
import { UserAdapter } from "./adapter/output/UserAdapter";
import { UserService } from "./domain/UserService";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import {
    User,
    UserSchema
} from "./schema/User";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    controllers: [
        UserController
    ],
    providers: [
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