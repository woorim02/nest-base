import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userName?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email?: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshToken?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshTokenExp?: Date;
}
