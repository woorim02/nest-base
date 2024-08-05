import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
