import { UserController } from "./adapter/input/UserController";
import { AuthGuards } from "src/AuthModule/adapter/AuthGuards";
import { AuthProviders } from "src/AuthModule/AuthProviders";
import { MongooseDbProviders } from "./MongooseDbProviders";
import { UserAdapter } from "./adapter/output/UserAdapter";
import { UserService } from "./domain/UserService";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import {
    User,
    UserSchema
} from "./schema/User";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        
    ],
    controllers: [
        UserController
    ],
    providers: [
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