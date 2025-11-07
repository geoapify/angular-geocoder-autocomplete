# Quick Start

Follow these steps to quickly integrate the Angular Geocoder Autocomplete component into your Angular application.

## Usage
### 1. Import the module

Incorporate the GeoapifyGeocoderAutocompleteModule into your Angular application by importing it as demonstrated below:

```javascript
// Import necessary modules from Angular and external libraries.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Configure the Angular application's modules.
    BrowserModule,
    // Integrate the Geoapify Geocoder Autocomplete Module.
    // Make sure to replace 'YOUR_API_KEY' with your actual API key.
    GeoapifyGeocoderAutocompleteModule.withConfig('YOUR_API_KEY')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### 2. Import styles
Import the CSS styling file from **@geoapify-geocoder-autocomplete** to ensure the proper appearance of the control. You have the flexibility to choose from a variety of styles to suit your webpage's aesthetics, including options such as:

- `minimal` and `round-borders` for webpages with light background colors.
- `minimal-dark` and `round-borders-dark` for webpages with dark background colors.

Certainly, here's an improved version of the instructions:

##### Option 1: Adding to `angular.json` when Using Angular CLI:

To include the Geoapify Geocoder Autocomplete styling in your Angular CLI project, update your `angular.json` file as follows:

```json
"styles": [
    ...
    "node_modules/@geoapify/geocoder-autocomplete/styles/round-borders.css",
    "src/styles.scss"
],
``` 

##### Option 2: Importing in Global CSS (e.g., styles.css):

Alternatively, you can import the Geoapify Geocoder Autocomplete styling in your global CSS file, such as `styles.css`, using the following syntax:

```css
@import "~@geoapify/geocoder-autocomplete/styles/minimal.css";
```

For further details on available styles, CSS classes and customization options, please refer to the [@geoapify-geocoder-autocomplete page](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete).

### 3. Use geocoder autocomplete field in your template

```html
<!-- Basic Usage: A standalone Geoapify Geocoder Autocomplete input field without customization. -->

<geoapify-geocoder-autocomplete></geoapify-geocoder-autocomplete>

<!-- Usage with Event Listeners: Listen for place selection and suggestions change events. -->

<geoapify-geocoder-autocomplete 
    (placeSelect)="placeSelected($event)" 
    (suggestionsChange)="suggestionsChanged($event)">
</geoapify-geocoder-autocomplete>

<!-- Customized Usage: Customize the behavior and appearance of the Geoapify Geocoder Autocomplete input field by binding to various input properties and event handlers. -->

<geoapify-geocoder-autocomplete 
    [value]="displayValue"
    [type]="options.type"
    [lang]="options.lang"
    [limit]="options.limit" 
    [filterByCountryCode]="filterByCountryCode"
    [filterByCircle]="filterByCircle"
    [filterByRect]="filterByRect"
    [biasByCountryCode]="biasByCountryCode"
    [biasByCircle]="biasByCircle"
    [biasByRect]="biasByRect"
    [biasByProximity]="biasByProximity"
    [skipIcons]="true"
    [addDetails]="true"
    [allowNonVerifiedHouseNumber]="true"
    [allowNonVerifiedStreet]="true"
    [skipSelectionOnArrowKey]="false"
    [addCategorySearch]="options.addCategorySearch"
    [showPlacesList]="options.showPlacesList"
    [hidePlacesListAfterSelect]="options.hidePlacesListAfterSelect"
    [enablePlacesLazyLoading]="options.enablePlacesLazyLoading"
    [placesLimit]="options.placesLimit"
    [placesFilter]="options.placesFilter"
    [placesBias]="options.placesBias"
    [preprocessingHook]="preprocessingHook"
    [postprocessingHook]="postprocessingHook"
    [suggestionsFilter]="suggestionsFilter"
    (placeSelect)="placeSelected($event)" 
    (suggestionsChange)="suggestionsChanged($event)"
    (userInput)="userInput($event)"
    (requestStart)="requestStarted($event)"
    (requestEnd)="requestEnded($event)"
    (places)="placesChanged($event)"
    (placeSelectEvent)="placeSelectedFromList($event)"
    (placesRequestStart)="placesRequestStarted($event)"
    (placesRequestEnd)="placesRequestEnded($event)">
</geoapify-geocoder-autocomplete>
```
