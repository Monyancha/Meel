import { Injectable } from '@angular/core';

import { User } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class MockProviderService {

  private _mock_users: User[] = [];

  constructor() { 
    for(var i = 0; i < 16; i++) {
      let newuser = new User;
      newuser.randomize();
      this._mock_users.push(newuser);
    }
  }

  private getRandomUser() : User {
    let i = Math.floor( Math.random() * this._mock_users.length );
    return this._mock_users[i];
  }

  public getRandomUsers(number : number) : User[] {
    let res: User[] = [];
    for(var i = 0; i < number; i ++) {
      res.push(this.getRandomUser());
    }
    return res;
  }

  public getRandomUsersAsync(number : number) : Promise<User[]> { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.getRandomUsers(number));
      }, 1000);
    });
  }

}
