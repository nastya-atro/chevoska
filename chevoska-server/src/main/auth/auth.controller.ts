import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ValidateDTO } from "../../common/decorators/validate-dto.decorator";
import { SignUpInputDto } from "./dto/signUp.input.dto";
import { Host } from "../../common/decorators/host.decorator";
import { Session } from "../../common/session/decorators/session.decorator";
import { SessionService } from "../../common/session/session.service";
import { UserAuthGuard } from "./guards/auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorators";
import { SessionUser } from "../../common/session/models/session.model";
import { ProfileOutputDto } from "./dto/profile.output.dto";
import { UserProfileOutputDto } from "./dto/user-profile.output.dto";

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
  @Post("/login")
  login(@Req() req, @Session() session: SessionService) {
    return this.authService.login(req.user, session);
  }

  @Post("/signup")
  @ValidateDTO()
  signUp(@Body() body: SignUpInputDto, @Host() domain) {
    return this.authService.signup(body, domain);
  }
}
