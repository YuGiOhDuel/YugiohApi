import { ApiProperty } from "@nestjs/swagger";
import { LobbyUser } from "src/MongooseModule/schema/LobbyUser";

export class GetLobbyUserDto {
    @ApiProperty({ type: [LobbyUser] })
    users: LobbyUser[]
}