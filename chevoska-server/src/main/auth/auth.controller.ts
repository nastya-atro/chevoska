import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ValidateDTO } from "../../common/decorators/validate-dto.decorator";
import { SignUpInputDto } from "./dto/signUp.input.dto";
import { Host } from "../../common/decorators/host.decorator";
import { Session } from "../../common/session/decorators/session.decorator";
import { SessionService } from "../../common/session/session.service";
import { UserAuthGuard } from "./guards/auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorators";
import { SessionUser } from "../../common/session/models/session.model";
import { UserProfileOutputDto } from "./dto/user-profile.output.dto";
import { ForgotPasswordInputDto } from "./dto/forgot-password.input.dto";

@Controller("auth")
@UseGuards()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/profile")
  findCurrentProfile(
    @CurrentUser() user: SessionUser
  ): Promise<UserProfileOutputDto> {
    return this.authService.findCurrentProfile(user?.id);
  }

  @UseGuards(UserAuthGuard)
  @Post("login")
  login(@Req() req, @Session() session: SessionService) {
    return this.authService.login(req.user, session);
  }

  @Get("logout")
  logout(@Session() session: SessionService, @Res() res) {
    session.logout(res);
  }

  @Post("signup")
  @ValidateDTO()
  signUp(@Body() body: SignUpInputDto, @Host() domain): Promise<string> {
    return this.authService.signup(body);
  }

  // gey not active user info (email and phone)
  @Get("activate-profile")
  validate(
    @Query("token") token: string
  ): Promise<{ email: string; phone: string }> {
    return this.authService.getUserInfo(token);
  }

  // validate email by sending confirm link
  @Get("validate-email")
  validateEmail(@Query("token") token: string, @Host() domain) {
    return this.authService.validateUserEmail(token, domain);
  }

  // // validate email by sending confirm link
  // @Get("validate-phone")
  // validatePhone(@Query("token") token: string, @Host() domain) {
  //   return this.authService.validateUserPhone(token, domain);
  // }

  // activate email by confirm-link
  @Get("activate")
  activate(@Query("token") token: string): Promise<{ statusCode: number }> {
    return this.authService.activate(token);
  }

  // activate profile without validate email or phone by start token
  @Get("develop-activate")
  activateUserWithoutValidate(@Query("token") token: string) {
    return this.authService.activateUserWithoutValidate(token);
  }

  // Forgot password functionality

  @Post("forgot")
  async recovery(
    @Body("email") email: string,
    @Host() domain
  ): Promise<{ statusCode: number }> {
    return this.authService.recoveryPassword(
      email,
      domain,
      `${process.env.STATIC_URL}`
    );
  }

  @Get("forgot/:token")
  async forgotPasswordInfo(@Param("token") token: string): Promise<string> {
    return this.authService.forgotPasswordInfo(token);
  }

  @Post("recover")
  async forgotPassword(
    @Body() body: ForgotPasswordInputDto
  ): Promise<{ statusCode: number }> {
    return this.authService.forgotPassword(body);
  }
}
