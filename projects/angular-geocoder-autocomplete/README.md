# Angular compoment for Geoapify Geocoder Autocomplete
The component wraps the [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) library into an Angular component.

## Installation
@geoapify/angular-geocoder-autocomplete has a peer dependancy on **@geoapify-geocoder-autocomplete**:
```
npm install @geoapify-geocoder-autocomplete @geoapify/angular-geocoder-autocomplete
# or 
yarn add @geoapify-geocoder-autocomplete @geoapify/angular-geocoder-autocomplete
```
## Compatiblity table
|@geoapify/angular-geocoder-autocomplete|Angular|
|-|-|
|1.0.x|9.x|

## Usage
#### 1. Import the module
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GeoapifyGeocoderAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
#### 2. Import styles
Import CSS style file from **@geoapify-geocoder-autocomplete** to make the control appear correctly. You can choose from several stylings:
* `minimal` and `round-borders` - for webpages with light background color
* `minimal-dark` and `round-borders-dark` for webpages with dark background color.
You can import the css-file in a 

#### 3. Use geocoder autocomplete field in your template

### Inputs 
### Outputs

## Geoapify Geocoding API documentation
*
*
*