import { CreateUserDto } from "./CreateUserDto";
import { PartialType } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {

}