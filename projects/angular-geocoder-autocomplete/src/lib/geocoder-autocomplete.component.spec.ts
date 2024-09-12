import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocoderAutocompleteComponent } from './geocoder-autocomplete.component';
import { GEOAPIFY_CONFIG } from "./geoapify-config";

describe('GeocoderAutocompleteComponent', () => {
  let component: GeocoderAutocompleteComponent;
  let fixture: ComponentFixture<GeocoderAutocompleteComponent>;

  beforeEach(async(() => {
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
});
