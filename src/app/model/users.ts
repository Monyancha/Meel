

export class User {
    id:             string;
    username:       string;
    password:       string;

    email:          string;
    college:        string;
    major:          string;

    // todos
    discription:    string;
    image:          any;
    location:       any;

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
        this.id = 'test_id_' + this.randomStr(6);
        this.username = 'test_user' + this.randomStr(4);
        this.email = 'test_email' + '@yale.edu';
        this.college = 'test_college';
        this.major = 'test_major';
        this.discription = 'test_discription_' + this.randomStr(32);
    }
}

