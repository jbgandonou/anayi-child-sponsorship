import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  RegisterDto,
  LoginDto,
  UpdateUserDto,
  ChangePasswordDto,
} from "./dto/auth.dto";
import { Public } from "./public.decorator";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({ status: 200, description: "Login successful" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get("profile")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user profile" })
  @ApiResponse({ status: 200, description: "Profile retrieved successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getProfile(@GetUser() user: User) {
    return await this.authService.getProfile(user.id);
  }

  @Patch("profile")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user profile" })
  @ApiResponse({ status: 200, description: "Profile updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async updateProfile(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.authService.updateProfile(user.id, updateUserDto);
  }

  @Post("change-password")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Change user password" })
  @ApiResponse({ status: 200, description: "Password changed successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(user.id, changePasswordDto);
    return { message: "Password changed successfully" };
  }

  @Get("users")
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

  @Get("me")
  async getCurrentUser(@GetUser() user: User) {
    return user;
  }
}
