import { Injectable } from '@angular/core';
import { State } from '../services/state/state.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setStorage(state: State) {
    localStorage.setItem('addressList', JSON.stringify(state));
  }

  get getItem(): State {
    return JSON.parse(localStorage.getItem('addressList'));
  }
}
