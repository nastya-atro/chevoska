import { createParamDecorator } from "@nestjs/common";

export const CurrentClient = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  if (req && req.session && req.session.currentClient) {
    const client = req.session.currentClient;
    return client;
  }
  return null;
});
