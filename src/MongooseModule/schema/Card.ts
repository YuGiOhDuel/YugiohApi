import { CardFunction } from "src/types/CardFunction";
import { CardElement } from "src/types/CardElement";
import { ApiProperty } from "@nestjs/swagger";
import { CardType } from "src/types/CardType";
import {
    Prop,
    Schema, 
    SchemaFactory 
} from "@nestjs/mongoose";
import { 
    HydratedDocument, 
    Types 
} from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema({ collection: "Card" })
export class Card {
    @ApiProperty({ type: Types.ObjectId })
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId

    @ApiProperty({ type: String })
    @Prop()
    name: string;

    @ApiProperty({ type: String })
    @Prop()
    image: string;

    @ApiProperty({ type: String })
    @Prop()
    description: string;

    @ApiProperty({
        type: String,
        enum: CardFunction
    })
    @Prop()
    fucntion: CardFunction;

    @ApiProperty({
        type: String,
        enum: CardType
    })
    @Prop()
    type: CardType;

    @ApiProperty({
        type: String,
        enum: CardElement
    })
    @Prop()
    element: CardElement;

    @ApiProperty({ type: Number })
    @Prop()
    atk: number;

    @ApiProperty({ type: Number })
    @Prop()
    def: number;

    @ApiProperty({ type: Number })
    @Prop()
    nivel: number;

    @ApiProperty({ type: Date })
    @Prop()
    createdAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(Card);