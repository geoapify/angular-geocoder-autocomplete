import { Component } from '@angular/core';
import { CountyCode } from '@geoapify/geocoder-autocomplete';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  displayValue = '';
  filterByCountryCode: Array<CountyCode> = ["am"];
  filterByCircle = {
    lon: 40.177200,
    lat: 44.503490,
    radiusMeters: 1000000000
  };
  filterByRect = {
    lon1: 39.674206,
    lat1: 38.055661,
    lon2: 53.537092,
    lat2: 44.050090
  };
  biasByCountryCode: Array<CountyCode> = ["am"];
  biasByCircle = {
    lon: 40.177200,
    lat: 44.503490,
    radiusMeters: 1000000000
  };
  biasByRect = {
    lon1: 39.674206,
    lat1: 38.055661,
    lon2: 53.537092,
    lat2: 44.050090
  };
  biasByProximity = {
    lon: 40.177200,
    lat: 44.503490,
  };
  options = {
    type: 'city',
    lang: 'en',
    limit: 10
  };

  toUpperCaseHook(value: any): string {
    console.log("To upper case: ", value);
    return value.toUpperCase();
  }

  toLowerCaseHook(value: any): string {
    console.log("To lower case: ", value);
    return value.properties.formatted.toLowerCase();
  }

  filterByLength(suggestions: any[]): any[] {
    console.log("Filter by length: ", suggestions);
    return suggestions;
  }

  userInput(event: any) {
    console.log("User input: ", event);
  }

  placeSelected(event: any) {
    console.log("Selected place: ", event);
  }

  suggestionsChanged(event: any) {
    console.log("Suggestions changed: ", event);
  }
}
