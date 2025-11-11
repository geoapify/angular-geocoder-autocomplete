import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressFormOneFieldComponent } from './address-form-one-field/address-form-one-field.component';
import { AutocompleteFeaturesEventsComponent } from './autocomplete-features-events/autocomplete-features-events.component';

const routes: Routes = [
  { path: '', redirectTo: '/demos', pathMatch: 'full' },
  { path: 'demos', children: [] }, // Index route handled by parent
  { path: 'demos/address-form-one-field', component: AddressFormOneFieldComponent },
  { path: 'demos/autocomplete-features-events', component: AutocompleteFeaturesEventsComponent },
  { path: '**', redirectTo: '/demos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
