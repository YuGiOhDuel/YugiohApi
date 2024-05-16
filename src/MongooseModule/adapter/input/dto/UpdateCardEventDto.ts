import { CreateCardEventDto } from "./CreateCardEventDto";
import { PartialType } from "@nestjs/swagger";

export class UpdateCardEventDto extends PartialType(CreateCardEventDto) {

}