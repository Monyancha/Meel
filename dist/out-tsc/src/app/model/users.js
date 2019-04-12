var User = /** @class */ (function () {
    function User() {
        // Core Info
        this.id = "-1";
        this.username = 'no_value';
        this.password = 'no_value';
        // Basic Info
        this.email = "no_value";
        this.college = "no_value";
        this.major = "no_value";
        this.gender = "other";
        this.yearOfEntry = "-1";
        this.age = "-1";
        // Privacy
        this.availability = true;
        this.shareGPS = false;
        this.latitude = 0;
        this.longitude = 0;
        // Todos
        this.description = "no_value";
    }
    ;
    /*
     * return a random string of arg:length
     */
    User.prototype.randomStr = function (length) {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var text = "";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    /*
     * randomize this user(for test purpose)
     */
    User.prototype.randomize = function () {
        this.id = 'test_id_' + this.randomStr(6);
        this.username = 'test_user_' + this.randomStr(4);
        this.email = 'test_email' + '@yale.edu';
        this.college = 'test_college';
        this.major = 'test_major';
        this.description = 'test_description_' + this.randomStr(32);
    };
    User.prototype.boolToStr = function (value) {
        if (value) {
            return 'T';
        }
        else {
            return 'F';
        }
    };
    User.prototype.toJSON = function () {
        return {
            "uid": this.id,
            "username": this.username,
            "description": this.description,
            "gender": this.gender,
            "college": this.college,
            "major": this.major,
            "age": this.age,
            "year": this.yearOfEntry,
            "availability": this.boolToStr(this.availability),
            "share_gps": this.boolToStr(this.shareGPS),
        };
    };
    return User;
}());
export { User };
//# sourceMappingURL=users.js.map