import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { Lobby } from "../schema/Lobby";
import { RequestError } from "src/types/RequestError";

export class LobbyServiceInterface {
    findAll: () => Promise<Lobby[] | RequestError>
    find: (id: Types.ObjectId) => Promise<Lobby | RequestError>
    save: (input: Omit<Lobby, '_id'>) => Promise<Lobby | RequestError>
    update: (id: Types.ObjectId, input: Partial<Lobby>) => Promise<Lobby | RequestError>
    remove: (id: Types.ObjectId) => Promise<Lobby | RequestError>
}

@Injectable()
export class LobbyService implements LobbyServiceInterface {
    public constructor(

    ) {  }
}