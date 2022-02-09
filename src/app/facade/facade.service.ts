import { Injectable } from '@angular/core';
import { AddressService } from '../core/services/address/address.service';
import { HttpService } from '../core/services/http/http.service';
import { StateService } from '../core/services/state/state.service';
import { StorageService } from '../core/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(
    private addressService: AddressService,
    private stateService: StateService,
    private httpService: HttpService,
    private storageService: StorageService
  ) {}

  generateForm(editMode: boolean) {
    return this.addressService.generateForm(editMode);
  }

  addCitizen() {
    this.addressService.addCitizen();
  }

  removeCitizen(id: number) {
    this.addressService.removeCitizen(id);
  }

  addressSubmitted() {
    this.addressService.addressSubmitted();
    this.httpService.storeData(this.stateService.state.addressList).subscribe();
    this.storageService.setStorage(this.state);
  }

  peopleArray() {
    return this.addressService.peopleArray();
  }

  get state() {
    return this.stateService.state;
  }

  get state$() {
    return this.stateService.state$;
  }

  setState() {
    if (this.storageService.getItem)
      this.stateService.setState(this.storageService.getItem);
  }

  deleteAddress(id: number) {
    this.stateService.deleteAddress(id);
    this.storageService.setStorage(this.state);
  }

  editAddress(id: number) {
    this.addressService.editAddress(id);
  }
}
