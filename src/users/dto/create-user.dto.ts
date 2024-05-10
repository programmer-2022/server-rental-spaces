import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Nicolas", description: "The name of the user" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 18, description: "The age of the user" })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: "3:456.6778-5", description: "The dni of the user" })
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty({ example: "admin", description: "the role of the user" })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ example: "example@example.com", description: "the email od the user" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
