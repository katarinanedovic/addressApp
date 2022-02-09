import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../../models/address.model';

export interface State {
  addressList: Address[];
}

const initialState: State = {
  addressList: [],
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  addressState = new BehaviorSubject<State>(initialState);

  constructor() {}

  get state() {
    return this.addressState.getValue();
  }

  setState(newState: State) {
    this.addressState.next(newState);
  }

  get state$() {
    return this.addressState.asObservable();
  }

  addAddress(newItem: Address) {
    const newState: State = {
      addressList: [...this.state.addressList, newItem],
    };
    this.setState(newState);
  }

  editAddress(editedAdress: Address, id: number) {
    const addressList: Address[] = this.state.addressList.map((address) =>
      this.state.addressList.indexOf(address) === id ? editedAdress : address
    );
    const newState: State = { addressList: [...addressList] };
    this.setState(newState);
  }

  deleteAddress(id: number) {
    const addressList: Address[] = this.state.addressList.filter(
      (address) => address !== this.state.addressList[id]
    );
    const newState: State = {
      addressList: [...addressList],
    };
    this.setState(newState);
  }
}
