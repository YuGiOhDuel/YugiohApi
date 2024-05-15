import { CardFunction } from "src/types/CardFunction";
import { CardElement } from "src/types/CardElement";
import { ApiProperty } from "@nestjs/swagger";
import { CardType } from "src/types/CardType";

export class CreateCardDto {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    image: string;

    @ApiProperty({ type: String })
    description: string;

    @ApiProperty({
        type: String,
        enum: CardFunction
    })
    fucntion: CardFunction;

    @ApiProperty({
        type: String,
        enum: CardType
    })
    type: CardType;

    @ApiProperty({
        type: String,
        enum: CardElement
    })
    element: CardElement;

    @ApiProperty({ type: Number })
    atk: number;

    @ApiProperty({ type: Number })
    def: number;

    @ApiProperty({ type: Number })
    nivel: number;
}