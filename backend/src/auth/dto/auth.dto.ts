import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../user.entity";

export class RegisterDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User password",
    minLength: 6,
    example: "password123",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: "User first name", example: "John" })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "User last name", example: "Doe" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    description: "User phone number",
    example: "+1234567890",
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: "User organization",
    example: "NGO Name",
  })
  @IsOptional()
  @IsString()
  organization?: string;
}

export class LoginDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "User password", example: "password123" })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ description: "User first name", example: "John" })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: "User last name", example: "Doe" })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    description: "User phone number",
    example: "+1234567890",
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: "User organization",
    example: "NGO Name",
  })
  @IsOptional()
  @IsString()
  organization?: string;

  @ApiPropertyOptional({
    description: "New password",
    minLength: 6,
    example: "newpassword123",
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ description: "Current password", example: "oldpassword123" })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    description: "New password",
    minLength: 6,
    example: "newpassword123",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
