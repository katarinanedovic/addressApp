import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../../models/address.model';
import { State, StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  form: FormGroup;
  currentAddressIndex: number;
  currentAddress: Address;
  editMode: boolean;

  constructor(
    private state: StateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  generateForm(editMode: boolean) {
    this.editMode = editMode;
    this.form = this.formBuilder.group({
      city: [
        '',
        [
          Validators.maxLength(30),
          Validators.minLength(2),
          Validators.required,
        ],
      ],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      people: this.formBuilder.array([]),
      postNumber: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      region: ['', Validators.maxLength(20)],
    });

    if (this.editMode) {
      if (this.currentAddress['people'].length > 0) {
        for (const person of this.currentAddress['people']) {
          this.addCitizen(person.name, person.lastName, person.UCIN);
        }
      }

      this.form.patchValue({
        city: this.currentAddress.city,
        street: this.currentAddress.street,
        houseNumber: this.currentAddress.houseNumber,
        people: [],
        postNumber: this.currentAddress.postNumber,
        region: this.currentAddress.region,
      });
    }

    return this.form;
  }

  addCitizen(name = '', lastName = '', UCIN = '') {
    (<FormArray>this.form.controls['people']).push(
      this.formBuilder.group({
        name: [name, Validators.required],
        lastName: [lastName, Validators.required],
        UCIN: [UCIN, [Validators.required, this.maxLength.bind(this)]],
      })
    );
  }

  removeCitizen(id: number) {
    (<FormArray>this.form.controls['people']).removeAt(id);
  }

  maxLength(control: FormControl) {
    if (control.value?.length !== 13) {
      return { maxLength: 'invalid' };
    }
    return null;
  }

  peopleArray() {
    return (<FormArray>this.form.get('people')).controls;
  }

  addressSubmitted() {
    const address = new Address(
      this.form.value.city,
      this.form.value.street,
      this.form.value.houseNumber,
      this.form.value.people,
      this.form.value.postNumber,
      this.form.value.region
    );

    if (this.editMode) {
      this.state.editAddress(address, this.currentAddressIndex);
    } else {
      this.state.addAddress(address);
    }
    this.router.navigate(['/']);
    this.form.reset();
  }

  editAddress(id: number) {
    this.currentAddressIndex = id;
    this.currentAddress = this.state.state.addressList[id];
    this.router.navigate([`/edit/${this.currentAddressIndex}`]);
  }
}
