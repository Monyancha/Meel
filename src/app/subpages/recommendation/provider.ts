import { Injectable } from '@angular/core';
import { User } from '../../model/users';

@Injectable()
export class MockProvider {
  private _data: User[] = [];

  constructor() {
    for(var i = 0; i < 16; i++){
      let newuser = new User();
      newuser.randomize();
      this._data.push(newuser);
    }
  }

  getData(): any[] {
    let data: any[] = [];
    for (var i = 0; i < 8; i++) {
      data.push( this._getRandomData() );
    }
    return data;
  }

  getAsyncData(): Promise<any[]> {
    // async receive mock data
    return new Promise(resolve => {

      setTimeout(() => {
        resolve(this.getData());
      }, 1000);

    });
  }

  private _getRandomData() {
    let i = Math.floor( Math.random() * this._data.length );
    return this._data[i];
  }


}