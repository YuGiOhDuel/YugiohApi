import { CardEventType } from "src/MongooseModule/schema/CardEvent";
import { Card } from "src/MongooseModule/schema/Card";
import { User } from "src/MongooseModule/schema/User";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardEventDto {
    @ApiProperty({ type: Card })
    card: Card;

    @ApiProperty({ type: User })
    user: User;

    @ApiProperty({ type: String, enum: CardEventType })
    type: CardEventType;
}