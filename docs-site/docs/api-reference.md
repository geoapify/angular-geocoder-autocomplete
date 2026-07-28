# API Reference

The Angular Geocoder Autocomplete component exposes several **inputs** and **outputs** that control how address suggestions are fetched, filtered, and displayed.

## Inputs and Outputs

| Name                          | Type                                                 | Direction | Description                                                      |
| ----------------------------- | ---------------------------------------------------- | --------- | ---------------------------------------------------------------- |
| `value`                       | `string`                                             | Input     | Current value of the input field.                                |
| `placeholder`                 | `string`                                             | Input     | Text shown when the input is empty.                              |
| `type`                        | `LocationType`                                       | Input     | Type of place to search for (`country`, `city`, `street`, etc.). |
| `lang`                        | `SupportedLanguage`                                  | Input     | Language of suggestions and results.                             |
| `limit`                       | `number`                                             | Input     | Max number of suggestions to show.                               |
| `debounceDelay`               | `number`                                             | Input     | Delay (ms) before sending requests after typing.                 |
| `filterByCountryCode`         | `ByCountryCodeOptions`                               | Input     | Restrict results to selected countries.                          |
| `filterByCircle`              | `ByCircleOptions`                                    | Input     | Limit search within a circular area.                             |
| `filterByRect`                | `ByRectOptions`                                      | Input     | Limit search within a rectangle.                                 |
| `biasByProximity`             | `ByProximityOptions`                                 | Input     | Prioritize results near a given point.                           |
| `biasByCountryCode`           | `ByCountryCodeOptions`                               | Input     | Prioritize results from certain countries.                       |
| `biasByCircle`                | `ByCircleOptions`                                    | Input     | Bias results within a circle.                                    |
| `biasByRect`                  | `ByRectOptions`                                      | Input     | Bias results within a rectangle.                                 |
| `skipIcons`                   | `boolean`                                            | Input     | Hide icons in the suggestions list.                              |
| `addDetails`                  | `boolean`                                            | Input     | Include detailed place info in results.                          |
| `allowNonVerifiedHouseNumber` | `boolean`                                            | Input     | Allow house numbers not verified in data.                        |
| `allowNonVerifiedStreet`      | `boolean`                                            | Input     | Allow street names not verified in data.                         |
| `skipSelectionOnArrowKey`     | `boolean`                                            | Input     | Disable auto-select with arrow keys.                             |
| `addCategorySearch`           | `boolean`                                            | Input     | Enable category-based (POI) search.                              |
| `showPlacesByCategoryList`              | `boolean`                                            | Input     | Display POI list under the field.                                |
| `hidePlacesByCategoryListAfterSelect`   | `boolean`                                            | Input     | Hide POI list after selection.                                   |
| `enablePlacesByCategoryLazyLoading`     | `boolean`                                            | Input     | Load additional POI items dynamically.                           |
| `placesByCategoryLimit`                 | `number`                                             | Input     | Max number of POIs to display.                                   |
| `placesByCategoryFilter`                | `object`                                             | Input     | Filters for category-based search.                               |
| `placesByCategoryBias`                  | `object`                                             | Input     | Bias rules for category-based search.                            |
| `preprocessingHook`           | `(value: string) => string`                          | Input     | Modify input before request.                                     |
| `postprocessingHook`          | `(feature: GeoJSON.Feature) => string`               | Input     | Modify selected result before display.                           |
| `suggestionsFilter`           | `(features: GeoJSON.Feature[]) => GeoJSON.Feature[]` | Input     | Filter suggestions before display.                               |
| `sendGeocoderRequestFunc`     | `(value, autocomplete) => Promise<any>`               | Input     | Replace the default geocoding request implementation.            |
| `sendPlaceDetailsRequestFunc` | `(feature, autocomplete) => Promise<any>`             | Input     | Replace the default place-details request implementation.        |
| `sendPlacesByCategoryRequestFunc` | `(categories, offset, autocomplete) => Promise<any>` | Input | Replace the default category/Places request implementation.      |
| `countryCodes`                | `CountyCode[]`                                        | Input     | Deprecated; use `filterByCountryCode`.                           |
| `position`                    | `GeoPosition`                                         | Input     | Deprecated; use `biasByProximity`.                               |
| `placeSelect`                 | `EventEmitter<GeoJSON.Feature>`                      | Output    | Fires when a user selects a place.                               |
| `suggestionsChange`           | `EventEmitter<GeoJSON.Feature[]>`                    | Output    | Fires when suggestions are updated.                              |
| `userInput`                   | `EventEmitter<string>`                               | Output    | Fires on user input changes.                                     |
| `open`                        | `EventEmitter<boolean>`                              | Output    | Fires when the dropdown opens.                                   |
| `close`                       | `EventEmitter<boolean>`                              | Output    | Fires when the dropdown closes.                                  |
| `requestStart`                | `EventEmitter<string>`                               | Output    | Emits the query when a geocoding request starts.                 |
| `requestEnd`                  | `EventEmitter<{success, data?, error?}>`             | Output    | Emits the result when a geocoding request completes.             |
| `placesByCategoryChange`                      | `EventEmitter<any[]>`                                | Output    | Emits POI results when category search is active.                |
| `placesByCategoryRequestStart`          | `EventEmitter<Category>`                             | Output    | Emits the selected category when a POI request starts.           |
| `placesByCategoryRequestEnd`            | `EventEmitter<{success, data?, error?}>`             | Output    | Emits the result when a POI request ends.                        |
| `placeDetailsRequestStart`    | `EventEmitter<GeoJSON.Feature>`                      | Output    | Emits the place when a place-details request starts.             |
| `placeDetailsRequestEnd`      | `EventEmitter<{success, data?, error?}>`             | Output    | Emits the result when a place-details request ends.              |
| `placeByCategorySelect`            | `EventEmitter<{place: any, index: number}>`          | Output    | Fires when a POI is selected from the list.                      |
| `clear`                       | `EventEmitter<ItemType>`                             | Output    | Emits `address` or `category` when that selection is cleared.    |

> **Upgrading from 3.0.1:** In 3.1.x, `requestEnd`, `placesByCategoryRequestEnd`, and `placeDetailsRequestEnd` emit `{ success, data, error }`. `placeByCategorySelect` emits `{ place, index }`. Event handlers that previously consumed a boolean or place directly must read the corresponding property from the new event object.

Each input property allows you to control how the autocomplete behaves and appears.
Inputs can be bound to Angular component variables, enabling dynamic updates and reactive configurations.

Below are examples showing how to define these properties in your component and use them in templates.

### `value` (Input)

**Type:** `string`
**Description:** Sets or retrieves the current value of the autocomplete input field.
Can be bound to a component property for dynamic updates.

**Example:**

```html
<geoapify-geocoder-autocomplete [value]="address"></geoapify-geocoder-autocomplete>
```

```typescript
address = 'New York, USA';
```


### `placeholder` (Input)

**Type:** `string`
**Description:** Text shown when the field is empty.
Commonly used to hint at what users can type.

**Example:**

```html
<geoapify-geocoder-autocomplete [placeholder]="placeholderText"></geoapify-geocoder-autocomplete>
```

```typescript
placeholderText = 'Search for a location';
```

### `type` (Input)

**Type:** `LocationType`
**Description:** Defines the type of place to search for — such as `'country'`, `'city'`, `'postcode'`, `'street'`, or `'amenity'`.

**Example:**

```html
<geoapify-geocoder-autocomplete [type]="locationType"></geoapify-geocoder-autocomplete>
```

```typescript
locationType: 'country' | 'city' | 'postcode' | 'street' | 'amenity' = 'city';
```

### `lang` (Input)

**Type:** `SupportedLanguage`
**Description:** Language code used for displaying suggestions and results.
Supports ISO 639-1 codes like `'en'`, `'de'`, `'fr'`, `'es'`.

**Example:**

```html
<geoapify-geocoder-autocomplete [lang]="language"></geoapify-geocoder-autocomplete>
```

```typescript
language = 'fr'; // French
```


### `limit` (Input)

**Type:** `number`
**Description:** Maximum number of suggestions to display in the dropdown.

**Example:**

```html
<geoapify-geocoder-autocomplete [limit]="maxSuggestions"></geoapify-geocoder-autocomplete>
```

```typescript
maxSuggestions = 5;
```


### `debounceDelay` (Input)

**Type:** `number`
**Description:** Time in milliseconds to wait after user input before triggering a new API request.
Helps prevent excessive requests during fast typing.

**Example:**

```html
<geoapify-geocoder-autocomplete [debounceDelay]="debounceTime"></geoapify-geocoder-autocomplete>
```

```typescript
debounceTime = 400;
```

### `filterByCountryCode` (Input)

**Type:** `ByCountryCodeOptions`
**Description:** Restricts suggestions to specific country codes (ISO 3166-1 alpha-2).

**Example:**

```html
<geoapify-geocoder-autocomplete [filterByCountryCode]="allowedCountries"></geoapify-geocoder-autocomplete>
```

```typescript
allowedCountries = ['US', 'CA']; // Only show addresses in the US and Canada
```


### `filterByCircle` (Input)

**Type:** `ByCircleOptions`
**Description:** Limits search results to a circular area around a specific coordinate.

**Example:**

```html
<geoapify-geocoder-autocomplete [filterByCircle]="cityCenterFilter"></geoapify-geocoder-autocomplete>
```

```typescript
cityCenterFilter = {
  lon: -73.935242,
  lat: 40.73061,
  radiusMeters: 10000 // 10 km radius
};
```


### `filterByRect` (Input)

**Type:** `ByRectOptions`
**Description:** Restricts results to a rectangular bounding box defined by two corner coordinates.

**Example:**

```html
<geoapify-geocoder-autocomplete [filterByRect]="nycBoundingBox"></geoapify-geocoder-autocomplete>
```

```typescript
nycBoundingBox = {
  lon1: -74.25909,
  lat1: 40.4774,
  lon2: -73.70027,
  lat2: 40.91758
};
```


### `biasByProximity` (Input)

**Type:** `ByProximityOptions`
**Description:** Prioritizes suggestions that are geographically closer to a given point.

**Example:**

```html
<geoapify-geocoder-autocomplete [biasByProximity]="userLocation"></geoapify-geocoder-autocomplete>
```

```typescript
userLocation = { lon: -73.935242, lat: 40.73061 };
```


### `biasByCountryCode` (Input)

**Type:** `ByCountryCodeOptions`
**Description:** Suggests results from specific countries first, while still including others.

**Example:**

```html
<geoapify-geocoder-autocomplete [biasByCountryCode]="preferredCountries"></geoapify-geocoder-autocomplete>
```

```typescript
preferredCountries = ['us'];
```


### `biasByCircle` (Input)

**Type:** `ByCircleOptions`
**Description:** Prefers results inside a given circle but still shows matches from other areas.

**Example:**

```html
<geoapify-geocoder-autocomplete [biasByCircle]="focusArea"></geoapify-geocoder-autocomplete>
```

```typescript
focusArea = {
  lon: -73.935242,
  lat: 40.73061,
  radiusMeters: 5000
};
```


### `biasByRect` (Input)

**Type:** `ByRectOptions`
**Description:** Prioritizes results from within a rectangular area.

**Example:**

```html
<geoapify-geocoder-autocomplete [biasByRect]="preferredRegion"></geoapify-geocoder-autocomplete>
```

```typescript
preferredRegion = {
  lon1: -74.05,
  lat1: 40.68,
  lon2: -73.85,
  lat2: 40.85
};
```

### `skipIcons` (Input)

**Type:** `boolean`
**Description:** Hides category and location icons in suggestion items. Useful for minimal or custom UI designs.

**Example:**

```html
<geoapify-geocoder-autocomplete [skipIcons]="true"></geoapify-geocoder-autocomplete>
```

### `addDetails` (Input)

**Type:** `boolean`
**Description:** When `true`, includes detailed place information (e.g., `formatted`, `country`, `postcode`) in search results.

**Example:**

```html
<geoapify-geocoder-autocomplete [addDetails]="includeDetails"></geoapify-geocoder-autocomplete>
```

```typescript
includeDetails = true;
```

### `allowNonVerifiedHouseNumber` (Input)

**Type:** `boolean`
**Description:** Allows users to enter and select house numbers not verified in the Geoapify database.

**Example:**

```html
<geoapify-geocoder-autocomplete [allowNonVerifiedHouseNumber]="true"></geoapify-geocoder-autocomplete>
```

### `allowNonVerifiedStreet` (Input)

**Type:** `boolean`
**Description:** Permits users to enter unverified or incomplete street names.

**Example:**

```html
<geoapify-geocoder-autocomplete [allowNonVerifiedStreet]="true"></geoapify-geocoder-autocomplete>
```

### `skipSelectionOnArrowKey` (Input)

**Type:** `boolean`
**Description:** Prevents automatic selection when navigating suggestions with arrow keys.
Useful if you want users to confirm a selection manually with *Enter*.

**Example:**

```html
<geoapify-geocoder-autocomplete [skipSelectionOnArrowKey]="false"></geoapify-geocoder-autocomplete>
```

### `addCategorySearch` (Input)

**Type:** `boolean`
**Description:** Enables **category-based search** (Points of Interest) using the Geoapify Places API.
When active, users can type categories like “restaurant”, “hotel”, or “park”.

**Example:**

```html
<geoapify-geocoder-autocomplete [addCategorySearch]="true"></geoapify-geocoder-autocomplete>
```

### `showPlacesByCategoryList` (Input)

**Type:** `boolean`
**Description:** Displays a list of matching POIs under the input field when category search is enabled.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  [showPlacesByCategoryList]="true">
</geoapify-geocoder-autocomplete>
```

### `hidePlacesByCategoryListAfterSelect` (Input)

**Type:** `boolean`
**Description:** Automatically hides the POI list once a place is selected, creating a cleaner user experience.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  [showPlacesByCategoryList]="true"
  [hidePlacesByCategoryListAfterSelect]="true">
</geoapify-geocoder-autocomplete>
```

### `enablePlacesByCategoryLazyLoading` (Input)

**Type:** `boolean`
**Description:** Loads more POI results dynamically as the user scrolls or requests additional data.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  [showPlacesByCategoryList]="true"
  [enablePlacesByCategoryLazyLoading]="true">
</geoapify-geocoder-autocomplete>
```

### `placesByCategoryLimit` (Input)

**Type:** `number`
**Description:** Maximum number of places (POIs) displayed when category search is enabled.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  [placesByCategoryLimit]="maxPlaces">
</geoapify-geocoder-autocomplete>
```

```typescript
maxPlaces = 10;
```

### `placesByCategoryFilter` (Input)

**Type:** `object`
**Description:** Defines spatial filters for category-based searches. Supported keys include `circle`, `rect`, `place`, and `geometry`.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  [placesByCategoryFilter]="placesByCategoryFilter">
</geoapify-geocoder-autocomplete>
```

```typescript
placesByCategoryFilter = {
  circle: { lon: -73.935242, lat: 40.73061, radiusMeters: 5000 }
};
```

### `placesByCategoryBias` (Input)

**Type:** `object`
**Description:** Adds bias rules for category-based search, prioritizing results in certain areas.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  [placesByCategoryBias]="placesByCategoryBias">
</geoapify-geocoder-autocomplete>
```

```typescript
placesByCategoryBias = {
  proximity: { lon: -73.935242, lat: 40.73061 }
};
```

### `preprocessingHook` (Input)

**Type:** `(value: string) => string`
**Description:** A function that modifies user input before sending the geocoding request.
Useful for appending contextual data or standardizing input.

**Example:**

```html
<geoapify-geocoder-autocomplete [preprocessingHook]="preprocessInput"></geoapify-geocoder-autocomplete>
```

```typescript
preprocessInput = (value: string) => `${value}, New York, USA`;
```

### `postprocessingHook` (Input)

**Type:** `(feature: GeoJSON.Feature) => string`
**Description:** A function that processes or reformats the selected place before it’s displayed in the input field.

**Example:**

```html
<geoapify-geocoder-autocomplete [postprocessingHook]="formatResult"></geoapify-geocoder-autocomplete>
```

```typescript
formatResult = (feature: any) => `${feature.properties.street}, ${feature.properties.city}`;
```

### `suggestionsFilter` (Input)

**Type:** `(features: GeoJSON.Feature[]) => GeoJSON.Feature[]`
**Description:** Filters or modifies the suggestion list before display.
Can be used to remove duplicates or limit certain results.

**Example:**

```html
<geoapify-geocoder-autocomplete [suggestionsFilter]="filterSuggestions"></geoapify-geocoder-autocomplete>
```

```typescript
filterSuggestions = (features: any[]) => {
  const unique = new Map();
  return features.filter(f => {
    const street = f.properties.street;
    if (unique.has(street)) return false;
    unique.set(street, true);
    return true;
  });
};
```

### `sendGeocoderRequestFunc` (Input)

**Type:** `(value: string, autocomplete: GeocoderAutocomplete) => Promise<any>`
**Description:** Replaces the default Address Autocomplete API request. The promise must resolve to a GeoJSON feature collection.

```typescript
sendGeocoderRequest = async (value: string) => {
  return this.myGeocoder.search(value);
};
```

### `sendPlaceDetailsRequestFunc` (Input)

**Type:** `(feature: GeoJSON.Feature, autocomplete: GeocoderAutocomplete) => Promise<any>`
**Description:** Replaces the default place-details request. The promise must resolve to the selected feature with any required details.

### `sendPlacesByCategoryRequestFunc` (Input)

**Type:** `(categories: string[], offset: number, autocomplete: GeocoderAutocomplete) => Promise<any>`
**Description:** Replaces the default Places API request used by category search. The promise must resolve to a GeoJSON feature collection.

### `countryCodes` (Deprecated Input)

**Type:** `CountyCode[]`
**Description:** Deprecated alias for `filterByCountryCode`. Use `[filterByCountryCode]="['us', 'ca']"` instead.

### `position` (Deprecated Input)

**Type:** `GeoPosition`
**Description:** Deprecated proximity bias. Use `[biasByProximity]="{ lon: -73.935242, lat: 40.73061 }"` instead.

### `placeSelect` (Output)

**Type:** `EventEmitter<GeoJSON.Feature>`
**Description:** Triggered when a user selects a place from the autocomplete suggestions.

**Example:**

```html
<geoapify-geocoder-autocomplete (placeSelect)="onPlaceSelected($event)"></geoapify-geocoder-autocomplete>
```

```typescript
onPlaceSelected(place: GeoJSON.Feature) {
  console.log('Selected place:', place.properties.formatted);
}
```

### `suggestionsChange` (Output)

**Type:** `EventEmitter<GeoJSON.Feature[]>`
**Description:** Fired whenever the list of suggestions changes, for example, when the user types or modifies input.

**Example:**

```html
<geoapify-geocoder-autocomplete (suggestionsChange)="onSuggestionsChange($event)"></geoapify-geocoder-autocomplete>
```

```typescript
onSuggestionsChange(suggestions: GeoJSON.Feature[]) {
  console.log('Updated suggestions:', suggestions);
}
```

### `userInput` (Output)

**Type:** `EventEmitter<string>`
**Description:** Emits every time the user types or modifies text in the input field.

**Example:**

```html
<geoapify-geocoder-autocomplete (userInput)="onUserInput($event)"></geoapify-geocoder-autocomplete>
```

```typescript
onUserInput(value: string) {
  console.log('User input:', value);
}
```

### `open` (Output)

**Type:** `EventEmitter<boolean>`
**Description:** Fired when the suggestions dropdown opens.
You can use this to apply styles or track UI state.

**Example:**

```html
<geoapify-geocoder-autocomplete (open)="onDropdownOpen($event)"></geoapify-geocoder-autocomplete>
```

```typescript
onDropdownOpen(isOpen: boolean) {
  console.log('Dropdown opened:', isOpen);
}
```

### `close` (Output)

**Type:** `EventEmitter<boolean>`
**Description:** Fired when the suggestions dropdown closes.

**Example:**

```html
<geoapify-geocoder-autocomplete (close)="onDropdownClose($event)"></geoapify-geocoder-autocomplete>
```

```typescript
onDropdownClose(isClosed: boolean) {
  console.log('Dropdown closed:', isClosed);
}
```

### `requestStart` (Output)

**Type:** `EventEmitter<string>`
**Description:** Emits the query when a geocoding request begins (after the debounce delay).
Useful for showing loading indicators.

**Example:**

```html
<geoapify-geocoder-autocomplete (requestStart)="onRequestStart($event)"></geoapify-geocoder-autocomplete>
```

```typescript
onRequestStart(query: string) {
  this.loading = true;
  console.log('Searching for:', query);
}
```

### `requestEnd` (Output)

**Type:** `EventEmitter<{ success: boolean, data?: any, error?: any }>`
**Description:** Emits the result when a geocoding request finishes.

**Example:**

```html
<geoapify-geocoder-autocomplete (requestEnd)="onRequestEnd($event)"></geoapify-geocoder-autocomplete>
```

```typescript
onRequestEnd(event: { success: boolean, data?: any, error?: any }) {
  this.loading = false;
  console.log('Request successful:', event.success);
}
```

### `placesByCategoryChange` (Output)

**Type:** `EventEmitter<any[]>`
**Description:** Emits a list of POI (Places of Interest) results when category search is active.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  (placesByCategoryChange)="onPlacesLoaded($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onPlacesLoaded(places: any[]) {
  console.log('Loaded places:', places);
}
```

### `placesByCategoryRequestStart` (Output)

**Type:** `EventEmitter<Category>`
**Description:** Emits the selected category when a Places API request starts.
Useful for showing a loading spinner while fetching nearby POIs.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  (placesByCategoryRequestStart)="onPlacesLoadingStart($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onPlacesLoadingStart(category: Category) {
  this.isPlacesLoading = true;
  console.log('Loading category:', category.label);
}
```

### `placesByCategoryRequestEnd` (Output)

**Type:** `EventEmitter<{ success: boolean, data?: any, error?: any }>`
**Description:** Emits the result when a Places API request completes.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  (placesByCategoryRequestEnd)="onPlacesLoadingEnd($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onPlacesLoadingEnd(event: { success: boolean, data?: any, error?: any }) {
  this.isPlacesLoading = false;
  console.log('Places request finished successfully:', event.success);
}
```

### `placeDetailsRequestStart` (Output)

**Type:** `EventEmitter<GeoJSON.Feature>`
**Description:** Emits the selected place when a **place details** request begins.

**Example:**

```html
<geoapify-geocoder-autocomplete
  (placeDetailsRequestStart)="onDetailsRequestStart($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onDetailsRequestStart(place: GeoJSON.Feature) {
  this.isLoadingDetails = true;
  console.log('Loading details for:', place);
}
```

### `placeDetailsRequestEnd` (Output)

**Type:** `EventEmitter<{ success: boolean, data?: any, error?: any }>`
**Description:** Emits the result when a **place details** request completes.

**Example:**

```html
<geoapify-geocoder-autocomplete
  (placeDetailsRequestEnd)="onDetailsRequestEnd($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onDetailsRequestEnd(event: { success: boolean, data?: any, error?: any }) {
  this.isLoadingDetails = false;
  console.log('Details request success:', event.success);
}
```

### `placeByCategorySelect` (Output)

**Type:** `EventEmitter<{ place: any, index: number }>`
**Description:** Fired when a POI is selected from the **places list** (not from the address suggestions).
Provides both the selected place and its index in the list.

**Example:**

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  (placeByCategorySelect)="onPlaceFromListSelected($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onPlaceFromListSelected(event: { place: any, index: number }) {
  console.log('Selected POI:', event.place, 'at index', event.index);
}
```

### `clear` (Output)

**Type:** `EventEmitter<ItemType>`
**Description:** Emits `'address'` or `'category'` when that selection is cleared by the user.

**Example:**

```html
<geoapify-geocoder-autocomplete (clear)="onCleared($event)"></geoapify-geocoder-autocomplete>
```

```typescript
onCleared(itemType: ItemType) {
  console.log('Cleared:', itemType);
}
```

## Learn More

You’ve now explored all available inputs and outputs of the Angular Geocoder Autocomplete component.
Continue with the following guides to see how to apply them in real projects:

* [Quick Start](quick-start.md) – set up the component in your Angular app.
* [Examples](examples.md) – explore common use cases and live configurations.
* [Standalone Usage](standalone-usage.md) – learn how to use the underlying JavaScript library without Angular.
* [Geoapify Geocoding API Docs](https://apidocs.geoapify.com/docs/geocoding) – discover the full range of address and place search features available through the API.
