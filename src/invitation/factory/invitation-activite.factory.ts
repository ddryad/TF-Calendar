import { Invitation } from "../invitation.entity";

export class InvitationActiviteFactory {
  create(data: any): Partial<Invitation> {
    return {
      ...data,
      type: "ACTIVITE",
    };
  }
}