var Invitation = /** @class */ (function () {
    function Invitation() {
    }
    ;
    Invitation.prototype.randomStr = function (lengthOfCode) {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var text = "";
        for (var i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    Invitation.prototype.randomize = function () {
        this.invitationId = 'test_inv_id_' + this.randomStr(4);
        this.senderId = 'test_sender_id' + this.randomStr(4);
        this.receiverId = 'test_receiverId' + this.randomStr(4);
        this.start = 'today 12:00PM';
        this.end = 'today 12:30OM';
        this.longitude = -1;
        this.latitude = -1;
    };
    Invitation.prototype.toJSON = function () {
    };
    return Invitation;
}());
export { Invitation };
//# sourceMappingURL=invitation.js.map