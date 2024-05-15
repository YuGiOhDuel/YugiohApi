import { ApiProperty } from "@nestjs/swagger";
import { Card } from "src/MongooseModule/schema/Card";

export class GetCardDto {
    @ApiProperty({
        type: [Card],
        nullable: true
    })
    cards: Card[]
}