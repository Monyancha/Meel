
export class User {
    // Core Info
    id              = "-1";
    username        = 'pending';
    password        = 'pending';

    // Basic Info
    email           = "pending";
    college         = "pending";
    major           = "pending";
    gender          = "other";
    yearOfEntry     = "-1";
    age             = "-1";

    // Privacy
    availability    = true;
    shareGPS        = false;
    latitude        = 0;
    longitude       = 0;

    // Todos
    description     = "pending";
    image:          any;

    constructor() {};

    /*
     * return a random string of arg:length
     */
    private randomStr(length: number) {
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let text = "";
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    /*
     * randomize this user(for test purpose)
     */
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

    
    public toJSON() {
        return {
                "uid":              this.id,
                "gender":           "0",
                "college":          this.college,
                "major":            this.major,
                "age":              this.age,
                "availability" :    this.availabilityString(),
                "year":             this.yearOfEntry,
        }
    //     return {
    //         "uid":              5,
    //         "gender":           0,
    //         "college":          "csd",
    //         "major":            "cs",
    //         "age":              "20",
    //         "availability" :    "T",
    //         "year":             "2018",
    // }
    }
}

