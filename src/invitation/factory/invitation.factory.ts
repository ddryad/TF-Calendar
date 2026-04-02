import { IInvitationFactory } from "./invitation-interface.factory";

export class invitationFactory implements IInvitationFactory{
    create(type: string) {
        switch (type){
            case 'ami':
                return {type: 'ami'};
            case 'activite':
                return{type: 'activite'};
            default:
                throw new Error('Type invalide');
        }
        
    }
}