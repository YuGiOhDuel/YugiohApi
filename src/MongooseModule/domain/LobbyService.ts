import { LobbyAdapterInterface } from "../adapter/output/LobbyAdapter";
import { CreateLobbyDto } from "../adapter/input/dto/CreateLobbyDto";
import { UpdateLobbyDto } from "../adapter/input/dto/UpdateLobbyDto";
import { GetLobbyDto } from "../adapter/input/dto/GetLobbyDto";
import { MongooseDbProviders } from "../MongooseDbProviders";
import { RequestError } from "src/types/RequestError";
import { Inject, Injectable } from "@nestjs/common";
import { Lobby } from "../schema/Lobby";
import { Types } from "mongoose";

export class LobbyServiceInterface {
    findAll: () => Promise<GetLobbyDto | RequestError>
    find: (id: Types.ObjectId) => Promise<Lobby | RequestError>
    save: (input: CreateLobbyDto) => Promise<Lobby | RequestError>
    update: (id: Types.ObjectId, input: UpdateLobbyDto) => Promise<Lobby | RequestError>
    remove: (id: Types.ObjectId) => Promise<Lobby | RequestError>
}

@Injectable()
export class LobbyService implements LobbyServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.LOBBY_ADAPTER)
        private readonly adapter: LobbyAdapterInterface
    ) {  }

    public async findAll(): Promise<GetLobbyDto | RequestError> {
        const data = await this.adapter.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            lobbies: data
        }
    }

    public async find(id: Types.ObjectId): Promise<Lobby | RequestError> {
        return await this.adapter.find(id);
    }

    public async save(input: CreateLobbyDto): Promise<Lobby | RequestError> {
        return await this.adapter.save({
            ...input,
            createdAt: new Date(),
            havePassword: input?.password ? true : false
        });
    }

    public async update(id: Types.ObjectId, input: UpdateLobbyDto): Promise<Lobby | RequestError> {
        return await this.adapter.update(id, input);
    }

    public async remove(id: Types.ObjectId): Promise<Lobby | RequestError> {
        return await this.adapter.remove(id);
    }
}