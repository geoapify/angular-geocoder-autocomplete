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
    GeoapifyGeocoderAutocompleteModule.withConfig('93b8e26606dd485183dcdab30f239f81')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
