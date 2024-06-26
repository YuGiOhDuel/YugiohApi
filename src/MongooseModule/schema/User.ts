import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "User" })
export class User {
    @ApiProperty({ type: Types.ObjectId })
    @Prop({ type: Types.ObjectId })
    _id: string;

    @ApiProperty({ type: String })
    @Prop()
    username: string;

    @ApiProperty({ type: String })
    @Prop()
    email: string;

    @ApiProperty({ type: String })
    @Prop()
    password: string;
    
    @ApiProperty({ type: Date })
    @Prop()
    createdAt: Date;

    @ApiProperty({ type: Boolean })
    @Prop()
    admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);