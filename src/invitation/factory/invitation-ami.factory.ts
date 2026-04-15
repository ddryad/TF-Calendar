import { Invitation } from "../invitation.entity";

export class InvitationAmiFactory {
  create(data: any): Partial<Invitation> {
    return {
      ...data,
      type: "AMI",
    };
  }
}