import { ApiProperty } from "@nestjs/swagger";

export class SignInResponseDto {
    @ApiProperty({ type: String })
    token: string;

    @ApiProperty({ type: String })
    _id: String;
}