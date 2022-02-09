import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs';
import { Address } from 'src/app/core/models/address.model';
import { State } from 'src/app/core/services/state/state.service';
import { FacadeService } from 'src/app/facade/facade.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrls: ['./address-information.component.css'],
  animations: [
    trigger('popUp', [
      state(
        'void',
        style({
          transform: 'translateY(0%)',
        })
      ),
      transition(
        'void => *',
        animate(
          300,
          keyframes([
            style({
              transform: 'translateY(-100%)',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'translateY(-50%)',
              opacity: 0.2,
              offset: 0.5,
            }),
            style({
              transform: 'translateY(0%)',
              opacity: 1,
              offset: 1,
            }),
          ])
        )
      ),
      transition(
        '* => void',
        animate(
          300,
          keyframes([
            style({
              transform: 'translateY(0%)',
              opacity: 1,
              offset: 0,
            }),
            style({
              transform: 'translateY(-50%)',
              opacity: 0.2,
              offset: 0.5,
            }),
            style({
              transform: 'translateY(-100%)',
              opacity: 0,
              offset: 1,
            }),
          ])
        )
      ),
    ]),
  ],
})
export class AddressInformationComponent implements OnInit, OnDestroy {
  addressList: Address[];
  isMoreInformationShown: boolean;
  currentAddress: Address;
  subs = new SubSink();

  constructor(private facade: FacadeService) {}

  ngOnInit(): void {
    this.facade.setState();
    this.addressList = this.facade.state.addressList;
  }

  showMoreInformation(address: Address) {
    this.currentAddress = address;
    this.isMoreInformationShown = !this.isMoreInformationShown;
  }

  deleteAddress(id: number) {
    this.facade.deleteAddress(id);
    this.subs.add(
      this.facade.state$.subscribe(
        (state) => (this.addressList = state.addressList)
      )
    );
  }

  editAddress(id: number) {
    this.facade.editAddress(id);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
