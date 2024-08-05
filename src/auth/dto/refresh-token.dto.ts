import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: number;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshToken: string;
}
