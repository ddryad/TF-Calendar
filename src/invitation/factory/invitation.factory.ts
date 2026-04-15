import { IInvitationFactory } from "./invitation-interface.factory";
import { InvitationActiviteFactory } from "./invitation-activite.factory";
import { InvitationAmiFactory } from "./invitation-ami.factory";

export class InvitationFactory implements IInvitationFactory {
  create(type: string) {
    switch (type) {
      case "ACTIVITE":
        return new InvitationActiviteFactory();

      case "AMI":
        return new InvitationAmiFactory();

      default:
        throw new Error("Type d'invitation invalide");
    }
  }
}