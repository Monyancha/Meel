
export class User {
    // Core Info
    id              = "19";
    username        = 'null';
    password        = 'null';

    // Basic Info
    email           = "null";
    college         = "null";
    major           = "null";
    gender          = "other";
    yearOfEntry     = "-1";
    age             = "-1";

    // Privacy
    availability    = true;
    shareGPS        = false;
    latitude        = 0;
    longitude       = 0;

    // Todos
    description     = "Shortly describe yourself";
    image:          any;

    constructor() {};

    private randomStr(lengthOfCode: number) {
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let text = "";
        for (let i = 0; i < lengthOfCode; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    public randomize() {
        this.id             = 'test_id_' + this.randomStr(6);
        this.username       = 'test_user_' + this.randomStr(4);
        this.email          = 'test_email' + '@yale.edu';
        this.college        = 'test_college';
        this.major          = 'test_major';
        this.description    = 'test_description_' + this.randomStr(32);
    }

    private availabilityString() {
        if(this.availability){
            return 'T'
        } else {
            return 'F'
        }
    }

    toJSON() {
        return {
                "uid":              this.id,
                "gender":           "1",
                "major":            this.major,
                "age":              this.age,
                "availability" :    this.availabilityString(),
                "year":             this.yearOfEntry,
        }
    }

}

