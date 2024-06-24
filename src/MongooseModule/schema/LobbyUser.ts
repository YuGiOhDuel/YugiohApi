import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./User";

export type LobbyUserDocument = HydratedDocument<LobbyUser>;

export enum LobbyUserStatus {
    READY = "Ready",
    WAITTING = "Waitting"
}

@Schema({ collection: "LobbyUser" })
export class LobbyUser {
    @ApiProperty({ type: String })
    _id: string;

    @ApiProperty({ type: String })
    @Prop({ type: Types.ObjectId, ref: User.name })
    user: String;

    @ApiProperty({ type: String, enum: LobbyUserStatus })
    @Prop()
    status: LobbyUserStatus;

    @ApiProperty({ type: String })
    @Prop()
    socketId: string;
}

export const LobbyUserSchema = SchemaFactory.createForClass(LobbyUser);