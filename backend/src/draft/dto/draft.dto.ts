import {
  IsNotEmpty,
  IsObject,
  IsNumber,
  IsOptional,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDraftDto {
  @ApiProperty({
    description: "Form data object",
    example: { name: "John", age: 10 },
  })
  @IsObject()
  @IsNotEmpty()
  formData: any;

  @ApiPropertyOptional({ description: "Current step in the form", example: 1 })
  @IsNumber()
  @IsOptional()
  currentStep?: number;
}

export class UpdateDraftDto {
  @ApiPropertyOptional({
    description: "Form data object",
    example: { name: "John", age: 10 },
  })
  @IsObject()
  @IsOptional()
  formData?: any;

  @ApiPropertyOptional({ description: "Current step in the form", example: 2 })
  @IsNumber()
  @IsOptional()
  currentStep?: number;

  @ApiPropertyOptional({
    description: "Whether the draft is completed",
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
