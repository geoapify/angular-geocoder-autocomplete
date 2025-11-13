# Examples

This section shows practical examples of using the `<geoapify-geocoder-autocomplete>` component in different configurations.
Each snippet demonstrates how to combine inputs and outputs to create flexible address search fields for your Angular app.

## Simple Address Input Field

A minimal setup that displays an address input and listens for place selection events.

```html
<geoapify-geocoder-autocomplete
  placeholder="Search for an address"
  (placeSelect)="onPlaceSelected($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onPlaceSelected(place: any) {
  console.log('Selected place:', place.properties.formatted);
}
```
**Used properties:**

* `placeholder` – displays hint text inside the input field.
* `placeSelect` – event emitted when a user selects a place from the suggestions.


## Search for Cities in a country

This setup limits suggestions to US cities and requests additional place details, such as boundaries when available.

```html
<geoapify-geocoder-autocomplete
  [type]="'city'"
  [filterByCountryCode]="['us']"
  [addDetails]="true"
  placeholder="Search for a city in the US"
  (placeSelect)="onCitySelected($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onCitySelected(place: any) {
  console.log('City:', place.properties.city);
  console.log('Boundary:', place.properties.bounds);
}
```

**Used properties:**

* `type="city"` – restricts suggestions to cities only.
* `filterByCountryCode="['us']"` – limits results to the United States.
* `addDetails="true"` – requests extended details, including geometry data like city boundaries.
* `placeSelect` – event triggered when a city is selected.


## Bias Results Using User Location

This example uses the browser’s geolocation API to detect the user’s position and bias autocomplete suggestions toward nearby results.

```html
<geoapify-geocoder-autocomplete
  placeholder="Search nearby places"
  [biasByProximity]="userLocation"
  (placeSelect)="onPlaceSelected($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
userLocation: { lon: number; lat: number } | null = null;

ngOnInit() {
  navigator.geolocation.getCurrentPosition((pos) => {
    this.userLocation = {
      lon: pos.coords.longitude,
      lat: pos.coords.latitude
    };
  });
}

onPlaceSelected(place: any) {
  console.log('Selected place:', place.properties.formatted);
}
```

**Used properties:**

* `biasByProximity` – prioritizes results near the provided coordinates.
* `placeholder` – displays guidance text inside the input field.
* `placeSelect` – emits the selected place once a suggestion is chosen.

## Showing a Loading Indicator During Search

This example displays a simple loading spinner while the autocomplete sends a request and hides it once the results are received.

```html
<div class="autocomplete-wrapper">
  <geoapify-geocoder-autocomplete
    placeholder="Search for an address"
    (requestStart)="isLoading = true"
    (requestEnd)="isLoading = false"
    (placeSelect)="onPlaceSelected($event)">
  </geoapify-geocoder-autocomplete>

  <div *ngIf="isLoading" class="loader">Loading...</div>
</div>
```

```typescript
isLoading = false;

onPlaceSelected(place: any) {
  console.log('Selected place:', place.properties.formatted);
}
```

**Used properties:**

* `requestStart` – fires when a geocoding request starts.
* `requestEnd` – fires when the request completes (success or failure).
* `placeSelect` – emits the selected place from suggestions.
* `placeholder` – text displayed inside the input field.


## Searching for Places by Category

This example enables category-based (POI) search using the Geoapify Places API.
Users can type categories like *restaurant*, *hotel*, or *pharmacy* to find nearby points of interest.

```html
<geoapify-geocoder-autocomplete
  [addCategorySearch]="true"
  [showPlacesByCategoryList]="true"
  [enablePlacesByCategoryLazyLoading]="true"
  [placesByCategoryLimit]="10"
  placeholder="Search for restaurants, hotels, or shops"
  (placesByCategoryChange)="onPlacesLoaded($event)"
  (placeSelect)="onPlaceSelected($event)"
  (placeByCategorySelect)="onPlaceFromListSelected($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
onPlacesLoaded(places: any[]) {
  console.log('Loaded POIs:', places);
}

onPlaceSelected(place: any) {
  console.log('Selected address:', place.properties.formatted);
}

onPlaceFromListSelected(event: { place: any; index: number }) {
  console.log('Selected POI:', event.place.properties.name);
}
```

**Used properties:**

* `addCategorySearch` – enables category-based POI search.
* `showPlacesByCategoryList` – displays a list of nearby POIs below the input field.
* `enablePlacesByCategoryLazyLoading` – dynamically loads additional POIs as the user scrolls.
* `placesByCategoryLimit` – sets the maximum number of POIs to display.
* `placesByCategoryChange` – emits when POIs are loaded from the Places API.
* `placeSelect` – emits when a user selects an address suggestion.
* `placeByCategorySelect` – emits when a POI is selected from the list.
* `placeholder` – shows guidance text inside the input field.

## Preprocessing User Input with Filter by Area

This example shows how to combine `preprocessingHook` with `filterByRect` to focus searches on a specific region — in this case, **Berlin**.
The hook appends “Berlin” to each query, while the bounding box filter limits results to the city’s area.

```html
<geoapify-geocoder-autocomplete
  placeholder="Search for an address in Berlin"
  [preprocessingHook]="addCityToQuery"
  [filterByRect]="berlinBbox"
  (placeSelect)="onPlaceSelected($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
// Approximate bounding box for Berlin
berlinBbox = {
  lon1: 13.0884,  // west
  lat1: 52.3383,  // south
  lon2: 13.7611,  // east
  lat2: 52.6755   // north
};

addCityToQuery(value: string): string {
  // Ensure the city name is always part of the query
  return `${value}, Berlin`;
}

onPlaceSelected(place: any) {
  console.log('Selected place:', place.properties.formatted);
}
```

**Used properties:**

* `preprocessingHook` – appends “Berlin” to user queries.
* `filterByRect` – restricts results to Berlin’s geographic area.
* `placeholder` – displays hint text inside the input field.
* `placeSelect` – fires when a user selects a search result.


## Filtering Suggestions Programmatically

Use `suggestionsFilter` to modify the suggestion list before it’s displayed.
This example removes duplicates by street name and excludes results without a house number.

```html
<geoapify-geocoder-autocomplete
  placeholder="Search address"
  [suggestionsFilter]="filterSuggestions"
  (placeSelect)="onPlaceSelected($event)">
</geoapify-geocoder-autocomplete>
```

```typescript
filterSuggestions = (features: any[]) => {
  const seen = new Set<string>();

  return features.filter((f) => {
    const props = f?.properties || {};
    const street = props.street;
    const hasHouseNumber = Boolean(props.housenumber);

    if (!street || !hasHouseNumber) return false;
    if (seen.has(street)) return false;

    seen.add(street);
    return true;
  });
};

onPlaceSelected(place: any) {
  console.log('Selected:', place.properties.formatted);
}
```

**Used properties:**

* `suggestionsFilter` – filters or reshapes suggestions before rendering.
* `placeholder` – hint text for the input.
* `placeSelect` – emits when a suggestion is chosen.

## Learn More

Explore more examples and customization options to get the most out of the Angular Geocoder Autocomplete component:

* [Quick Start](quick-start.md) – learn how to install and integrate the component in your Angular app.
* [API Reference](api-reference.md) – detailed list of all inputs, outputs, and customization hooks.
* [Standalone Usage](standalone-usage.md) – use the core JavaScript library without Angular.
* [Geoapify Geocoding API Docs](https://apidocs.geoapify.com/docs/geocoding) – explore available endpoints and parameters.
* [Geoapify Address Autocomplete Guide](https://www.geoapify.com/address-autocomplete/) – learn about the underlying service powering autocomplete suggestions.
* [@geoapify/geocoder-autocomplete on npm](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) – see more live demos and usage examples.
