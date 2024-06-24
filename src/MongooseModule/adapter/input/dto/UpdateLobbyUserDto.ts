import { CreateLobbyUserDto } from "./CreateLobbyUserDto";
import { PartialType } from "@nestjs/swagger";

export class UpdateLobbyUserDto extends PartialType(CreateLobbyUserDto) {

}