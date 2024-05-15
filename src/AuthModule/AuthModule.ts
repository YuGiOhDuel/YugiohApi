import { MongooseDbProviders } from "src/MongooseModule/MongooseDbProviders";
import { UserAdapter } from "src/MongooseModule/adapter/output/UserAdapter";
import { MongooseDbModule } from "src/MongooseModule/MongooseDbModule";
import { UserService } from "src/MongooseModule/domain/UserService";
import { AuthController } from "./adapter/input/AuthController";
import { Constants } from "src/AuthModule/Constants";
import { AuthService } from "./domain/AuthService";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthProviders } from "./AuthProviders";
import { Module } from "@nestjs/common";
import {
    User,
    UserSchema
} from "src/MongooseModule/schema/User";
import {
    JwtModule,
    JwtService
} from "@nestjs/jwt";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        MongooseDbModule,
        JwtModule.register({
            global: true,
            secret: Constants.secret,
            signOptions: { expiresIn: '60s' }
        })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        {
            provide: AuthProviders.AUTH_SERVICE,
            useClass: AuthService
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
export class AuthModule {  }