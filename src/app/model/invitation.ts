

export class Invitation {
    
    invitationId:       string;

    senderId:           string;
    receiverId:         string;

    start:              string;
    end:                string;

    latitude:           number;
    longitude:          number;

    rName:              string;
    sName:              string;

    constructor() {};

    private randomStr(lengthOfCode: number) {
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let text = "";
        for (let i = 0; i < lengthOfCode; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    randomize() {
        this.invitationId   = 'test_inv_id_' + this.randomStr(4);

        this.senderId       = 'test_sender_id' + this.randomStr(4);
        this.receiverId     = 'test_receiverId' + this.randomStr(4);
        
        this.start          = 'today 12:00PM';
        this.end            = 'today 12:30OM';

        this.longitude      = -1;
        this.latitude       = -1;
    }

    toJSON() {

    }

}

