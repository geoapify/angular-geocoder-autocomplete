# Angular compoment for Geoapify Geocoder Autocomplete
The component wraps the [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) library into an Angular component.

## Installation
@geoapify/angular-geocoder-autocomplete has a peer dependancy on **@geoapify/geocoder-autocomplete**:
```
npm install @geoapify/geocoder-autocomplete @geoapify/angular-geocoder-autocomplete
# or 
yarn add @geoapify/geocoder-autocomplete @geoapify/angular-geocoder-autocomplete
```
## Compatiblity table
|@geoapify/angular-geocoder-autocomplete|Angular|
|-|-|
|1.0.x|9.x|
|1.1.x|9.x|
|1.2.x|10.x|

## Usage
### 1. Import the module
You need an API key to be able to call Geoapify Geocoding API. 
Register and get an API key for Free on [myprojects.geoapify.com](https://myprojects.geoapify.com/).
Geoapify has a [Freemium pricing model](https://www.geoapify.com/api-pricing/). You can start for Free and extend when you need it.

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
    GeoapifyGeocoderAutocompleteModule.withConfig('YOUR_API_KEY')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### 2. Import styles
Import CSS style file from **@geoapify-geocoder-autocomplete** to make the control appear correctly. You can choose from several stylings:
* `minimal` and `round-borders` - for webpages with light background color
* `minimal-dark` and `round-borders-dark` for webpages with dark background color.
##### Option 1: Add in `angular.json` when using angular-cli:
```json
"styles": [
    ...
    "node_modules/@geoapify/geocoder-autocomplete/styles/round-borders.css",
    "src/styles.scss"
],
``` 
##### Option 2: Import in global css (for example, styles.css):
```
 @import "~@geoapify/geocoder-autocomplete/styles/minimal.css";
```
Learn more about provided styles and customization option on [@geoapify-geocoder-autocomplete page](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete).

### 3. Use geocoder autocomplete field in your template
```html

<geoapify-geocoder-autocomplete></geoapify-geocoder-autocomplete>

<geoapify-geocoder-autocomplete 
    (placeSelect)="placeSelected($event)" 
    (suggestionsChange)="suggestionsChanged($event)">
</geoapify-geocoder-autocomplete>

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
    [skipIcons]="false"
    [skipDetails]="false"
    (placeSelect)="placeSelected($event)" 
    (suggestionsChange)="suggestionsChanged($event)">
</geoapify-geocoder-autocomplete>

```

#### Inputs 
| Name | Type | Description |
|-|-|-| 
| value | string | Initial value or display value for the input field |
| type | LocationType | Type of a location
| lang | SupportedLanguage | Results language |
| limit | number | The maximal number of returned suggestions |
| placeholder | string | An input field placeholder |
| filterByCountryCode | ByCountryCodeOptions | Search places in the countries |
| filterByCircle | ByCircleOptions | Search places inside the circle |
| filterByRect | ByRectOptions | Search places inside the rectangle |
| biasByCountryCode | ByCountryCodeOptions | First, search places in the countries |
| biasByCircle | ByCircleOptions | First, search places inside the circle |
| biasByRect | ByRectOptions | First, search places inside the rectangle |
| biasByProximity | ByProximityOptions | Prioritize results by farness from the location |
| skipIcons	| boolean	| Don't add icons to suggestions |
| skipDetails	| boolean	| Skip Place Details API call on selection change |
| ~~position~~ | GeoPosition | Prefered search position |
| ~~countryCodes~~ | CountyCode[] | Limit the search by countries |

You can use several filters at once. The **AND** logic is applied to multiple filters.

You can use several bias parameters at once. The **OR** logic is applied to multiple biases.


```javascript
export type ByCountryCodeOptions = CountyCode[];

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
export type CountyCode = "none"| "auto" | "ad" | "ae" | "af" | "ag" | "ai" | "al" | "am" | "an" | "ao" | "ap" | "aq" | "ar" | "as" | "at" | "au" | "aw" | "az" | "ba" | "bb" | "bd" | "be" | "bf" | "bg" | "bh" | "bi" | "bj" | "bm" | "bn" | "bo" | "br" | "bs" | "bt" | "bv" | "bw" | "by" | "bz" | "ca" | "cc" | "cd" | "cf" | "cg" | "ch" | "ci" | "ck" | "cl" | "cm" | "cn" | "co" | "cr" | "cu" | "cv" | "cx" | "cy" | "cz" | "de" | "dj" | "dk" | "dm" | "do" | "dz" | "ec" | "ee" | "eg" | "eh" | "er" | "es" | "et" | "eu" | "fi" | "fj" | "fk" | "fm" | "fo" | "fr" | "ga" | "gb" | "gd" | "ge" | "gf" | "gh" | "gi" | "gl" | "gm" | "gn" | "gp" | "gq" | "gr" | "gs" | "gt" | "gu" | "gw" | "gy" | "hk" | "hm" | "hn" | "hr" | "ht" | "hu" | "id" | "ie" | "il" | "in" | "io" | "iq" | "ir" | "is" | "it" | "jm" | "jo" | "jp" | "ke" | "kg" | "kh" | "ki" | "km" | "kn" | "kp" | "kr" | "kw" | "ky" | "kz" | "la" | "lb" | "lc" | "li" | "lk" | "lr" | "ls" | "lt" | "lu" | "lv" | "ly" | "ma" | "mc" | "md" | "me" | "mg" | "mh" | "mk" | "ml" | "mm" | "mn" | "mo" | "mp" | "mq" | "mr" | "ms" | "mt" | "mu" | "mv" | "mw" | "mx" | "my" | "mz" | "na" | "nc" | "ne" | "nf" | "ng" | "ni" | "nl" | "no" | "np" | "nr" | "nu" | "nz" | "om" | "pa" | "pe" | "pf" | "pg" | "ph" | "pk" | "pl" | "pm" | "pr" | "ps" | "pt" | "pw" | "py" | "qa" | "re" | "ro" | "rs" | "ru" | "rw" | "sa" | "sb" | "sc" | "sd" | "se" | "sg" | "sh" | "si" | "sj" | "sk" | "sl" | "sm" | "sn" | "so" | "sr" | "st" | "sv" | "sy" | "sz" | "tc" | "td" | "tf" | "tg" | "th" | "tj" | "tk" | "tm" | "tn" | "to" | "tr" | "tt" | "tv" | "tw" | "tz" | "ua" | "ug" | "um" | "us" | "uy" | "uz" | "va" | "vc" | "ve" | "vg" | "vi" | "vn" | "vu" | "wf" | "ws" | "ye" | "yt" | "za" | "zm" | "zw";
```

Use Geocoder Autocomplete types in your code:
```javascript
import { ByProximityOptions, LocationType, ... } from '@geoapify/geocoder-autocomplete';
```

#### Outputs
| Name | Description | Value type |
|-|-|-|
| placeSelect | Fired when a location was selected | [GeoJSON.Feature](https://geojson.org/) |
| suggestionsChange | Fired on new suggestions | [GeoJSON.Feature[]] (https://geojson.org/) |

The `placeSelect` output returns detailed information about the selected place got with [Geoapify Place Details API](https://apidocs.geoapify.com/docs/place-details). The information contains the place category, data fields and geometry (boundary or polygon).  Note, that the Place Details API call costs an additional 'geocoding & places' request. Use the skipDetails option to switch the functionality off.

Properties of the feature contain information about address and location.
Learn more about Geocoder result properties on [Geoapify Documentation page](https://apidocs.geoapify.com/docs/geocoding/).

The component doesn't have dependancy on [@types/geojson](https://www.npmjs.com/package/@types/geojson). However, you can install it to work with GeoJSON types.

## Geoapify Geocoding API documentation
* [Geocoding API Documentation](https://apidocs.geoapify.com/docs/geocoding)
* [Place Details API Documentation](https://apidocs.geoapify.com/docs/place-details)
* [Geocoding API Playground](https://apidocs.geoapify.com/playground/geocoding)
* [Register and get Geoapify API key](https://myprojects.geoapify.com)
* [Geoapify APIs](https://www.geoapify.com/)