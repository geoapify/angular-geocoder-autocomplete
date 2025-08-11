import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  selectedTheme = 'minimal';
  message = '';
  showWarnings = false;

  formData = {
    street: '',
    housenumber: '',
    additional: '',
    city: '',
    postcode: '',
    state: '',
    country: ''
  };

  // Values for the geocoder autocomplete components
  streetValue = '';
  cityValue = '';
  stateValue = '';
  countryValue = '';

  spinners = {
    street: false,
    city: false,
    state: false,
    country: false
  };

  private readonly myAPIKey = 'API_KEY_HERE'; // Replace with your actual API key

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.loadSavedTheme();
  }

  setTheme(themeName: string) {
    const existingThemeLinks = document.querySelectorAll('link[data-geoapify-theme]');
    existingThemeLinks.forEach(link => link.remove());

    const themeLink = this.renderer.createElement('link');
    this.renderer.setAttribute(themeLink, 'rel', 'stylesheet');
    this.renderer.setAttribute(themeLink, 'type', 'text/css');
    this.renderer.setAttribute(themeLink, 'data-geoapify-theme', 'true');

    const cdnUrl = `https://unpkg.com/@geoapify/geocoder-autocomplete@2.1.0/styles/${themeName}.css`;
    this.renderer.setAttribute(themeLink, 'href', cdnUrl);
    this.renderer.appendChild(document.head, themeLink);

    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    this.renderer.addClass(document.body, `theme-${themeName}`);

    localStorage.setItem('geocoder-theme', themeName);
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem('geocoder-theme') || 'minimal';
    this.selectedTheme = savedTheme;
    this.setTheme(savedTheme);
  }

  showSpinner(field: string) {
    this.spinners[field as keyof typeof this.spinners] = true;
  }

  hideSpinner(field: string) {
    this.spinners[field as keyof typeof this.spinners] = false;
  }

  onStreetSelected(street: any) {
    if (street) {
      this.formData.street = street.properties.street || '';
      this.streetValue = this.formData.street;
    }

    if (street && street.properties.housenumber) {
      this.formData.housenumber = street.properties.housenumber;
    }

    if (street && street.properties.postcode) {
      this.formData.postcode = street.properties.postcode;
    }

    if (street && street.properties.city) {
      this.formData.city = street.properties.city;
      this.cityValue = this.formData.city;
    }

    if (street && street.properties.state) {
      this.formData.state = street.properties.state;
      this.stateValue = this.formData.state;
    }

    if (street && street.properties.country) {
      this.formData.country = street.properties.country;
      this.countryValue = this.formData.country;
    }
  }

  onCitySelected(city: any) {
    if (city) {
      this.formData.city = city.properties.city || '';
      this.cityValue = this.formData.city;
    }

    if (city && city.properties.postcode) {
      this.formData.postcode = city.properties.postcode;
    }

    if (city && city.properties.state) {
      this.formData.state = city.properties.state;
      this.stateValue = this.formData.state;
    }

    if (city && city.properties.country) {
      this.formData.country = city.properties.country;
      this.countryValue = this.formData.country;
    }
  }

  onStateSelected(state: any) {
    if (state) {
      this.formData.state = state.properties.state || '';
      this.stateValue = this.formData.state;
    }

    if (state && state.properties.country) {
      this.formData.country = state.properties.country;
      this.countryValue = this.formData.country;
    }
  }

  onCountrySelected(country: any) {
    if (country) {
      this.formData.country = country.properties.country || '';
      this.countryValue = this.formData.country;
    }
  }

  checkAddress() {
    this.message = '';
    this.showWarnings = false;

    if (!this.formData.postcode || !this.cityValue || !this.streetValue ||
        !this.formData.housenumber || !this.stateValue || !this.countryValue) {
      this.highlightEmpty();
      this.message = "Please fill in the required fields and check your address again.";
      return;
    }

    // Check the address with Geoapify Geocoding API
    const url = `https://api.geoapify.com/v1/geocode/search?housenumber=${encodeURIComponent(this.formData.housenumber)}&street=${encodeURIComponent(this.streetValue)}&postcode=${encodeURIComponent(this.formData.postcode)}&city=${encodeURIComponent(this.cityValue)}&state=${encodeURIComponent(this.stateValue)}&country=${encodeURIComponent(this.countryValue)}&apiKey=${this.myAPIKey}`;

    fetch(url)
      .then(result => result.json())
      .then((result) => {
        let features = result.features || [];

        // Filter by confidence level
        const confidenceLevelToAccept = 0.25;
        features = features.filter((feature: any) => feature.properties.rank.confidence >= confidenceLevelToAccept);

        if (features.length) {
          const foundAddress = features[0];
          if (foundAddress.properties.rank.confidence === 1) {
            this.message = `We verified the address you entered. The formatted address is: ${foundAddress.properties.formatted}`;
          } else if (foundAddress.properties.rank.confidence > 0.5 && foundAddress.properties.rank.confidence_street_level === 1) {
            this.message = `We have some doubts about the accuracy of the address: ${foundAddress.properties.formatted}`;
          } else if (foundAddress.properties.rank.confidence_street_level === 1) {
            this.message = `We can confirm the address up to street level: ${foundAddress.properties.formatted}`;
          } else {
            this.message = `We can only verify your address partially. The address we found is ${foundAddress.properties.formatted}`;
          }
        } else {
          this.message = "We cannot find your address. Please check if you provided the correct address.";
        }
      })
      .catch(error => {
        console.error('Error checking address:', error);
        this.message = "Error checking address. Please try again.";
      });
  }

  highlightEmpty() {
    this.showWarnings = true;

    // Remove warnings after 3 seconds
    setTimeout(() => {
      this.showWarnings = false;
    }, 3000);
  }
}
