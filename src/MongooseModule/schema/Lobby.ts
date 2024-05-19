import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./User";

export type LobbyDocument = HydratedDocument<Lobby>;

@Schema({ collection: "Lobby" })
export class Lobby {
    @ApiProperty({ type: String })
    _id: String;

    @ApiProperty({ type: String })
    @Prop()
    name: string;

    @ApiProperty({
        type: String,
        nullable: true
    })
    @Prop()
    password?: string;

    @ApiProperty({ type: Boolean })
    @Prop()
    havePassword: boolean;

    @ApiProperty({ type: String })
    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    creator: String;

    @ApiProperty({
        type: String,
        nullable: true
    })
    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    opponent?: String;

    @ApiProperty({ type: Date })
    @Prop()
    createdAt: Date;
}

export const LobbySchema = SchemaFactory.createForClass(Lobby);