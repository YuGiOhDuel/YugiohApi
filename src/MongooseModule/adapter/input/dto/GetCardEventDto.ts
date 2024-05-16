import { CardEvent } from "src/MongooseModule/schema/CardEvent";
import { ApiProperty } from "@nestjs/swagger";

export class GetCardEventDto {
    @ApiProperty({ type: [CardEvent] })
    cardEvent: CardEvent[]
}