import { Lobby } from "src/MongooseModule/schema/Lobby";
import { ApiProperty } from "@nestjs/swagger";

export class GetLobbyDto {
    @ApiProperty({ type: [Lobby] })
    lobbies: Lobby[]
}