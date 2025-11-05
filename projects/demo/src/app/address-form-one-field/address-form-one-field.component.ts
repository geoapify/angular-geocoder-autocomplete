import { Component, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GEOAPIFY_CONFIG, GeoapifyConfig } from '../../../../angular-geocoder-autocomplete/src/lib/geoapify-config';

interface AddressFormData {
  street: string;
  housenumber: string;
  city: string;
  postcode: string;
  country: string;
}

interface HighlightFields {
  street: boolean;
  housenumber: boolean;
  city: boolean;
  postcode: boolean;
  country: boolean;
}

interface MatchBadge {
  visible: boolean;
  text: string;
  class: string;
}

interface DevPanel {
  visible: boolean;
  status: string;
  meta: string;
  code: string;
}

@Component({
  selector: 'app-address-form-one-field',
  templateUrl: './address-form-one-field.component.html',
  styleUrls: ['./address-form-one-field.component.css'],
  standalone: false
})
export class AddressFormOneFieldComponent implements AfterViewInit {
  @ViewChild('streetInput') streetInput!: ElementRef<HTMLInputElement>;
  @ViewChild('houseInput') houseInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cityInput') cityInput!: ElementRef<HTMLInputElement>;
  @ViewChild('postcodeInput') postcodeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('countryInput') countryInput!: ElementRef<HTMLInputElement>;

  message = '';
  showWarnings = false;
  canConfirm = false;

  formData: AddressFormData = {
    street: '',
    housenumber: '',
    city: '',
    postcode: '',
    country: ''
  };

  highlightFields: HighlightFields = {
    street: false,
    housenumber: false,
    city: false,
    postcode: false,
    country: false
  };

  matchBadge: MatchBadge = {
    visible: false,
    text: '',
    class: ''
  };

  devPanel: DevPanel = {
    visible: false,
    status: 'Press "Confirm address" to run a one-time geocoding check.',
    meta: '',
    code: ''
  };

  constructor(
    private http: HttpClient,
    @Inject(GEOAPIFY_CONFIG) private config: GeoapifyConfig
  ) {}

  ngAfterViewInit() {
    this.updateConfirmState();
  }

  onAddressSelected(result: any) {
    if (!result || !result.properties) return;
    
    const p = result.properties;

    // Autofill form fields
    this.formData.street = p.street || '';
    this.formData.housenumber = p.housenumber || '';
    this.formData.city = p.city || p.town || p.village || p.suburb || '';
    this.formData.postcode = p.postcode || '';
    this.formData.country = p.country || '';

    // Highlight all editable fields and prompt review/confirm message
    const fieldKeys: (keyof HighlightFields)[] = ['street', 'housenumber', 'city', 'postcode', 'country'];
    fieldKeys.forEach(field => {
      this.highlightFields[field] = false;
      // Trigger animation after a brief delay to ensure change detection
      setTimeout(() => {
        this.highlightFields[field] = true;
        // Remove highlight after animation
        setTimeout(() => this.highlightFields[field] = false, 1800);
      }, 10);
    });

    this.updateConfirmState();
  }

  focusFirstMissing(event: Event) {
    event.preventDefault();
    const inputs = [this.streetInput, this.houseInput, this.postcodeInput, this.cityInput, this.countryInput];
    const formValues = [this.formData.street, this.formData.housenumber, this.formData.postcode, this.formData.city, this.formData.country];
    
    const targetIndex = formValues.findIndex(value => !value.trim());
    const targetInput = inputs[targetIndex] || inputs[0];
    
    if (targetInput && targetInput.nativeElement) {
      targetInput.nativeElement.focus();
    }
  }

  updateConfirmState() {
    const requiredFields = [
      this.formData.country,
      this.formData.city,
      this.formData.street,
      this.formData.housenumber,
      this.formData.postcode
    ];
    
    this.canConfirm = requiredFields.every(field => field.trim().length > 0);
  }

  confirmAddress() {
    const street = this.formData.street.trim();
    const house = this.formData.housenumber.trim();
    const city = this.formData.city.trim();
    const postcode = this.formData.postcode.trim();
    const country = this.formData.country.trim();

    this.message = '';
    this.matchBadge.visible = false;

    const missing = [];
    if (!country) missing.push('Country');
    if (!city) missing.push('City');
    if (!street) missing.push('Street');
    if (!house) missing.push('House number');
    if (!postcode) missing.push('Postcode');

    if (missing.length) {
      // Soft validation: show warnings briefly
      this.showWarnings = true;
      setTimeout(() => this.showWarnings = false, 2500);
      this.message = 'Please fill in the required fields and confirm again.';
      this.updateConfirmState();
      return;
    }

    // In a real app, you could now submit the form to your backend
    // This demo focuses on user verification and confirmation
    const formatted = `${street} ${house}, ${postcode} ${city}, ${country}`;
    this.message = `Address confirmed: ${formatted}`;

    // Show developer panel and perform a geocoding request with structured address
    this.performGeocodingVerification(house, street, postcode, city, country);
  }

  private performGeocodingVerification(house: string, street: string, postcode: string, city: string, country: string) {
    this.devPanel.visible = true;
    
    const params = new URLSearchParams({
      housenumber: house,
      street,
      postcode,
      city,
      country,
      apiKey: this.config.apiKey
    });
    
    const url = `https://api.geoapify.com/v1/geocode/search?${params.toString()}`;
    const maskedUrl = url.replace(/(apiKey=)[^&]+/i, '$1YOUR_API_KEY');
    
    this.devPanel.status = 'Requesting Geoapify Geocoding API…';
    this.devPanel.meta = `<strong>URL:</strong> ${maskedUrl}`;
    this.devPanel.code = '';

    // WARNING: Geocoding results are for internal hints only. House numbers may be missing for new/non-mapped buildings.
    this.http.get<any>(url).subscribe({
      next: (data) => {
        const features = (data && data.features) ? data.features : [];
        if (!features.length) {
          this.devPanel.status = 'No matches returned for the structured address.';
          this.devPanel.code = JSON.stringify(data, null, 2);
          return;
        }
        
        const found = features[0];
        const p = found.properties || {};
        
        // Compute verification message
        let verification = '';
        const rank = p.rank || {};
        if (rank.confidence === 1) {
          verification = 'Verified to building level.';
        } else if (rank.confidence > 0.5 && rank.confidence_street_level === 1) {
          verification = 'Likely accurate; verified to street level.';
        } else if (rank.confidence_street_level === 1) {
          verification = 'Verified to street level only.';
        } else {
          verification = 'Partial verification only.';
        }

        this.devPanel.status = [
          `<strong>Verification:</strong> ${verification}`,
          ` | <strong>Confidence:</strong> ${rank.confidence ?? 'n/a'}`,
          ` | <strong>Street-level:</strong> ${rank.confidence_street_level ?? 'n/a'}`
        ].join('');

        const label = (() => {
          if (rank.confidence === 1 && p.housenumber) return 'Building-level match';
          if (rank.confidence_street_level === 1 || p.street) return 'Street-level match';
          return 'City-level match';
        })();

        this.devPanel.meta = [
          `<strong>URL:</strong> ${maskedUrl}`,
          `<br><strong>Top result:</strong> ${p.formatted || '—'}`,
          `<br><strong>Match badge:</strong> ${label}`,
          `<br><strong>Coords:</strong> ${found.geometry && found.geometry.coordinates ? found.geometry.coordinates.join(', ') : '—'}`
        ].join('');

        // Show trimmed properties for quick inspection
        const snippet = JSON.stringify(p, null, 2);
        this.devPanel.code = snippet.length > 5000 ? snippet.slice(0, 5000) + '\n…' : snippet;

        // Set match badge
        this.setMatchBadge(p);
      },
      error: (err) => {
        this.devPanel.status = 'Request failed. You can proceed with manual confirmation.';
        this.devPanel.meta = `<strong>Error:</strong> ${String(err)}`;
      }
    });
  }

  private setMatchBadge(p: any) {
    const level = this.matchLevel(p);
    const labelMap = {
      building: 'Building-level match',
      street: 'Street-level match',
      city: 'City-level match',
      ambiguous: 'Ambiguous match'
    };
    
    this.matchBadge.visible = true;
    this.matchBadge.text = labelMap[level as keyof typeof labelMap] || 'Match level';
    this.matchBadge.class = `match-badge ${
      level === 'building' ? 'is-building' :
      level === 'street' ? 'is-street' :
      level === 'ambiguous' ? 'is-ambiguous' : 'is-city'
    }`;
  }

  private matchLevel(p: any): string {
    const rank = p.rank || {};
    const hasStreet = !!p.street;
    const hasHouse = !!p.housenumber;
    const conf = typeof rank.confidence === 'number' ? rank.confidence : undefined;
    const streetLevel = rank.confidence_street_level === 1 || hasStreet;

    if (conf !== undefined && conf < 0.5) return 'ambiguous';
    if (hasHouse && conf === 1) return 'building';
    if (streetLevel) return 'street';
    return 'city';
  }
}
