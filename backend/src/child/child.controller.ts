import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ChildService } from "./child.service";
import { CreateChildDto } from "./dto/create-child.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("child")
@Controller("children")
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post()
  @ApiOperation({ summary: "Create a new child record" })
  @ApiResponse({ status: 201, description: "Child created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async create(@Body() createChildDto: CreateChildDto) {
    return await this.childService.create(createChildDto);
  }

  @Post("upload")
  @ApiOperation({ summary: "Upload files for child records" })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 201, description: "Files uploaded successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @UseInterceptors(
    FilesInterceptor("files", 10, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          return callback(
            new BadRequestException("Only image and PDF files are allowed!"),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadedFiles = files.map((file) => ({
      fieldname: file.fieldname,
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    }));
    return { files: uploadedFiles };
  }

  @Get()
  @ApiOperation({ summary: "Get all children" })
  @ApiResponse({ status: 200, description: "Children retrieved successfully" })
  async findAll() {
    return await this.childService.findAll();
  }

  @Get("status/:status")
  @ApiOperation({ summary: "Get children by status" })
  @ApiParam({ name: "status", description: "Status to filter by" })
  @ApiResponse({ status: 200, description: "Children retrieved successfully" })
  async findByStatus(@Param("status") status: string) {
    return await this.childService.findByStatus(status);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a child by ID" })
  @ApiParam({ name: "id", description: "Child ID" })
  @ApiResponse({ status: 200, description: "Child retrieved successfully" })
  @ApiResponse({ status: 404, description: "Child not found" })
  async findOne(@Param("id") id: string) {
    return await this.childService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a child" })
  @ApiParam({ name: "id", description: "Child ID" })
  @ApiResponse({ status: 200, description: "Child updated successfully" })
  @ApiResponse({ status: 404, description: "Child not found" })
  async update(
    @Param("id") id: string,
    @Body() updateData: Partial<CreateChildDto>,
  ) {
    return await this.childService.update(id, updateData);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Update child status" })
  @ApiParam({ name: "id", description: "Child ID" })
  @ApiResponse({ status: 200, description: "Status updated successfully" })
  async updateStatus(@Param("id") id: string, @Body("status") status: string) {
    return await this.childService.updateStatus(id, status);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a child" })
  @ApiParam({ name: "id", description: "Child ID" })
  @ApiResponse({ status: 200, description: "Child deleted successfully" })
  @ApiResponse({ status: 404, description: "Child not found" })
  async remove(@Param("id") id: string) {
    await this.childService.remove(id);
    return { message: "Child record deleted successfully" };
  }
}
