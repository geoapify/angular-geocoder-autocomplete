import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, SimpleChanges, Input, OnChanges, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { GeocoderAutocomplete, LocationType, SupportedLanguage, CountyCode, GeoPosition, GeocoderAutocompleteOptions } from '@geoapify/geocoder-autocomplete';
import { GeoapifyConfig, GEOAPIFY_CONFIG } from './geoapify-config';


@Component({
  selector: 'geoapify-geocoder-autocomplete',
  template: '<div class="geocoder-container" #container></div>',
  styles: [
    '.geocoder-container {position: relative}'
  ]
})
export class GeocoderAutocompleteComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  autocomplete: GeocoderAutocomplete;

  @ViewChild('container')
  container: ElementRef;

  @Input()
  value: string;

  @Input()
  placeHolder: string;

  @Input()
  type: LocationType;

  @Input()
  lang: SupportedLanguage

  @Input()
  countryCodes: CountyCode[];

  @Input()
  position: GeoPosition;

  @Input()
  limit: number;

  @Output()
  placeSelect: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  suggestionsChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(GEOAPIFY_CONFIG) private config: GeoapifyConfig) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const options: GeocoderAutocompleteOptions = {};

    if (this.placeHolder) {
      options.placeholder = this.placeHolder;
    }

    if (this.type) {
      options.type = this.type;
    }

    if (this.lang) {
      options.lang = this.lang;
    }

    if (this.countryCodes) {
      options.countryCodes = this.countryCodes;
    }

    if (this.position) {
      options.position = this.position;
    }

    if (this.limit) {
      options.limit = this.limit;
    }

    this.autocomplete = new GeocoderAutocomplete(this.container.nativeElement, this.config.apiKey, options);

    if (this.value) {
      this.autocomplete.setValue(this.value);
    }

    this.autocomplete.on('select', () => this.onSelect.bind(this));
    this.autocomplete.on('suggestions', () => this.onSuggestions.bind(this));
  }

  onSelect(value: any) {
    this.placeSelect.emit(value);
  }

  onSuggestions(value: any) {
    this.suggestionsChange.emit(value);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!this.autocomplete) {
      return;
    }

    if (changes['value'] &&
      !changes['value'].isFirstChange()) {
      this.autocomplete.setValue(changes['value'].currentValue);
    }

    if (changes['type'] &&
      !changes['type'].isFirstChange()) {
      this.autocomplete.setType(changes['type'].currentValue);
    }

    if (changes['lang'] &&
      !changes['lang'].isFirstChange()) {
      this.autocomplete.setLang(changes['lang'].currentValue);
    }

    if (changes['countryCodes'] &&
      !changes['countryCodes'].isFirstChange()) {
      this.autocomplete.setCountryCodes(changes['countryCodes'].currentValue);
    }

    if (changes['position'] &&
      !changes['position'].isFirstChange()) {
      this.autocomplete.setPosition(changes['position'].currentValue);
    }

    if (changes['limit'] &&
      !changes['limit'].isFirstChange()) {
      this.autocomplete.setLimit(changes['limit'].currentValue);
    }
  }

  ngOnDestroy() {
    this.autocomplete.off('select', this.onSelect);
    this.autocomplete.off('suggestions', this.onSuggestions);
  }
}