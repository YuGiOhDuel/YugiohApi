import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Card } from "./Card";
import { User } from "./User";

export type CardEventDocument = HydratedDocument<CardEvent>;

@Schema({ collection: "CardEvent" })
export class CardEvent {
    @ApiProperty({ type: Types.ObjectId })
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;

    @ApiProperty({ type: Card })
    @Prop({ type: Types.ObjectId, ref: Card.name })
    card: Card;

    @ApiProperty({ type: User })
    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

    @ApiProperty({ type: Date })
    @Prop()
    date: Date;
}

export const CardEventSchema = SchemaFactory.createForClass(CardEvent);