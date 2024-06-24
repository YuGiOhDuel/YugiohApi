import { LobbyUserAdapterInterface } from "../adapter/output/LobbyUserAdapter";
import { CreateLobbyUserDto } from "../adapter/input/dto/CreateLobbyUserDto";
import { UpdateLobbyUserDto } from "../adapter/input/dto/UpdateLobbyUserDto";
import { GetLobbyUserDto } from "../adapter/input/dto/GetLobbyUserDto";
import { MongooseDbProviders } from "../MongooseDbProviders";
import { RequestError } from "src/types/RequestError";
import { LobbyUser } from "../schema/LobbyUser";
import { Inject, Injectable } from "@nestjs/common";

export interface LobbyUserServiceInterface {
    findAll: () => Promise<GetLobbyUserDto | RequestError>
    find: (id: string) => Promise<LobbyUser | RequestError>
    save: (input: CreateLobbyUserDto) => Promise<LobbyUser | RequestError>
    update: (id: string, input: UpdateLobbyUserDto) => Promise<LobbyUser | RequestError>
    remove: (id: string) => Promise<LobbyUser | RequestError>
}

@Injectable()
export class LobbyUserService implements LobbyUserServiceInterface {
    public constructor(
        @Inject(MongooseDbProviders.LOBBY_USER_ADAPTER)
        private readonly adapter: LobbyUserAdapterInterface
    ) {  }

    public async findAll(): Promise<GetLobbyUserDto | RequestError> {
        const data = await this.adapter.findAll();
        if (data instanceof RequestError) {
            return data;
        }
        return {
            users: data
        }
    }

    public async find(id: string): Promise<LobbyUser | RequestError> {
        return await this.adapter.find(id);
    }

    public async save(input: CreateLobbyUserDto): Promise<LobbyUser | RequestError> {
        return await this.adapter.save(input);
    }

    public async update(id: string, input: UpdateLobbyUserDto): Promise<LobbyUser | RequestError> {
        return await this.adapter.update(id, input);
    }

    public async remove(id: string): Promise<LobbyUser | RequestError> {
        return await this.adapter.remove(id);
    }
}