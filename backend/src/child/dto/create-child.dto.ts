import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  IsOptional,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateChildDto {
  @ApiProperty({
    description: "Full name of the child",
    example: "Jean Dupont",
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional({
    description: "Path to child photo",
    example: "/uploads/photo.jpg",
  })
  @IsOptional()
  @IsString()
  childPhoto?: string;

  @ApiProperty({ description: "Gender of the child", example: "Male" })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ description: "Date of birth", example: "2010-05-15" })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({ description: "Place of birth", example: "Paris" })
  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;

  @ApiProperty({ description: "Current village", example: "Village Name" })
  @IsString()
  @IsNotEmpty()
  currentVillage: string;

  @ApiProperty({ description: "Nationality", example: "French" })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiPropertyOptional({
    description: "Other nationality if applicable",
    example: "Canadian",
  })
  @IsOptional()
  @IsString()
  otherNationality?: string;

  @ApiProperty({ description: "Family status", example: "Orphan" })
  @IsString()
  @IsNotEmpty()
  familyStatus: string;

  @ApiPropertyOptional({
    description: "Other family status if applicable",
    example: "Single parent",
  })
  @IsOptional()
  @IsString()
  otherFamilyStatus?: string;

  @ApiProperty({ description: "Number of siblings", example: 2 })
  @IsNumber()
  @IsNotEmpty()
  numberOfSiblings: number;

  @ApiProperty({ description: "School name", example: "École Primaire" })
  @IsString()
  @IsNotEmpty()
  school: string;

  @ApiProperty({ description: "Current education level", example: "Primary" })
  @IsString()
  @IsNotEmpty()
  currentLevel: string;

  @ApiPropertyOptional({
    description: "Other education level if applicable",
    example: "Special education",
  })
  @IsOptional()
  @IsString()
  otherLevel?: string;

  @ApiProperty({ description: "School attendance status", example: "Regular" })
  @IsString()
  @IsNotEmpty()
  attendance: string;

  @ApiProperty({
    description: "School needs",
    type: [String],
    example: ["Books", "Uniform"],
  })
  @IsArray()
  @IsNotEmpty()
  schoolNeeds: string[];

  @ApiPropertyOptional({
    description: "Other school needs if applicable",
    example: "Transportation",
  })
  @IsOptional()
  @IsString()
  otherSchoolNeeds?: string;

  @ApiProperty({ description: "Health status", example: "Good" })
  @IsString()
  @IsNotEmpty()
  healthStatus: string;

  @ApiProperty({ description: "Vaccinations up to date", example: "Yes" })
  @IsString()
  @IsNotEmpty()
  vaccinationsUpToDate: string;

  @ApiPropertyOptional({
    description: "Specific health problems if any",
    example: "Asthma",
  })
  @IsOptional()
  @IsString()
  specificHealthProblems?: string;

  @ApiProperty({ description: "Housing type", example: "House" })
  @IsString()
  @IsNotEmpty()
  housingType: string;

  @ApiPropertyOptional({
    description: "Other housing type if applicable",
    example: "Apartment",
  })
  @IsOptional()
  @IsString()
  otherHousingType?: string;

  @ApiProperty({ description: "Access to water", example: "Yes" })
  @IsString()
  @IsNotEmpty()
  accessToWater: string;

  @ApiProperty({ description: "Access to electricity", example: "Yes" })
  @IsString()
  @IsNotEmpty()
  accessToElectricity: string;

  @ApiProperty({ description: "Sufficient food availability", example: "Yes" })
  @IsString()
  @IsNotEmpty()
  sufficientFood: string;

  @ApiProperty({ description: "Guardian activity", example: "Farmer" })
  @IsString()
  @IsNotEmpty()
  guardianActivity: string;

  @ApiProperty({ description: "Wishes to be sponsored", example: "Yes" })
  @IsString()
  @IsNotEmpty()
  wishesToBeSponsored: string;

  @ApiProperty({ description: "Guardian consent", example: "Yes" })
  @IsString()
  @IsNotEmpty()
  guardianConsent: string;

  @ApiPropertyOptional({
    description: "Specific comments",
    example: "Additional information",
  })
  @IsOptional()
  @IsString()
  specificComments?: string;

  @ApiPropertyOptional({
    description: "Path to birth certificate",
    example: "/uploads/cert.jpg",
  })
  @IsOptional()
  @IsString()
  birthCertificate?: string;

  @ApiPropertyOptional({
    description: "Path to school certificate",
    example: "/uploads/school_cert.jpg",
  })
  @IsOptional()
  @IsString()
  schoolCertificate?: string;

  @ApiPropertyOptional({
    description: "Path to recent photo",
    example: "/uploads/recent_photo.jpg",
  })
  @IsOptional()
  @IsString()
  recentPhoto?: string;

  @IsString()
  @IsNotEmpty()
  volunteerName: string;

  @IsString()
  @IsNotEmpty()
  volunteerContact: string;

  @IsDateString()
  @IsNotEmpty()
  surveyDate: string;
}
