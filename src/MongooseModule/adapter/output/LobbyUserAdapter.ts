import { LobbyUser } from "src/MongooseModule/schema/LobbyUser";
import { RequestError } from "src/types/RequestError";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

export interface LobbyUserAdapterInterface {
    findAll: () => Promise<LobbyUser[] | RequestError>
    find: (id: string) => Promise<LobbyUser | RequestError>
    save: (input: Omit<LobbyUser, '_id'>) => Promise<LobbyUser | RequestError>
    update: (id: string, input: Partial<LobbyUser>) => Promise<LobbyUser | RequestError>
    remove: (id: string) => Promise<LobbyUser | RequestError>
}

@Injectable()
export class LobbyUserAdapter implements LobbyUserAdapterInterface {
    public constructor(
        @InjectModel(LobbyUser.name)
        private readonly repository: Model<LobbyUser>
    ) {  }

    public async findAll(): Promise<LobbyUser[] | RequestError> {
        return await this.repository.find();
    }

    public async find(id: string): Promise<LobbyUser | RequestError> {
        return await this.repository.findById(id);
    }

    public async save(input: Omit<LobbyUser, '_id'>): Promise<LobbyUser | RequestError> {
        return await this.repository.create(input);
    }

    public async update(id: string, input: Partial<LobbyUser>): Promise<LobbyUser | RequestError> {
        return await this.repository.findByIdAndUpdate(id, input);
    }

    public async remove(id: string): Promise<LobbyUser | RequestError> {
        return await this.repository.findByIdAndDelete(id);
    }
}