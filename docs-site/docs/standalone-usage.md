# Standalone Usage of Geocoder-Autocomplete in Angular

When considering the standalone usage of the `geocoder-autocomplete` library without a wrapper like `@geoapify/angular-geocoder-autocomplete`, it's important to note several advantages and characteristics:

1. **Zero Dependencies**: The `geocoder-autocomplete` library is intentionally designed to be lightweight and independent of external dependencies, including Angular. This means you won't introduce additional third-party dependencies into your project, ensuring that your application remains free from any potential compatibility issues or conflicts related to Angular version updates.

2. **Direct Control**: Using the library directly gives you more direct control over its behavior and integration within your Angular application. You can fine-tune and customize the library's features and configurations to suit your specific needs without relying on a wrapper's predefined settings.

3. **Flexibility**: By integrating the library without a wrapper, you have the flexibility to update and maintain it independently of Angular version changes. This can be particularly beneficial if you need to stay up-to-date with the latest Angular releases or if you have a specific version requirement for your project.

4. **Performance**: As the library has zero dependencies and is used directly, it may offer slightly better performance compared to using a wrapper. This can be advantageous for performance-sensitive applications.

Now, let's explore how to seamlessly integrate the geocoder-autocomplete library directly into your Angular project:

## 1: Create a Container Element

In your HTML template, add a container element (e.g., a `<div>`) with a `position: relative` style to serve as the host for the `geocoder-autocomplete` control. This container will determine the position of the autocomplete suggestions dropdown.

```html
<div #autocompleteContainer style="position: relative;">
  <!-- The geocoder-autocomplete control will be added here -->
</div>
```

## 2. Add the Control as a ViewChild

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

## 3. Create Geocoder-Autocomplete

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

## 4: Add Styles to Your Angular Project

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
