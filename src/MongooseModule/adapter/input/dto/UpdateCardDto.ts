import { CreateCardDto } from "./CreateCardDto";
import { PartialType } from "@nestjs/swagger";

export class UpdateCardDto extends PartialType(CreateCardDto) {

}