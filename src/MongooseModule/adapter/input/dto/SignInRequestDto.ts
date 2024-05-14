import { ApiProperty } from "@nestjs/swagger";

export class SignInRequestDto {
    @ApiProperty({ type: String })
    username: string;
    
    @ApiProperty({ type: String })
    password: string;
}