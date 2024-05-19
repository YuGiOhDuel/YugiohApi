import { CreateLobbyDto } from "./CreateLobbyDto";
import {
    ApiProperty,
    PartialType
} from "@nestjs/swagger";

export class UpdateLobbyDto extends PartialType(CreateLobbyDto) {
    @ApiProperty({
        type: String,
        nullable: true
    })
    opponent?: String;
}