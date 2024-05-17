import { User } from "src/MongooseModule/schema/User";
import { CreateLobbyDto } from "./CreateLobbyDto";
import {
    ApiProperty,
    PartialType
} from "@nestjs/swagger";

export class UpdateLobbyDto extends PartialType(CreateLobbyDto) {
    @ApiProperty({
        type: User,
        nullable: true
    })
    opponent?: User;
}