# Angular Geocoder Autocomplete

The Angular Geocoder Autocomplete component integrates the [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) library into Angular, enabling advanced address search powered by the [Geoapify Geocoding Autocomplete](https://www.geoapify.com/address-autocomplete/) service.

## Installation

@geoapify/angular-geocoder-autocomplete has a peer dependency on **@geoapify/geocoder-autocomplete**. To install both dependencies, use the following commands:

```bash
npm install @geoapify/geocoder-autocomplete @geoapify/angular-geocoder-autocomplete
# or 
yarn add @geoapify/geocoder-autocomplete @geoapify/angular-geocoder-autocomplete
```
## Compatibility Table

| @geoapify/angular-geocoder-autocomplete | Angular Version |
|-----------------------------------------|-----------------|
| 1.0.x                                   | 9.x            |
| 1.1.x                                   | 9.x            |
| 1.2.x                                   | 10.x           |
| 1.3.0 - 1.3.1                           | 11.x           |
| 1.3.2 - 1.3.3                           | 12.x           |
| 1.3.4 - 1.3.5                           | 13.x           |
| 1.3.6 - 1.3.x                           | 14.x           |
| 2.0.0                                   | 15.x           |
| 2.0.1                                   | 15.x-16.x      |
| 2.0.2                                   | 17.x-18.x      |
| 2.0.3                                   | 19.x-20.x      |

**Note:** If you want to get rid of the Angular version dependency or integrate the `geocoder-autocomplete` without the wrapper, you can follow the instructions provided in [the documentation for standalone usage](#standalone-usage).


## Transitioning from version 1.x to 2.x: Replacing skipDetails with addDetails

In version 2.x of the library, we've replaced the skipDetails option with addDetails. This update provides greater clarity, indicating whether you want to include or exclude additional details in your search results. To ensure compatibility with the new version, remember to adjust your code accordingly by using the addDetails option when you need place details in your search results.
## Getting Your Geoapify API Key

If you opt to integrate the Geoapify API for address searches, securing an API key is a prerequisite.

To obtain your API key, you can complete the registration process at [myprojects.geoapify.com](https://myprojects.geoapify.com/). It's worth noting that Geoapify offers a versatile [Freemium pricing model](https://www.geoapify.com/pricing/), affording you the opportunity to initiate your API usage at no initial cost and seamlessly expand your access to our services to align with your evolving requirements.

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
    [preprocessingHook]="preprocessingHook"
    [postprocessingHook]="postprocessingHook"
    [suggestionsFilter]="suggestionsFilter"
    (placeSelect)="placeSelected($event)" 
    (suggestionsChange)="suggestionsChanged($event)"
    (userInput)="userInput($event)"
    (requestStart)="requestStarted($event)"
    (requestEnd)="requestEnded($event)">
</geoapify-geocoder-autocomplete>
```

## API Documentation

Here is the comprehensive list of input and output properties. Learn how to configure and customize the component, and discover how to utilize its full potential to enhance the user experience.

| Input Property                  | Description                                                                                                |
|---------------------------------|------------------------------------------------------------------------------------------------------------|
| `value: string`                 | The value of the input field.                                                                             |
| `placeholder: string`           | The placeholder text for the input field.                                                                 |
| `type: GeocoderAutocomplete.LocationType`            | The type of location you want to search for (e.g., 'country', 'state', 'city', 'postcode', 'street', 'amenity'). |
| `skipIcons: boolean`            | Determines whether to skip displaying icons for suggestions.                                              |
| `addDetails: boolean`           | Specifies whether to include additional place details in the suggestions.                                |
| `lang: SupportedLanguage`       | The language used for suggestions and results.                                                            |
| `filterByCountryCode: GeocoderAutocomplete.ByCountryCodeOptions` | Filters suggestions by country code.                                                              |
| `filterByCircle: GeocoderAutocomplete.ByCircleOptions` | Filters suggestions by a circular area.                                                                  |
| `filterByRect: GeocoderAutocomplete.ByRectOptions`   | Filters suggestions by a rectangular area.                                                                |
| `biasByCountryCode: GeocoderAutocomplete.ByCountryCodeOptions` | Bias suggestions by country code.                                                             |
| `biasByCircle: GeocoderAutocomplete.ByCircleOptions`  | Bias suggestions by a circular area.                                                                     |
| `biasByRect: GeocoderAutocomplete.ByRectOptions`      | Bias suggestions by a rectangular area.                                                                   |
| `biasByProximity: GeocoderAutocomplete.ByProximityOptions` | Bias suggestions by proximity to a location.                                                       |
| `limit: number`                 | The maximum number of suggestions to display.                                                             |
| `debounceDelay: number`         | The debounce delay for input changes in milliseconds.                                                      |
| `allowNonVerifiedHouseNumber: boolean` | Allows input of house numbers that may not be verified in the geocoding database.                          |
| `allowNonVerifiedStreet: boolean` | Allows input of street names that may not be verified in the geocoding database.                           |
| `skipSelectionOnArrowKey: boolean` | When true, prevents automatic selection when navigating suggestions with arrow keys.                        |
| *preprocessingHook: (value: string) => string* | A function to preprocess the input value before sending requests.                               |
| *postprocessingHook: (feature: [GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON)) => string* | A function to process and modify the selected place feature before display.                  |
| *suggestionsFilter: (suggestions: [GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON)[]) => [GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON)[]* | A function to filter and modify the suggestions list before display.                           |
| *sendGeocoderRequestFunc: (value: string, geocoderAutocomplete: GeocoderAutocomplete) => Promise<[GeoJSON.FeatureCollection](https://en.wikipedia.org/wiki/GeoJSON)>* | A custom function to send geocoder requests.                                |
| *sendPlaceDetailsRequestFunc: (feature: [GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON), geocoderAutocomplete: GeocoderAutocomplete) => Promise<[GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON)>* | A custom function to send place details requests.                        |


Here are the component outputs:

| Output Property         | Description                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------|
| `placeSelect: EventEmitter<GeoJSON.Feature>`         | Emits an event when a place is selected from the suggestions.                                 |
| `suggestionsChange: EventEmitter<GeoJSON.Feature[]>`    | Emits an event when the suggestions list changes.                                                |
| `userInput: EventEmitter<string>`         | Emits the user's input as a string when they interact with the input field.                   |
| `open: EventEmitter<boolean>`             | Emits a boolean value indicating when the suggestions dropdown opens.                             |
| `close: EventEmitter<boolean>`            | Emits a boolean value indicating when the suggestions dropdown closes.                             |
| `requestStart: EventEmitter<any>`         | Emits an event when a geocoding request begins (after debounce delay).                            |
| `requestEnd: EventEmitter<any>`           | Emits an event when a geocoding request completes (success or failure).                           |

The component itself doesn't have a dependency on [@types/geojson](https://www.npmjs.com/package/@types/geojson). However, if you wish to work with GeoJSON types in your application, you can install it as an additional package.

### Examples. Using Filters and Bias

Here are a few examples of how to set filters and bias using the `@geoapify/angular-geocoder-autocomplete` Angular component:

1. Filter by Country Code:
```html
<geoapify-geocoder-autocomplete [filterByCountryCode]="['US', 'CA']"></geoapify-geocoder-autocomplete>
```

2. Filter by Circular Area:
```html
<geoapify-geocoder-autocomplete [filterByCircle]="{ lon: -73.935242, lat: 40.730610, radiusMeters: 10000 }"></geoapify-geocoder-autocomplete>
```

3. Filter by Rectangular Area:
```html
<geoapify-geocoder-autocomplete [filterByRect]="{ lon1: -74.259089, lat1: 40.477398, lon2: -73.700272, lat2: 40.917577 }"></geoapify-geocoder-autocomplete>
```

4. Bias by Country:
```html
<geoapify-geocoder-autocomplete [biasByCountryCode]="['US']"></geoapify-geocoder-autocomplete>
```

5. Bias by Proximity:
```html
<geoapify-geocoder-autocomplete [biasByProximity]="{ lon: -73.935242, lat: 40.730610 }"></geoapify-geocoder-autocomplete>
```

These examples demonstrate how to configure filters and bias to refine the autocomplete results according to your specific requirements. 

* You can apply multiple filters simultaneously, and the library applies *AND* logic to these filters.
* Similarly, you can utilize multiple bias parameters concurrently, with the library employing *OR* logic for these biases.

Here are the types and interfaces used to set filters and bias in the Angular component:

```javascript
export type ByCountryCodeOptions = CountryCode[];

export interface ByProximityOptions {
    lon: number;
    lat: number;
}

export interface ByCircleOptions {
    lon: number;
    lat: number;
    radiusMeters: number;
}

export interface ByRectOptions {
    lon1: number;
    lat1: number;
    lon2: number;
    lat2: number;
}

export type LocationType = 'country' | 'state' | 'city' | 'postcode' | 'street' | 'amenity';

export type SupportedLanguage = "ab" | "aa" | "af" | "ak" | "sq" | "am" | "ar" | "an" | "hy" | "as" | "av" | "ae" | "ay" | "az" | "bm" | "ba" | "eu" | "be" | "bn" | "bh" | "bi" | "bs" | "br" | "bg" | "my" | "ca" | "ch" | "ce" | "ny" | "zh" | "cv" | "kw" | "co" | "cr" | "hr" | "cs" | "da" | "dv" | "nl" | "en" | "eo" | "et" | "ee" | "fo" | "fj" | "fi" | "fr" | "ff" | "gl" | "ka" | "de" | "el" | "gn" | "gu" | "ht" | "ha" | "he" | "hz" | "hi" | "ho" | "hu" | "ia" | "id" | "ie" | "ga" | "ig" | "ik" | "io" | "is" | "it" | "iu" | "ja" | "jv" | "kl" | "kn" | "kr" | "ks" | "kk" | "km" | "ki" | "rw" | "ky" | "kv" | "kg" | "ko" | "ku" | "kj" | "la" | "lb" | "lg" | "li" | "ln" | "lo" | "lt" | "lu" | "lv" | "gv" | "mk" | "mg" | "ms" | "ml" | "mt" | "mi" | "mr" | "mh" | "mn" | "na" | "nv" | "nb" | "nd" | "ne" | "ng" | "nn" | "no" | "ii" | "nr" | "oc" | "oj" | "cu" | "om" | "or" | "os" | "pa" | "pi" | "fa" | "pl" | "ps" | "pt" | "qu" | "rm" | "rn" | "ro" | "ru" | "sa" | "sc" | "sd" | "se" | "sm" | "sg" | "sr" | "gd" | "sn" | "si" | "sk" | "sl" | "so" | "st" | "es" | "su" | "sw" | "ss" | "sv" | "ta" | "te" | "tg" | "th" | "ti" | "bo" | "tk" | "tl" | "tn" | "to" | "tr" | "ts" | "tt" | "tw" | "ty" | "ug" | "uk" | "ur" | "uz" | "ve" | "vi" | "vo" | "wa" | "cy" | "wo" | "fy" | "xh" | "yi" | "yo" | "za";

export type CountryCode = "none"| "auto" | "ad" | "ae" | "af" | "ag" | "ai" | "al" | "am" | "an" | "ao" | "ap" | "aq" | "ar" | "as" | "at" | "au" | "aw" | "az" | "ba" | "bb" | "bd" | "be" | "bf" | "bg" | "bh" | "bi" | "bj" | "bm" | "bn" | "bo" | "br" | "bs" | "bt" | "bv" | "bw" | "by" | "bz" | "ca" | "cc" | "cd" | "cf" | "cg" | "ch" | "ci" | "ck" | "cl" | "cm" | "cn" | "co" | "cr" | "cu" | "cv" | "cx" | "cy" | "cz" | "de" | "dj" | "dk" | "dm" | "do" | "dz" | "ec" | "ee" | "eg" | "eh" | "er" | "es" | "et" | "eu" | "fi" | "fj" | "fk" | "fm" | "fo" | "fr" | "ga" | "gb" | "gd" | "ge" | "gf" | "gh" | "gi" | "gl" | "gm" | "gn" | "gp" | "gq" | "gr" | "gs" | "gt" | "gu" | "gw" | "gy" | "hk" | "hm" | "hn" | "hr" | "ht" | "hu" | "id" | "ie" | "il" | "in" | "io" | "iq" | "ir" | "is" | "it" | "jm" | "jo" | "jp" | "ke" | "kg" | "kh" | "ki" | "km" | "kn" | "kp" | "kr" | "kw" | "ky" | "kz" | "la" | "lb" | "lc" | "li" | "lk" | "lr" | "ls" | "lt" | "lu" | "lv" | "ly" | "ma" | "mc" | "md" | "me" | "mg" | "mh" | "mk" | "ml" | "mm" | "mn" | "mo" | "mp" | "mq" | "mr" | "ms" | "mt" | "mu" | "mv" | "mw" | "mx" | "my" | "mz" | "na" | "nc" | "ne" | "nf" | "ng" | "ni" | "nl" | "no" | "np" | "nr" | "nu" | "nz" | "om" | "pa" | "pe" | "pf" | "pg" | "ph" | "pk" | "pl" | "pm" | "pr" | "ps" | "pt" | "pw" | "py" | "qa" | "re" | "ro" | "rs" | "ru" | "rw" | "sa" | "sb" | "sc" | "sd" | "se" | "sg" | "sh" | "si" | "sj" | "sk" | "sl" | "sm" | "sn" | "so" | "sr" | "st" | "sv" | "sy" | "sz" | "tc" | "td" | "tf" | "tg" | "th" | "tj" | "tk" | "tm" | "tn" | "to" | "tr" | "tt" | "tv" | "tw" | "tz" | "ua" | "ug" | "um" | "us" | "uy" | "uz" | "va" | "vc" | "ve" | "vg" | "vi" | "vn" | "vu" | "wf" | "ws" | "ye" | "yt" | "za" | "zm" | "zw";
```

To utilize these types and interfaces in your code, you can import them as follows:

```javascript
import { ByProximityOptions, LocationType, ... } from '@geoapify/geocoder-autocomplete';
```

### Example. Using Hooks

Here are examples of how to use hooks with the `@geoapify/angular-geocoder-autocomplete` Angular component:

```html
<geoapify-geocoder-autocomplete 
    [preprocessingHook]="preprocessingHook"
    [postprocessingHook]="postprocessingHook"
    [suggestionsFilter]="suggestionsFilter"
    ...>
</geoapify-geocoder-autocomplete>
```

```javascript
preprocessingHook(value: string) {
  return `${value}, ${this.postcode} ${this.city}`
}

postprocessingHook(feature: any) {
  return feature.properties.street;
}

suggestionsFilter(suggestions: any[]) {
  const processedStreets = [];

  const filtered = suggestions.filter(value => {
    if (!value.properties.street || processedStreets.indexOf(value.properties.street) >= 0) {
      return false;
    } else {
      processedStreets.push(value.properties.street);
      return true;
    }
  })

  return filtered;
}
```


### Example. Using Events

Here are examples of how to use the outputs provided by the `@geoapify/angular-geocoder-autocomplete` Angular component:

1. Handling Place Selection

You can listen to the `placeSelect` event to capture the selected place when a user selects an address from the autocomplete suggestions:

```html
<geoapify-geocoder-autocomplete (placeSelect)="onPlaceSelected($event)"></geoapify-geocoder-autocomplete>
```

In your component:

```typescript
onPlaceSelected(place: any): void {
  // Handle the selected place, which is a GeoJSON feature
  console.log('Selected Place:', place);
}
```

2. Reacting to Suggestions Change

The `suggestionsChange` event allows you to react whenever the suggestions list changes, such as when a user types or modifies their input:

```html
<geoapify-geocoder-autocomplete (suggestionsChange)="onSuggestionsChange($event)"></geoapify-geocoder-autocomplete>
```

In your component:

```typescript
onSuggestionsChange(suggestions: GeoJSON.Feature[]): void {
  // Handle the updated suggestions list
  console.log('Suggestions:', suggestions);
}
```

3. Capturing User Input

You can use the `userInput` event to capture user input as they type or interact with the autocomplete input:

```html
<geoapify-geocoder-autocomplete (userInput)="onUserInput($event)"></geoapify-geocoder-autocomplete>
```

In your component:

```typescript
onUserInput(input: string): void {
  // Capture and react to user input
  console.log('User Input:', input);
}
```

These examples illustrate how to utilize the component's output events to handle place selection, suggestions changes, and user input within your Angular application.

<h2 id="standalone-usage">Standalone Usage of Geocoder-Autocomplete in Angular</h2>

When considering the standalone usage of the `geocoder-autocomplete` library without a wrapper like `@geoapify/angular-geocoder-autocomplete`, it's important to note several advantages and characteristics:

1. **Zero Dependencies**: The `geocoder-autocomplete` library is intentionally designed to be lightweight and independent of external dependencies, including Angular. This means you won't introduce additional third-party dependencies into your project, ensuring that your application remains free from any potential compatibility issues or conflicts related to Angular version updates.

2. **Direct Control**: Using the library directly gives you more direct control over its behavior and integration within your Angular application. You can fine-tune and customize the library's features and configurations to suit your specific needs without relying on a wrapper's predefined settings.

3. **Flexibility**: By integrating the library without a wrapper, you have the flexibility to update and maintain it independently of Angular version changes. This can be particularly beneficial if you need to stay up-to-date with the latest Angular releases or if you have a specific version requirement for your project.

4. **Performance**: As the library has zero dependencies and is used directly, it may offer slightly better performance compared to using a wrapper. This can be advantageous for performance-sensitive applications.

Now, let's explore how to seamlessly integrate the geocoder-autocomplete library directly into your Angular project:
### 1: Create a Container Element

In your HTML template, add a container element (e.g., a `<div>`) with a `position: relative` style to serve as the host for the `geocoder-autocomplete` control. This container will determine the position of the autocomplete suggestions dropdown.

```html
<div #autocompleteContainer style="position: relative;">
  <!-- The geocoder-autocomplete control will be added here -->
</div>
```

### 2. Add the Control as a ViewChild

In your Angular component, import `ViewChild` from `@angular/core` and declare a `ViewChild` property to reference the container element from your template.

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent {
  @ViewChild('autocompleteContainer', { static: true }) autocompleteContainer!: ElementRef;
  
  // Other component code
}
```

Make sure to provide a template reference variable (`#autocompleteContainer`) in your HTML template to match the ViewChild property's name.

### 3. Create Geocoder-Autocomplete

In your component's TypeScript file, create an instance of `GeocoderAutocomplete` and initialize it using the container element you referenced in Step 2. You can also customize various options as needed.

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GeocoderAutocomplete, GeocoderAutocompleteOptions } from '@geoapify/geocoder-autocomplete';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent implements AfterViewInit {
  @ViewChild('autocompleteContainer', { static: true }) autocompleteContainer!: ElementRef;

  private geocoderAutocomplete!: GeocoderAutocomplete;

  ngAfterViewInit(): void {
    const container = this.autocompleteContainer.nativeElement;

    // Customize your Geocoder-Autocomplete options
    const options: GeocoderAutocompleteOptions = {
      // Add your options here
    };

    // Create an instance of Geocoder-Autocomplete
    this.geocoderAutocomplete = new GeocoderAutocomplete(container, options);
  }
  
  // Other component code
}
```

Ensure that you import the necessary classes and provide any customization options required for your project.

### 4: Add Styles to Your Angular Project

Don't forget to add the necessary CSS styles to your Angular project. You can include the `geocoder-autocomplete` styles by adding them to your Angular project's `angular.json` file or by importing them in your global CSS/SCSS file.

```json
"styles": [
  "node_modules/@geoapify/geocoder-autocomplete/styles/round-borders.css",
  "src/styles.css"
],
```

With these steps, you've successfully integrated the `geocoder-autocomplete` control directly into your Angular project, giving you full control over its functionality and appearance.

## Geoapify Geocoding API documentation
* [Geocoding API Documentation](https://apidocs.geoapify.com/docs/geocoding)
* [Place Details API Documentation](https://apidocs.geoapify.com/docs/place-details)
* [Geocoding API Playground](https://apidocs.geoapify.com/playground/geocoding)
* [Register and get Geoapify API key](https://myprojects.geoapify.com)
* [Geoapify APIs](https://www.geoapify.com/)
