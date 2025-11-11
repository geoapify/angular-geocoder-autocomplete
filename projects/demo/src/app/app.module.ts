import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressFormOneFieldComponent } from './address-form-one-field/address-form-one-field.component';
import { AutocompleteFeaturesEventsComponent } from './autocomplete-features-events/autocomplete-features-events.component';
import {
  GeoapifyGeocoderAutocompleteModule
} from "../../../angular-geocoder-autocomplete/src/lib/geocoder-autocomplete.module";

@NgModule({
  declarations: [
    AppComponent,
    AddressFormOneFieldComponent,
    AutocompleteFeaturesEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    /* WARNING: This API key is provided for DEMO purposes only.
       Please sign up at https://www.geoapify.com and generate your own API key.
       The demo key may be rotated or blocked at any moment without notice.
    */
    GeoapifyGeocoderAutocompleteModule.withConfig('52f7bd50de994836b609fbfc6f082700')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
