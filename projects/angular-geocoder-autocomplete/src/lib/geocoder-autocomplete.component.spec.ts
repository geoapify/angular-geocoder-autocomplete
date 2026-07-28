import { SimpleChange } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocoderAutocompleteComponent } from './geocoder-autocomplete.component';
import { GEOAPIFY_CONFIG } from "./geoapify-config";

describe('GeocoderAutocompleteComponent', () => {
  let component: GeocoderAutocompleteComponent;
  let fixture: ComponentFixture<GeocoderAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GeocoderAutocompleteComponent],
      providers: [
        { provide: GEOAPIFY_CONFIG, useValue: { apiKey: 'your-api-key' } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeocoderAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the geocoder request result as one event object', () => {
    const emit = spyOn(component.requestEnd, 'emit');
    const data = { features: [] };

    component.onRequestEnd(true, data);

    expect(emit).toHaveBeenCalledWith({ success: true, data, error: undefined });
  });

  it('should emit the places request error as one event object', () => {
    const emit = spyOn(component.placesByCategoryRequestEnd, 'emit');
    const error = new Error('Request failed');

    component.onPlacesByCategoryRequestEnd(false, undefined, error);

    expect(emit).toHaveBeenCalledWith({ success: false, data: undefined, error });
  });

  it('should emit the place details result as one event object', () => {
    const emit = spyOn(component.placeDetailsRequestEnd, 'emit');
    const data = { properties: { formatted: 'Berlin, Germany' } };

    component.onPlaceDetailsRequestEnd(true, data);

    expect(emit).toHaveBeenCalledWith({ success: true, data, error: undefined });
  });

  it('should combine place and index in the category selection event', () => {
    const emit = spyOn(component.placeByCategorySelect, 'emit');
    const place = { properties: { name: 'Cafe' } };

    component.onPlaceByCategorySelect(place, 2);

    expect(emit).toHaveBeenCalledWith({ place, index: 2 });
  });

  it('should direct deprecated position users to biasByProximity', () => {
    const warn = spyOn(console, 'warn');
    const position = { lat: 52.52, lon: 13.405 };

    component.ngOnChanges({
      position: new SimpleChange(undefined, position, false)
    });

    expect(warn).toHaveBeenCalledWith(
      jasmine.stringContaining("'biasByProximity'")
    );
  });
});
