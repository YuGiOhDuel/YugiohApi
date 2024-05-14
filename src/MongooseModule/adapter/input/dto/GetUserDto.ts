import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/MongooseModule/schema/User";

export class GetUserDto {
    @ApiProperty({
        type: [User],
        nullable: true
    })
    users: User[]
}