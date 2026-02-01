import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { DraftService } from "./draft.service";
import { CreateDraftDto, UpdateDraftDto } from "./dto/draft.dto";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("draft")
@Controller("drafts")
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new draft" })
  @ApiResponse({ status: 201, description: "Draft created successfully" })
  async create(@GetUser() user: User, @Body() createDraftDto: CreateDraftDto) {
    return await this.draftService.create(user.id, createDraftDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all user drafts" })
  @ApiResponse({ status: 200, description: "Drafts retrieved successfully" })
  async findAll(@GetUser() user: User) {
    return await this.draftService.findAll(user.id);
  }

  @Get("completed")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all completed drafts" })
  @ApiResponse({
    status: 200,
    description: "Completed drafts retrieved successfully",
  })
  async getAllCompleted(@GetUser() user: User) {
    return await this.draftService.getAllCompleted(user.id);
  }

  @Get(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a draft by ID" })
  @ApiParam({ name: "id", description: "Draft ID" })
  @ApiResponse({ status: 200, description: "Draft retrieved successfully" })
  @ApiResponse({ status: 404, description: "Draft not found" })
  async findOne(@Param("id") id: string, @GetUser() user: User) {
    return await this.draftService.findOne(id, user.id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a draft" })
  @ApiParam({ name: "id", description: "Draft ID" })
  @ApiResponse({ status: 200, description: "Draft updated successfully" })
  @ApiResponse({ status: 404, description: "Draft not found" })
  async update(
    @Param("id") id: string,
    @GetUser() user: User,
    @Body() updateDraftDto: UpdateDraftDto,
  ) {
    return await this.draftService.update(id, user.id, updateDraftDto);
  }

  @Patch(":id/complete")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Mark draft as completed" })
  @ApiParam({ name: "id", description: "Draft ID" })
  @ApiResponse({ status: 200, description: "Draft marked as completed" })
  async markAsCompleted(@Param("id") id: string, @GetUser() user: User) {
    return await this.draftService.markAsCompleted(id, user.id);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string, @GetUser() user: User) {
    await this.draftService.remove(id, user.id);
  }
}
