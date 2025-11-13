# Quick Start

The Angular Geocoder Autocomplete component integrates the [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) library into Angular, enabling advanced address search powered by the [Geoapify Geocoding Autocomplete](https://www.geoapify.com/address-autocomplete/) service.

## Installation

The `@geoapify/angular-geocoder-autocomplete` package has a peer dependency on **@geoapify/geocoder-autocomplete**.  
Install both dependencies using either npm or yarn:

```bash
npm install @geoapify/geocoder-autocomplete @geoapify/angular-geocoder-autocomplete
# or
yarn add @geoapify/geocoder-autocomplete @geoapify/angular-geocoder-autocomplete

```

## Getting a Geoapify API Key

To use the component, you need a **Geoapify API key**.

1. Sign up at [myprojects.geoapify.com](https://myprojects.geoapify.com/) and create a project.
2. Copy your API key from the project dashboard.
3. Start with the **Free plan** (5 requests/sec) and upgrade as needed.
4. Store the key securely — for example, in `environment.ts`:

```typescript
export const environment = {
  production: false,
  geoapifyKey: 'YOUR_API_KEY'
};
```

## Integrating the Component into Your Angular Project

### 1. Importing into `AppModule`

To start using the Angular Geocoder Autocomplete component, import the `GeoapifyGeocoderAutocompleteModule` into your Angular application module and configure it with your API key.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Configure the Geoapify Geocoder Autocomplete module
    GeoapifyGeocoderAutocompleteModule.withConfig(environment.geoapifyKey)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 2. Importing Styles

The autocomplete control comes with prebuilt CSS themes from **@geoapify/geocoder-autocomplete**.
You can include these styles in your Angular project in one of two ways.

#### Option 1: Add to `angular.json` (recommended for Angular CLI)

```json
"styles": [
  "node_modules/@geoapify/geocoder-autocomplete/styles/round-borders.css",
  "src/styles.scss"
]
```

#### Option 2: Import in your global stylesheet

```css
@import "~@geoapify/geocoder-autocomplete/styles/minimal.css";
```

**Available themes:**

* `minimal` or `round-borders` — for light backgrounds
* `minimal-dark` or `round-borders-dark` — for dark backgrounds

You can also override styles using custom CSS variables or by extending Geoapify’s base classes.

### 3. Using the component in a template

Basic usage:

```html
<geoapify-geocoder-autocomplete></geoapify-geocoder-autocomplete>
```

Listen to key events:

```html
<geoapify-geocoder-autocomplete
  (placeSelect)="onPlaceSelected($event)"
  (suggestionsChange)="onSuggestionsChange($event)"
  (userInput)="onUserInput($event)">
</geoapify-geocoder-autocomplete>
```

Configure common options:

```html
<geoapify-geocoder-autocomplete
  [lang]="'en'"
  [limit]="10"
  [filterByCountryCode]="['us', 'ca']"
  [biasByProximity]="{ lon: -73.935242, lat: 40.73061 }"
  [addDetails]="true">
</geoapify-geocoder-autocomplete>
```

Example handlers (component.ts):

```ts
onPlaceSelected(place: any) { /* use selected GeoJSON feature */ }
onSuggestionsChange(list: any[]) { /* react to updated list */ }
onUserInput(value: string) { /* track user input */ }
```

### Next Steps

Now that you’ve added the component and verified it works, you can:

1. **Explore configuration options**
   Learn more about all available inputs and outputs in the [API Reference](api-reference.md).

2. **See working code examples**
   Check [Examples](examples.md) for common setups, like filtered searches, localized results, and custom styling.

3. **Use it without Angular dependency**
   If you prefer direct integration of the core JavaScript library, follow the [Standalone Usage](standalone-usage.md) guide.

4. **Read about Geoapify APIs**
   Understand how the component interacts with the backend:

   * [Geocoding API](https://apidocs.geoapify.com/docs/geocoding)
   * [Places API](https://apidocs.geoapify.com/docs/places)
   * [Geoapify Playground](https://apidocs.geoapify.com/playground/geocoding)