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
| 2.2.0                                   | 19.x-20.x      |
| 3.0.0                                   | 19.x-20.x      |

**Note:** If you want to get rid of the Angular version dependency or integrate the `geocoder-autocomplete` without the wrapper, you can follow the instructions provided in [the documentation for standalone usage](standalone-usage.md).


## Transitioning from version 1.x to 2.x: Replacing skipDetails with addDetails

In version 2.x of the library, we've replaced the skipDetails option with addDetails. This update provides greater clarity, indicating whether you want to include or exclude additional details in your search results. To ensure compatibility with the new version, remember to adjust your code accordingly by using the addDetails option when you need place details in your search results.

## Getting Your Geoapify API Key

If you opt to integrate the Geoapify API for address searches, securing an API key is a prerequisite.

To obtain your API key, you can complete the registration process at [myprojects.geoapify.com](https://myprojects.geoapify.com/). It's worth noting that Geoapify offers a versatile [Freemium pricing model](https://www.geoapify.com/pricing/), affording you the opportunity to initiate your API usage at no initial cost and seamlessly expand your access to our services to align with your evolving requirements.

## Category Search and Places (New in V3)

Version 3.0's major new feature enables **category-based place searches** using the [Geoapify Places API](https://www.geoapify.com/places-api/). This allows users to find **points of interest (POIs)** such as restaurants, cafes, hotels, gas stations, and more — in addition to standard address autocomplete.

### When It's Useful

Category search is ideal for:

* Building "Find nearby" or "Explore around me" features
* Showing local amenities or businesses on a map
* Adding category-based discovery to your forms or applications
* Enhancing location-based search experiences with dynamic data

### Basic Category Search Setup

To enable category-based search, set the `addCategorySearch` option:

```html
<geoapify-geocoder-autocomplete 
    [addCategorySearch]="true"
    (places)="onPlacesChanged($event)"
    (placeSelectEvent)="onPlaceSelected($event)">
</geoapify-geocoder-autocomplete>
```

### Built-in Places List

Enable the built-in places list to automatically display matching POIs below the input field:

```html
<geoapify-geocoder-autocomplete 
    [addCategorySearch]="true"
    [showPlacesList]="true"
    [enablePlacesLazyLoading]="true"
    [placesLimit]="10"
    [hidePlacesListAfterSelect]="false"
    (placesRequestStart)="onPlacesRequestStart($event)"
    (placesRequestEnd)="onPlacesRequestEnd($event)">
</geoapify-geocoder-autocomplete>
```

### Complete Category Search Example

Here's a comprehensive example showing all category search features:

```html
<geoapify-geocoder-autocomplete 
    [addCategorySearch]="true"
    [showPlacesList]="true"
    [enablePlacesLazyLoading]="true"
    [placesLimit]="15"
    [hidePlacesListAfterSelect]="true"
    (places)="handlePlaces($event)"
    (placeSelectEvent)="handlePlaceSelection($event)"
    (placesRequestStart)="showPlacesLoading($event)"
    (placesRequestEnd)="hidePlacesLoading($event)"
    (placeDetailsRequestStart)="showDetailsLoading($event)"
    (placeDetailsRequestEnd)="hideDetailsLoading($event)">
</geoapify-geocoder-autocomplete>
```

When users type a category name (e.g., *restaurant*, *gas station*, *hotel*), the autocomplete shows category suggestions alongside address results. If `showPlacesList` is enabled, matching places are automatically displayed below the input field with details like name, address, and opening hours.
