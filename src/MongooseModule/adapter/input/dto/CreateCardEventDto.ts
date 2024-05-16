import { ApiProperty } from "@nestjs/swagger";
import { Card } from "src/MongooseModule/schema/Card";
import { User } from "src/MongooseModule/schema/User";

export class CreateCardEventDto {
    @ApiProperty({ type: Card })
    card: Card;

    @ApiProperty({ type: User })
    user: User;
}