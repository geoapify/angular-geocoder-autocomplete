import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GeocoderAutocompleteComponent } from '../../../../angular-geocoder-autocomplete/src/lib/geocoder-autocomplete.component';

interface EventConfig {
  key: string;
  label: string;
  enabled: boolean;
}

interface OptionsForm {
  debounceDelay: number;
  addDetails: boolean;
  addCategorySearch: boolean;
}

interface ConsoleLog {
  timestamp: string;
  event: string;
  payload: string;
}

@Component({
  selector: 'app-autocomplete-features-events',
  templateUrl: './autocomplete-features-events.component.html',
  styleUrls: ['./autocomplete-features-events.component.css'],
  standalone: false
})
export class AutocompleteFeaturesEventsComponent implements OnInit, AfterViewInit {
  @ViewChild('autocomplete') autocomplete?: GeocoderAutocompleteComponent;
  @ViewChild('consoleElement') consoleElement?: ElementRef;

  events: EventConfig[] = [
    { key: 'select', label: 'select', enabled: true },
    { key: 'suggestions', label: 'suggestions', enabled: true },
    { key: 'input', label: 'input', enabled: true },
    { key: 'close', label: 'close', enabled: true },
    { key: 'open', label: 'open', enabled: true },
    { key: 'request_start', label: 'request_start', enabled: true },
    { key: 'request_end', label: 'request_end', enabled: true },
    { key: 'places', label: 'places', enabled: true },
    { key: 'places_request_start', label: 'places_request_start', enabled: true },
    { key: 'places_request_end', label: 'places_request_end', enabled: true },
    { key: 'place_details_request_start', label: 'place_details_request_start', enabled: true },
    { key: 'place_details_request_end', label: 'place_details_request_end', enabled: true },
    { key: 'place_select', label: 'place_select', enabled: true },
    { key: 'clear', label: 'clear', enabled: true }
  ];

  optionsForm: OptionsForm = {
    debounceDelay: 250,
    addDetails: false,
    addCategorySearch: true
  };

  options: OptionsForm = { ...this.optionsForm };

  consoleLogs: ConsoleLog[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Component is ready
  }

  // Event handlers
  onInput(text: any) {
    this.logEvent('input', this.fmt({ text }));
  }

  onRequestStart(query: any) {
    this.logEvent('request_start', this.fmt({ query }));
  }

  onRequestEnd(result: any) {
    const success = result?.success !== false;
    const count = this.getResultCount(result?.data || result);
    const error = result?.error && !result.error.canceled ? String(result.error) : undefined;
    this.logEvent('request_end', this.fmt({ success, suggestions: count, error }));
  }

  onSuggestions(items: any) {
    const count = Array.isArray(items) ? items.length : 0;
    this.logEvent('suggestions', this.fmt({ count }));
  }

  onSelect(feature: any) {
    const p = feature?.properties || {};
    this.logEvent('select', this.fmt({ formatted: p.formatted, lat: p.lat, lon: p.lon }));
  }

  onOpen(event: any) {
    this.logEvent('open', '');
  }

  onClose(event: any) {
    this.logEvent('close', '');
  }

  onClear(context: any) {
    this.logEvent('clear', this.fmt({ context }));
  }

  onPlaceDetailsRequestStart(feature: any) {
    const p = feature?.properties || {};
    this.logEvent('place_details_request_start', this.fmt({ name: p.name || p.formatted }));
  }

  onPlaceDetailsRequestEnd(result: any) {
    const feature = result?.data || result?.feature || result;
    const p = feature?.properties || {};
    const success = result?.success !== false;
    const error = result?.error && !result.error.canceled ? String(result.error) : undefined;
    this.logEvent('place_details_request_end', this.fmt({ 
      success, 
      name: p.name || p.formatted, 
      error 
    }));
  }

  onPlacesRequestStart(categoryKeys: any) {
    this.logEvent('places_request_start', this.fmt({ categories: categoryKeys }));
  }

  onPlacesRequestEnd(result: any) {
    const success = result?.success !== false;
    const count = this.getResultCount(result?.data || result);
    const error = result?.error && !result.error.canceled ? String(result.error) : undefined;
    this.logEvent('places_request_end', this.fmt({ success, places: count, error }));
  }

  onPlaces(places: any) {
    const count = Array.isArray(places) ? places.length : 0;
    this.logEvent('places', this.fmt({ count }));
  }

  onPlaceSelectEvent(event: any) {
    const place = event?.place;
    const index = event?.index;
    const p = place?.properties || {};
    this.logEvent('place_select', this.fmt({ 
      index, 
      name: p.name || p.formatted, 
      lat: p.lat, 
      lon: p.lon 
    }));
  }

  // Utility methods
  private getResultCount(data: any): number {
    if (Array.isArray(data)) return data.length;
    if (data && Array.isArray(data.features)) return data.features.length;
    return 0;
  }

  private fmt(obj: any): string {
    try {
      const text = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
      return text.length > 800 ? text.slice(0, 800) + '…' : text;
    } catch(_) { 
      return String(obj); 
    }
  }

  private logEvent(eventName: string, payload: string) {
    // Check if this event type is enabled
    const eventConfig = this.events.find(e => e.key === eventName);
    if (!eventConfig || !eventConfig.enabled) {
      return;
    }

    const timestamp = this.nowTimestamp();
    
    this.consoleLogs.push({
      timestamp,
      event: eventName,
      payload
    });

    // Keep only last 100 logs for performance
    if (this.consoleLogs.length > 100) {
      this.consoleLogs = this.consoleLogs.slice(-100);
    }

    // Auto-scroll to bottom
    setTimeout(() => {
      if (this.consoleElement) {
        const element = this.consoleElement.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 10);
  }

  private nowTimestamp(): string {
    const d = new Date();
    const pad = (n: number, s: number = 2) => String(n).padStart(s, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
  }

  // Control methods
  toggleEvent(event: EventConfig) {
    // The checkbox binding handles the enabled state
    // We don't need additional logic here since we check enabled state in logEvent
  }

  enableAllEvents() {
    this.events.forEach(event => {
      event.enabled = true;
    });
  }

  disableAllEvents() {
    this.events.forEach(event => {
      event.enabled = false;
    });
  }

  clearLog() {
    this.consoleLogs = [];
  }

  applyOptions() {
    // Update the current options
    this.options = { ...this.optionsForm };
    
    // Log the options change
    this.logEvent('options_applied', JSON.stringify({
      debounceDelay: this.options.debounceDelay,
      addDetails: this.options.addDetails,
      addCategorySearch: this.options.addCategorySearch
    }));
  }
}