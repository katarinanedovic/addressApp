import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressInformationComponent } from './pages/address-information/address-information.component';
import { NewAddressComponent } from './pages/new-address/new-address.component';

const routes: Routes = [
  { path: '', component: AddressInformationComponent },
  { path: 'information', component: AddressInformationComponent },
  { path: 'new', component: NewAddressComponent },
  { path: 'edit/:id', component: NewAddressComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
