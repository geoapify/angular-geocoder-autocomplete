import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, SimpleChanges, Input, OnChanges, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { GeocoderAutocomplete, LocationType, SupportedLanguage, CountyCode, GeoPosition, GeocoderAutocompleteOptions, ByCountryCodeOptions, ByCircleOptions, ByRectOptions, ByProximityOptions } from '@geoapify/geocoder-autocomplete';
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
  placeholder: string;

  @Input()
  type: LocationType;

  @Input()
  skipIcons: boolean;

  @Input()
  addDetails: boolean;

  @Input()
  lang: SupportedLanguage

  @Input()
  filterByCountryCode: ByCountryCodeOptions;

  @Input()
  filterByCircle: ByCircleOptions;

  @Input()
  filterByRect: ByRectOptions;

  @Input()
  biasByCountryCode: ByCountryCodeOptions;

  @Input()
  biasByCircle: ByCircleOptions;

  @Input()
  biasByRect: ByRectOptions;

  @Input()
  biasByProximity: ByProximityOptions;

  @Input()
  countryCodes: CountyCode[];   // deprecated

  @Input()
  position: GeoPosition;   // deprecated

  @Input()
  limit: number;

  @Input()
  debounceDelay: number;

  @Input()
  preprocessingHook: (value: string) => string;

  @Input()
  postprocessingHook: (feature: any) => string;

  @Input()
  suggestionsFilter: (suggestions: any[]) => any[];

  @Input()
  sendGeocoderRequestFunc: (value: string, geocoderAutocomplete: GeocoderAutocomplete) => Promise<any>;

  @Input()
  sendPlaceDetailsRequestFunc: (feature: any, geocoderAutocomplete: GeocoderAutocomplete) => Promise<any>;

  @Output()
  placeSelect: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  suggestionsChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  userInput: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  open: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>();

  private onSelectEventFunction: any;
  private onSuggestionsEventFunction: any;
  private onUserInputEventFunction: any;
  private onOpenEventFunction: any;
  private onCloseEventFunction: any;

  constructor(@Inject(GEOAPIFY_CONFIG) private config: GeoapifyConfig) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const options: GeocoderAutocompleteOptions = {};

    if (this.placeholder) {
      options.placeholder = this.placeholder;
    }

    if (this.type) {
      options.type = this.type;
    }

    if (this.lang) {
      options.lang = this.lang;
    }

    if (this.limit) {
      options.limit = this.limit;
    }

    if (this.debounceDelay) {
      options.debounceDelay = this.debounceDelay;
    }

    if (this.skipIcons) {
      options.skipIcons = this.skipIcons;
    }

    if (this.addDetails) {
      options.addDetails = this.addDetails;
    }

    this.autocomplete = new GeocoderAutocomplete(this.container.nativeElement, this.config.apiKey, options);

    if (this.value) {
      this.autocomplete.setValue(this.value);
    }

    if (this.countryCodes) {
      console.warn("WARNING! Obsolete function called. The  'countryCodes' input has been deprecated, please use the new 'filterByCountryCode' input instead!");
      this.autocomplete.addFilterByCountry(this.countryCodes);
    }

    if (this.position) {
      console.warn("WARNING! Obsolete function called. The  'position' input has been deprecated, please use the new 'biasByLocation' input instead!");
      this.autocomplete.addBiasByProximity(this.position);
    }

    if (this.filterByCircle) {
      this.autocomplete.addFilterByCircle(this.filterByCircle);
    }

    if (this.filterByCountryCode) {
      this.autocomplete.addFilterByCountry(this.filterByCountryCode);
    }

    if (this.filterByRect) {
      this.autocomplete.addFilterByRect(this.filterByRect);
    }

    if (this.biasByCircle) {
      this.autocomplete.addBiasByCircle(this.biasByCircle);
    }

    if (this.biasByRect) {
      this.autocomplete.addBiasByRect(this.biasByRect);
    }

    if (this.biasByProximity) {
      this.autocomplete.addBiasByProximity(this.biasByProximity);
    }

    if (this.biasByCountryCode) {
      this.autocomplete.addBiasByCountry(this.biasByCountryCode);
    }

    if (this.preprocessingHook) {
      this.autocomplete.setPreprocessHook(this.preprocessingHook);
    }

    if (this.postprocessingHook) {
      this.autocomplete.setPostprocessHook(this.postprocessingHook);
    }

    if (this.suggestionsFilter) {
      this.autocomplete.setSuggestionsFilter(this.suggestionsFilter);
    }

    if (this.sendGeocoderRequestFunc) {
      this.autocomplete.setSendGeocoderRequestFunc(this.sendGeocoderRequestFunc);
    }

    if (this.sendPlaceDetailsRequestFunc) {
      this.autocomplete.setSendPlaceDetailsRequestFunc(this.sendPlaceDetailsRequestFunc);
    }
    
    this.autocomplete.on('select', this.onSelect.bind(this));
    this.autocomplete.on('suggestions', this.onSuggestions.bind(this));
    this.autocomplete.on('input', this.onInput.bind(this));
    this.autocomplete.on('open', this.onOpen.bind(this));
    this.autocomplete.on('close', this.onClose.bind(this));
  }

  onSelect(value: any) {
    this.placeSelect.emit(value);
  }

  onSuggestions(value: any) {
    this.suggestionsChange.emit(value);
  }

  onInput(value: string) {
    this.userInput.emit(value);
  }

  onOpen(opened: boolean) {
    this.open.emit(opened);
  }

  onClose(opened: boolean) {
    this.close.emit(opened);
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

    if (changes['filterByCircle'] &&
      !changes['filterByCircle'].isFirstChange()) {
      this.autocomplete.addFilterByCircle(changes['filterByCircle'].currentValue);
    }

    if (changes['filterByCountryCode'] &&
      !changes['filterByCountryCode'].isFirstChange()) {
      this.autocomplete.addFilterByCountry(changes['filterByCountryCode'].currentValue);
    }

    if (changes['filterByRect'] &&
      !changes['filterByRect'].isFirstChange()) {
      this.autocomplete.addFilterByRect(changes['filterByRect'].currentValue);
    }

    if (changes['biasByCircle'] &&
      !changes['biasByCircle'].isFirstChange()) {
      this.autocomplete.addBiasByCircle(changes['biasByCircle'].currentValue);
    }

    if (changes['biasByRect'] &&
      !changes['biasByRect'].isFirstChange()) {
      this.autocomplete.addBiasByRect(changes['biasByRect'].currentValue);
    }

    if (changes['biasByProximity'] &&
      !changes['biasByProximity'].isFirstChange()) {
      this.autocomplete.addBiasByProximity(changes['biasByProximity'].currentValue);
    }

    if (changes['biasByCountryCode'] &&
      !changes['biasByCountryCode'].isFirstChange()) {
      this.autocomplete.addBiasByCountry(changes['biasByCountryCode'].currentValue);
    }

    if (changes['countryCodes'] &&
      !changes['countryCodes'].isFirstChange()) {
      console.warn("WARNING! Obsolete function called. The  'countryCodes' input has been deprecated, please use the new 'filterByCountryCode' input instead!");
      this.autocomplete.addFilterByCountry(changes['countryCodes'].currentValue);
    }

    if (changes['position'] &&
      !changes['position'].isFirstChange()) {
      console.warn("WARNING! Obsolete function called. The  'position' input has been deprecated, please use the new 'biasByLocation' input instead!");
      this.autocomplete.addBiasByProximity(changes['position'].currentValue);
    }

    if (changes['limit'] &&
      !changes['limit'].isFirstChange()) {
      this.autocomplete.setLimit(changes['limit'].currentValue);
    }

    if (changes['preprocessingHook'] &&
      !changes['preprocessingHook'].isFirstChange()) {
      this.autocomplete.setPreprocessHook(changes['preprocessingHook'].currentValue);
    }

    if (changes['postprocessingHook'] &&
      !changes['postprocessingHook'].isFirstChange()) {
      this.autocomplete.setPostprocessHook(changes['postprocessingHook'].currentValue);
    }

    if (changes['suggestionsFilter'] &&
      !changes['suggestionsFilter'].isFirstChange()) {
      this.autocomplete.setSuggestionsFilter(changes['suggestionsFilter'].currentValue);
    }
  }

  ngOnDestroy() {
    this.autocomplete.off('select');
    this.autocomplete.off('suggestions');
    this.autocomplete.off('input');
    this.autocomplete.off('open');
    this.autocomplete.off('close');
  }
}