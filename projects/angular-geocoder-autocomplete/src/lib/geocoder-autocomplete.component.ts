import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  SimpleChanges,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
  Inject
} from '@angular/core';
import {
  GeocoderAutocomplete,
  LocationType,
  SupportedLanguage,
  CountyCode,
  GeoPosition,
  GeocoderAutocompleteOptions,
  ByCountryCodeOptions,
  ByCircleOptions,
  ByRectOptions,
  ByProximityOptions,
  Category
} from '@geoapify/geocoder-autocomplete';
import { GeoapifyConfig, GEOAPIFY_CONFIG } from './geoapify-config';
import { ItemType } from "@geoapify/geocoder-autocomplete/dist/types/external";


@Component({
  selector: 'geoapify-geocoder-autocomplete',
  template: '<div class="geocoder-container" #container></div>',
  styles: [
    '.geocoder-container {position: relative}'
  ],
  standalone: false
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
  lang: SupportedLanguage;

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
  addCategorySearch: boolean;

  @Input()
  showPlacesList: boolean;

  @Input()
  hidePlacesListAfterSelect: boolean;

  @Input()
  enablePlacesLazyLoading: boolean;

  @Input()
  placesLimit: number;

  @Input()
  placesFilter: {
    [key: string]: ByCircleOptions | ByRectOptions | string;
  };

  @Input()
  placesBias: {
    [key: string]: ByCircleOptions | ByRectOptions | ByProximityOptions;
  };

  @Input()
  countryCodes: CountyCode[];   // deprecated

  @Input()
  position: GeoPosition;   // deprecated

  @Input()
  limit: number;

  @Input()
  debounceDelay: number;

  @Input()
  allowNonVerifiedHouseNumber: boolean;

  @Input()
  allowNonVerifiedStreet: boolean;

  @Input()
  skipSelectionOnArrowKey: boolean;

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

  @Input()
  sendPlacesRequestFunc: (category: string[], offset: number, geocoderAutocomplete: GeocoderAutocomplete) => Promise<any>;

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

  @Output()
  requestStart: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  requestEnd: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  places: EventEmitter<GeoJSON.Feature[]> = new EventEmitter<GeoJSON.Feature[]>();

  @Output()
  placesRequestStart: EventEmitter<Category> = new EventEmitter<Category>();

  @Output()
  placesRequestEnd: EventEmitter<{success: boolean, data?: any, error?: any}> =
    new EventEmitter<{success: boolean, data?: any, error?: any}>();

  @Output()
  placeDetailsRequestStart: EventEmitter<GeoJSON.Feature> = new EventEmitter<GeoJSON.Feature>();

  @Output()
  placeDetailsRequestEnd: EventEmitter<{success: boolean, data?: any, error?: any}> =
    new EventEmitter<{success: boolean, data?: any, error?: any}>();

  @Output()
  placeSelectEvent: EventEmitter<{place: GeoJSON.Feature, index: number}> =
    new EventEmitter<{place: GeoJSON.Feature, index: number}>();

  @Output()
  clear: EventEmitter<ItemType> = new EventEmitter<ItemType>();

  constructor(@Inject(GEOAPIFY_CONFIG) private config: GeoapifyConfig) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if(typeof document === 'undefined') {
      return;
    }
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

    if (this.allowNonVerifiedHouseNumber !== undefined) {
      options.allowNonVerifiedHouseNumber = this.allowNonVerifiedHouseNumber;
    }

    if (this.allowNonVerifiedStreet !== undefined) {
      options.allowNonVerifiedStreet = this.allowNonVerifiedStreet;
    }

    if (this.skipSelectionOnArrowKey !== undefined) {
      options.skipSelectionOnArrowKey = this.skipSelectionOnArrowKey;
    }

    if (this.addCategorySearch !== undefined) {
      options.addCategorySearch = this.addCategorySearch;
    }

    if (this.showPlacesList !== undefined) {
      options.showPlacesList = this.showPlacesList;
    }

    if (this.hidePlacesListAfterSelect !== undefined) {
      options.hidePlacesListAfterSelect = this.hidePlacesListAfterSelect;
    }

    if (this.enablePlacesLazyLoading !== undefined) {
      options.enablePlacesLazyLoading = this.enablePlacesLazyLoading;
    }

    if (this.placesLimit) {
      options.placesLimit = this.placesLimit;
    }

    if (this.placesFilter) {
      options.placesFilter = this.placesFilter;
    }

    if (this.placesBias) {
      options.placesBias = this.placesBias;
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

    if (this.sendPlacesRequestFunc) {
      this.autocomplete.setSendPlacesRequestFunc(this.sendPlacesRequestFunc);
    }

    this.autocomplete.on('select', this.onSelect.bind(this));
    this.autocomplete.on('suggestions', this.onSuggestions.bind(this));
    this.autocomplete.on('input', this.onInput.bind(this));
    this.autocomplete.on('open', this.onOpen.bind(this));
    this.autocomplete.on('close', this.onClose.bind(this));
    this.autocomplete.on('request_start', this.onRequestStart.bind(this));
    this.autocomplete.on('request_end', this.onRequestEnd.bind(this));
    this.autocomplete.on('places', this.onPlaces.bind(this));
    this.autocomplete.on('places_request_start', this.onPlacesRequestStart.bind(this));
    this.autocomplete.on('places_request_end', this.onPlacesRequestEnd.bind(this));
    this.autocomplete.on('place_details_request_start', this.onPlaceDetailsRequestStart.bind(this));
    this.autocomplete.on('place_details_request_end', this.onPlaceDetailsRequestEnd.bind(this));
    this.autocomplete.on('place_select', this.onPlaceSelectEvent.bind(this));
    this.autocomplete.on('clear', this.onClear.bind(this));
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

  onRequestStart(value: any) {
    this.requestStart.emit(value);
  }

  onRequestEnd(value: any) {
    this.requestEnd.emit(value);
  }

  onPlaces(places: GeoJSON.Feature[]) {
    this.places.emit(places);
  }

  onPlacesRequestStart(value: Category) {
    this.placesRequestStart.emit(value);
  }

  onPlacesRequestEnd(value: {success: boolean, data?: any, error?: any}) {
    this.placesRequestEnd.emit(value);
  }

  onPlaceDetailsRequestStart(value: GeoJSON.Feature) {
    this.placeDetailsRequestStart.emit(value);
  }

  onPlaceDetailsRequestEnd(value: {success: boolean, data?: any, error?: any}) {
    this.placeDetailsRequestEnd.emit(value);
  }

  onPlaceSelectEvent(value: {place: GeoJSON.Feature, index: number}) {
    this.placeSelectEvent.emit(value);
  }

  onClear(value: ItemType) {
    this.clear.emit(value);
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

    if (changes['allowNonVerifiedHouseNumber'] &&
      !changes['allowNonVerifiedHouseNumber'].isFirstChange()) {
      this.autocomplete.setAllowNonVerifiedHouseNumber(changes['allowNonVerifiedHouseNumber'].currentValue);
    }

    if (changes['allowNonVerifiedStreet'] &&
      !changes['allowNonVerifiedStreet'].isFirstChange()) {
      this.autocomplete.setAllowNonVerifiedStreet(changes['allowNonVerifiedStreet'].currentValue);
    }

  }

  selectCategory(category: Category | string | string[] | null): Promise<void> {
    return this.autocomplete.selectCategory(category);
  }

  clearCategory(): Promise<void> {
    return this.autocomplete.clearCategory();
  }

  getCategory(): Category | null {
    return this.autocomplete.getCategory();
  }

  setPlacesLimit(limit: number): void {
    this.autocomplete.setPlacesLimit(limit);
  }

  sendPlacesRequest(): Promise<void> {
    return this.autocomplete.sendPlacesRequest();
  }

  resendPlacesRequestForMore(appendPlaces?: boolean): Promise<void> {
    return this.autocomplete.resendPlacesRequestForMore(appendPlaces);
  }

  selectPlace(index: number | null): void {
    this.autocomplete.selectPlace(index);
  }

  setPlacesFilterByCircle(filterByCircle: ByCircleOptions): void {
    this.autocomplete.setPlacesFilterByCircle(filterByCircle);
  }

  setPlacesFilterByRect(filterByRect: ByRectOptions): void {
    this.autocomplete.setPlacesFilterByRect(filterByRect);
  }

  setPlacesFilterByPlace(filterByPlace: string): void {
    this.autocomplete.setPlacesFilterByPlace(filterByPlace);
  }

  setPlacesFilterByGeometry(filterByGeometry: string): void {
    this.autocomplete.setPlacesFilterByGeometry(filterByGeometry);
  }

  clearPlacesFilters(): void {
    this.autocomplete.clearPlacesFilters();
  }

  setPlacesBiasByCircle(biasByCircle: ByCircleOptions): void {
    this.autocomplete.setPlacesBiasByCircle(biasByCircle);
  }

  setPlacesBiasByRect(biasByRect: ByRectOptions): void {
    this.autocomplete.setPlacesBiasByRect(biasByRect);
  }

  setPlacesBiasByProximity(biasByProximity: ByProximityOptions): void {
    this.autocomplete.setPlacesBiasByProximity(biasByProximity);
  }

  clearPlacesBias(): void {
    this.autocomplete.clearPlacesBias();
  }

  setValue(value: string): void {
    this.autocomplete.setValue(value);
  }

  getValue(): string {
    return this.autocomplete.getValue();
  }

  setAddDetails(addDetails: boolean): void {
    this.autocomplete.setAddDetails(addDetails);
  }

  setSkipIcons(skipIcons: boolean): void {
    this.autocomplete.setSkipIcons(skipIcons);
  }

  addFilterByPlace(filterByPlace: string): void {
    this.autocomplete.addFilterByPlace(filterByPlace);
  }

  clearFilters(): void {
    this.autocomplete.clearFilters();
  }

  clearBias(): void {
    this.autocomplete.clearBias();
  }

  isOpen(): boolean {
    return this.autocomplete.isOpen();
  }

  openDropdown(): void {
    this.autocomplete.open();
  }

  closeDropdown(): void {
    this.autocomplete.close();
  }

  sendGeocoderRequest(value: string): Promise<any> {
    return this.autocomplete.sendGeocoderRequest(value);
  }

  sendPlaceDetailsRequest(feature: any): Promise<any> {
    return this.autocomplete.sendPlaceDetailsRequest(feature);
  }

  ngOnDestroy() {
    if(this.autocomplete) {
      this.autocomplete.off('select');
      this.autocomplete.off('suggestions');
      this.autocomplete.off('input');
      this.autocomplete.off('open');
      this.autocomplete.off('close');
      this.autocomplete.off('request_start');
      this.autocomplete.off('request_end');
      this.autocomplete.off('places');
      this.autocomplete.off('places_request_start');
      this.autocomplete.off('places_request_end');
      this.autocomplete.off('place_details_request_start');
      this.autocomplete.off('place_details_request_end');
      this.autocomplete.off('place_select');
      this.autocomplete.off('clear');
    }
  }
}
