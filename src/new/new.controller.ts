import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { NewService } from "./new.service";
import { CurrentUser } from "../common/decorators/current-user.decorators";

@Controller("system")
@UseGuards()
export class NewController {
  constructor(private readonly newService: NewService) {}

  @Post("/login")
  login(@Req() req) {
    return this.newService.login(req.body, req);
  }

  @Post("/logout")
  logout(@Req() req, @Res() res) {
    req.session.destroy(function () {
      res.clearCookie(process.env.SESSION_NAME);
      res.status(200);
      res.send({ message: "Successfully logged out" });
    });
  }

  @Get("/currentUser")
  getProfile(@CurrentUser() user) {
    return this.newService.getProfile(user);
  }

  @Get("/users")
  getInfo() {
    return this.newService.getInfo();
  }
}
