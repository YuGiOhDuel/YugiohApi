import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Card } from "./Card";
import { User } from "./User";

export type CardEventDocument = HydratedDocument<CardEvent>;

export enum CardEventType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}

@Schema({ collection: "CardEvent" })
export class CardEvent {
    @ApiProperty({ type: String })
    _id: String;

    @ApiProperty({ type: Card })
    @Prop({ type: Types.ObjectId, ref: Card.name })
    card: Card;

    @ApiProperty({ type: User })
    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

    @ApiProperty({
        type: String,
        enum: CardEventType
    })
    @Prop()
    type: CardEventType

    @ApiProperty({ type: Date })
    @Prop()
    date: Date;
}

export const CardEventSchema = SchemaFactory.createForClass(CardEvent);