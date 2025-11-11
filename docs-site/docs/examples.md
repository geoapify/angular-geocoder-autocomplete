# Examples

This section provides practical examples of how to use the Angular Geocoder Autocomplete component with various configuration options and event handlers.

## Using Filters and Bias

Here are a few examples of how to set filters and bias using the `@geoapify/angular-geocoder-autocomplete` Angular component:

### 1. Filter by Country Code:
```html
<geoapify-geocoder-autocomplete [filterByCountryCode]="['US', 'CA']"></geoapify-geocoder-autocomplete>
```

### 2. Filter by Circular Area:
```html
<geoapify-geocoder-autocomplete [filterByCircle]="{ lon: -73.935242, lat: 40.730610, radiusMeters: 10000 }"></geoapify-geocoder-autocomplete>
```

### 3. Filter by Rectangular Area:
```html
<geoapify-geocoder-autocomplete [filterByRect]="{ lon1: -74.259089, lat1: 40.477398, lon2: -73.700272, lat2: 40.917577 }"></geoapify-geocoder-autocomplete>
```

### 4. Bias by Country:
```html
<geoapify-geocoder-autocomplete [biasByCountryCode]="['US']"></geoapify-geocoder-autocomplete>
```

### 5. Bias by Proximity:
```html
<geoapify-geocoder-autocomplete [biasByProximity]="{ lon: -73.935242, lat: 40.730610 }"></geoapify-geocoder-autocomplete>
```

These examples demonstrate how to configure filters and bias to refine the autocomplete results according to your specific requirements. 

* You can apply multiple filters simultaneously, and the library applies *AND* logic to these filters.
* Similarly, you can utilize multiple bias parameters concurrently, with the library employing *OR* logic for these biases.

## Using Hooks

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

## Using Events

Here are examples of how to use the outputs provided by the `@geoapify/angular-geocoder-autocomplete` Angular component:

### 1. Handling Place Selection

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

### 2. Reacting to Suggestions Change

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

### 3. Capturing User Input

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

## Category Search Examples (V3)

Version 3.0 introduces powerful category search capabilities. Here are examples showing how to use these new features:

### 1. Basic Category Search

Enable category search for POIs like restaurants, hotels, gas stations:

```html
<geoapify-geocoder-autocomplete 
    [addCategorySearch]="true"
    (places)="onPlacesChanged($event)"
    (placeSelectEvent)="onPlaceSelected($event)">
</geoapify-geocoder-autocomplete>
```

### 2. Category Search with Built-in Places List

Display places automatically in a list below the input:

```html
<geoapify-geocoder-autocomplete 
    [addCategorySearch]="true"
    [showPlacesList]="true"
    [enablePlacesLazyLoading]="true"
    [placesLimit]="10"
    [hidePlacesListAfterSelect]="true"
    (placesRequestStart)="onPlacesRequestStart($event)"
    (placesRequestEnd)="onPlacesRequestEnd($event)">
</geoapify-geocoder-autocomplete>
```

### 3. Advanced Category Search with Filtering

Configure places search with filters and bias:

```html
<geoapify-geocoder-autocomplete 
    [addCategorySearch]="true"
    [showPlacesList]="true"
    [placesLimit]="15"
    [placesFilter]="placesFilter"
    [placesBias]="placesBias"
    (places)="handlePlaces($event)"
    (placeDetailsRequestStart)="onPlaceDetailsStart($event)"
    (placeDetailsRequestEnd)="onPlaceDetailsEnd($event)">
</geoapify-geocoder-autocomplete>
```

### 4. Handling Request Events

Monitor the status of geocoding and places requests:

```html
<geoapify-geocoder-autocomplete 
    [addCategorySearch]="true"
    (requestStart)="onGeocodingStart($event)"
    (requestEnd)="onGeocodingEnd($event)"
    (clear)="onClear($event)">
</geoapify-geocoder-autocomplete>
```


These V3 examples demonstrate the new category search capabilities, enabling you to build rich location-based experiences with POI discovery alongside traditional address autocomplete.
