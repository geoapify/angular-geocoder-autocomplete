# API Reference

Here is the comprehensive list of input and output properties. Learn how to configure and customize the component, and discover how to utilize its full potential to enhance the user experience.

## Input Properties

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
| `addCategorySearch: boolean`    | Enables category-based place searches using the Geoapify Places API for POIs like restaurants, hotels, etc. |
| `showPlacesList: boolean`       | Controls whether to display a built-in places list under the autocomplete field when category search is enabled. |
| `hidePlacesListAfterSelect: boolean` | When true, hides the places list after a place is selected.                                                |
| `enablePlacesLazyLoading: boolean` | Enables lazy loading for places results to load more items as needed.                                       |
| `placesLimit: number`           | The maximum number of places to display in the places list.                                                |
| `placesFilter: object`          | Filters for places search (e.g., by circle, rectangle, or categories).                                     |
| `placesBias: object`           | Bias settings for places search to prioritize certain areas or criteria.                                   |
| *preprocessingHook: (value: string) => string* | A function to preprocess the input value before sending requests.                               |
| *postprocessingHook: (feature: [GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON)) => string* | A function to process and modify the selected place feature before display.                  |
| *suggestionsFilter: (suggestions: [GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON)[]) => [GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON)[]* | A function to filter and modify the suggestions list before display.                           |
| *sendGeocoderRequestFunc: (value: string, geocoderAutocomplete: GeocoderAutocomplete) => Promise<[GeoJSON.FeatureCollection](https://en.wikipedia.org/wiki/GeoJSON)>* | A custom function to send geocoder requests.                                |
| *sendPlaceDetailsRequestFunc: (feature: [GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON), geocoderAutocomplete: GeocoderAutocomplete) => Promise<[GeoJSON.Feature](https://en.wikipedia.org/wiki/GeoJSON)>* | A custom function to send place details requests.                        |


## Output Properties

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
| `places: EventEmitter<any[]>`             | Emits places results when category search returns POIs.                                           |
| `placesRequestStart: EventEmitter<Category>` | Emits when a places API request begins for category search.                                    |
| `placesRequestEnd: EventEmitter<{success: boolean, data?: any, error?: any}>`  | Emits when a places API request completes (includes success status and data/error).               |
| `placeDetailsRequestStart: EventEmitter<any>` | Emits when a place details API request begins.                                               |
| `placeDetailsRequestEnd: EventEmitter<{success: boolean, data?: any, error?: any}>` | Emits when a place details API request completes (includes success status and data/error).      |
| `placeSelectEvent: EventEmitter<{place: any, index: number}>`  | Emits when a place is selected from the places list (includes place and index).                   |
| `clear: EventEmitter<ItemType>`                | Emits when the input field or category selection is cleared.                                      |

The component itself doesn't have a dependency on [@types/geojson](https://www.npmjs.com/package/@types/geojson). However, if you wish to work with GeoJSON types in your application, you can install it as an additional package.

## Types and Interfaces

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
