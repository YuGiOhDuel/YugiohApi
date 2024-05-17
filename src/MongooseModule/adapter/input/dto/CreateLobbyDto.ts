import { User } from "src/MongooseModule/schema/User";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLobbyDto {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({
        type: String,
        nullable: true
    })
    password?: string;

    @ApiProperty({ type: User })
    creator: User;
}