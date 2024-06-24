import { LobbyUserStatus } from "src/MongooseModule/schema/LobbyUser";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLobbyUserDto {
    @ApiProperty({ type: String })
    user: String;

    @ApiProperty({ type: String, enum: LobbyUserStatus })
    status: LobbyUserStatus;

    @ApiProperty({ type: String })
    socketId: string;
}