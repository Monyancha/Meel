
export class User {

    // Core Info
    id              = "-1";
    username        = "null";
    password        = "null";

    // Basic Info
    email           = "null";
    college         = "null";
    major           = "null";
    gender          = "other";
    yearOfEntry     = "-1";
    age             = "-1";

    // Privacy
    availability    = true;
    visibility      = true;
    shareGPS        = true;
    latitude        = 0;
    longitude       = 0;

    // Todos
    description     = "describe yourself..";
    imageUrl : any  = "../../assets/img/avatar.png";

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

    /*
     * convert str to bool
     */
    private boolToStr(value : boolean) {
        if(value){
            return 'T'
        } else {
            return 'F'
        }
    }

    /*
     * For update profile purpose
     */
    public toJSON() {
        return {
                "uid":              this.id,
                "username":         this.username,
                "description":      this.description,
                
                "gender":           this.gender,
                "college":          this.college,
                "major":            this.major,
                "age":              this.age,
                "year":             this.yearOfEntry,

                "availability" :    this.boolToStr(this.availability),
                "share_gps":        this.boolToStr(this.shareGPS),
        }
    }
}

