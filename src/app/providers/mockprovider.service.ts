import { Injectable } from '@angular/core';

import { User } from '../model/users';
import { Invitation } from '../model/invitation';

@Injectable({
  providedIn: 'root'
})
export class MockProviderService {

  /*
   * Mock Provider used for tesing
   */

  private _mock_users: User[] = [];
  private _mock_invitations: Invitation[] = [];

  constructor() { 
    for(var i = 0; i < 32; i++) {
      let newuser = new User;
      newuser.randomize();
      this._mock_users.push(newuser);

      let newInvite = new Invitation;
      newInvite.randomize();
      this._mock_invitations.push(newInvite);
    }
  }

  private getRandomUser() : User {
    let i = Math.floor( Math.random() * this._mock_users.length );
    return this._mock_users[i];
  }

  private getRandomInvitation() : Invitation {
    let i = Math.floor( Math.random() * this._mock_invitations.length );
    return this._mock_invitations[i];
  }

  public getRandomUsers(number : number) : User[] {
    let res: User[] = [];
    for(var i = 0; i < number; i ++) {
      res.push(this.getRandomUser());
    }
    return res;
  }

  public getRandomInvitations(number : number) : Invitation[] {
    let res: Invitation[] = [];
    for(var i = 0; i < number; i ++) {
      res.push(this.getRandomInvitation());
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

  public getRandomInvitationsAsync(number : number) : Promise<Invitation[]> { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.getRandomInvitations(number));
      }, 1000);
    });
  }

}
