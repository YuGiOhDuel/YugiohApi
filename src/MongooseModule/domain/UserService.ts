import { UserAdapterInterface } from "../adapter/output/UserAdapter";
import { CreateUserDto } from "../adapter/input/dto/CreateUserDto";
import { UpdateUserDto } from "../adapter/input/dto/UpdateUserDto";
import { GetUserDto } from "../adapter/input/dto/GetUserDto";
import { MongooseDbProviders } from "../MongooseDbProviders";
import { RequestError } from "src/types/RequestError";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "../schema/User";
import { Types } from "mongoose";

export interface UserServiceInterface {
    findAll: () => Promise<GetUserDto | RequestError>
    find: (id: Types.ObjectId) => Promise<User | RequestError>
    save: (input: CreateUserDto) => Promise<User | RequestError>
    update: (id: Types.ObjectId, input: UpdateUserDto) => Promise<User | RequestError>
    remove: (id: Types.ObjectId) => Promise<void | RequestError>
}

@Injectable()
export class UserService implements UserServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.USER_ADAPTER)
        private readonly repository: UserAdapterInterface
    ) {  }

    public async findAll(): Promise<GetUserDto | RequestError> {
        const data = await this.repository.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            users: data
        }
    }

    public async find(id: Types.ObjectId): Promise<User | RequestError> {
        return await this.repository.find(id);
    }

    public async save(input: CreateUserDto): Promise<User | RequestError> {
        return await this.repository.save({
            ...input,
            createdAt: new Date()
        });
    }

    public async update(id: Types.ObjectId, input: UpdateUserDto): Promise<User | RequestError> {
        return await this.repository.update(id, input);
    }

    public async remove(id: Types.ObjectId): Promise<void | RequestError> {
        return await this.repository.remove(id)
    }
}