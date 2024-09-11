import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  GeoapifyGeocoderAutocompleteModule
} from "../../../angular-geocoder-autocomplete/src/lib/geocoder-autocomplete.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GeoapifyGeocoderAutocompleteModule.withConfig('API_KEY')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
