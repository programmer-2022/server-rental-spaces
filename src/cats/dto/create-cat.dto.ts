import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCatDto {
  @ApiProperty({ example: "Garfield", description: "The name of the cat" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 3, description: "The age of the cat" })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: "Persian", description: "The breed of the cat" })
  @IsNotEmpty()
  @IsString()
  breed: string;
}
