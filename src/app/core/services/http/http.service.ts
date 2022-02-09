import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly API =
    'https://better-address-default-rtdb.firebaseio.com/addressList.json';
  constructor(private http: HttpClient) {}

  storeData(addressList: Address[]): Observable<Object> {
    return this.http.post(this.API, addressList);
  }
}
