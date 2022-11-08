import { IncomingMessageSession } from "../../shared/models/incoming-message-session.model";

export class SessionService {
  private readonly TOKEN_TTL_MINUTES = 60 * 24;

  private request: Request;

  constructor(req: Request) {
    this.request = req;
  }

  setUser(userId: number, username: string, role?: string) {
    (this.request as unknown as IncomingMessageSession).session.currentUser = {
      id: userId,
      username,
      role,
    };
  }
}
