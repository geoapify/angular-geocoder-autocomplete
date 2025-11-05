import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    GeoapifyGeocoderAutocompleteModule.withConfig('YOUR_API_KEY')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
