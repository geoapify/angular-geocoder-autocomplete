# Standalone Usage (Without Angular Wrapper)

In some cases, you may want to use the `geocoder-autocomplete` library directly — without the `@geoapify/angular-geocoder-autocomplete` wrapper.
This gives you full control over rendering, lifecycle, and styling, while keeping your setup lightweight.

Use the standalone version if you want to:

* Integrate address autocomplete into a non-Angular component or mixed environment.
* Avoid adding Angular-specific dependencies.
* Manage request logic, hooks, and styles manually for advanced customization.

## Benefits of Standalone Integration

1. **Zero Dependencies** – The library is pure JavaScript and does not depend on Angular or other frameworks, reducing bundle size and compatibility issues.
2. **Direct Control** – You decide how and when to initialize, destroy, or style the component.
3. **Flexibility** – It can be used across multiple frameworks or plain JS environments.
4. **Performance** – No Angular overhead, ideal for lightweight or embedded widgets.


### 1. Create a Container Element

Add a container in your template to host the autocomplete control. The container should have `position: relative` to position the dropdown correctly.

```html
<div #autocompleteContainer style="position: relative;">
  <!-- The geocoder-autocomplete control will be added here -->
</div>
```

### 2. Reference the Container with ViewChild

Use `@ViewChild` to access the container element from your component class.

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent {
  @ViewChild('autocompleteContainer', { static: true }) autocompleteContainer!: ElementRef;
}
```


### 3. Initialize Geocoder-Autocomplete

In your component, create and configure a new `GeocoderAutocomplete` instance after the view initializes.

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

    const options: GeocoderAutocompleteOptions = {
      apiKey: 'YOUR_GEOAPIFY_API_KEY', // required for requests
      placeholder: 'Search for an address'
    };

    this.geocoderAutocomplete = new GeocoderAutocomplete(container, options);

    // Optional: listen for selection
    this.geocoderAutocomplete.on('select', (feature) => {
      console.log('Selected place:', feature.properties.formatted);
    });
  }
}
```


### 4. Add Styles

Include one of the built-in styles in your project.
You can either import via `angular.json` or directly in your global stylesheet.

**Option 1: `angular.json`**

```json
"styles": [
  "node_modules/@geoapify/geocoder-autocomplete/styles/round-borders.css",
  "src/styles.css"
],
```

**Option 2: `styles.scss`**

```scss
@import "~@geoapify/geocoder-autocomplete/styles/minimal.css";
```


You’ve now integrated the `geocoder-autocomplete` widget directly into your Angular project — without using the wrapper.
This setup gives you complete control over initialization, styling, and API behavior.


### Geoapify API Resources

* [Geocoding API Documentation](https://apidocs.geoapify.com/docs/geocoding)
* [Place Details API Documentation](https://apidocs.geoapify.com/docs/place-details)
* [Geocoding API Playground](https://apidocs.geoapify.com/playground/geocoding)
* [Register and get your API key](https://myprojects.geoapify.com)
* [Geoapify APIs Overview](https://www.geoapify.com/)

