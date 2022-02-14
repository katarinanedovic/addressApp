import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FacadeService } from 'src/app/facade/facade.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css'],
})
export class NewAddressComponent implements OnInit {
  form: FormGroup;
  editMode: boolean;

  constructor(private facade: FacadeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.routeConfig.path === 'new'
      ? (this.editMode = false)
      : (this.editMode = true);
    this.form = this.facade.generateForm(this.editMode);
  }

  addCitizen() {
    this.facade.addCitizen();
  }

  peopleArray() {
    return this.facade.peopleArray();
  }

  addressSubmitted() {
    this.facade.addressSubmitted();
  }

  removeCitizen(id: number) {
    this.facade.removeCitizen(id);
  }
}
