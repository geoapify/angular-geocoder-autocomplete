import { NgModule, ModuleWithProviders } from '@angular/core';
import { GeocoderAutocompleteComponent } from './geocoder-autocomplete.component';
import { GEOAPIFY_CONFIG } from './geoapify-config';

@NgModule({
  declarations: [GeocoderAutocompleteComponent],
  imports: [
  ],
  exports: [GeocoderAutocompleteComponent]
})
export class GeoapifyGeocoderAutocompleteModule {
  static withConfig( apiKey: string ): ModuleWithProviders<GeoapifyGeocoderAutocompleteModule> {
    return {
      ngModule: GeoapifyGeocoderAutocompleteModule,
      providers: [
        { provide: GEOAPIFY_CONFIG, useValue: { apiKey: apiKey }}
      ]
    };
  }
}
