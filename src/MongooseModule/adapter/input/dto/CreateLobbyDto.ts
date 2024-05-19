import { ApiProperty } from "@nestjs/swagger";

export class CreateLobbyDto {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({
        type: String,
        nullable: true
    })
    password?: string;

    @ApiProperty({ type: String })
    creator: String;
}