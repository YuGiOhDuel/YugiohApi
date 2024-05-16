import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./User";

export type LobbyDocument = HydratedDocument<Lobby>;

@Schema({ collection: "Lobby" })
export class Lobby {
    _id: string;

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

    @ApiProperty({ type: User })
    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    creator: User;

    @ApiProperty({
        type: User,
        nullable: true
    })
    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    opponent?: User;

    @ApiProperty({ type: Date })
    @Prop()
    createdAt: Date;
}

export const LobbySchema = SchemaFactory.createForClass(Lobby);