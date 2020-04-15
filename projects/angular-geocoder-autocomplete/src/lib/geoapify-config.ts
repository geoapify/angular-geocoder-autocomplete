import { InjectionToken } from '@angular/core';

export const GEOAPIFY_CONFIG = new InjectionToken<GeoapifyConfig>('geoapify.config');
export interface GeoapifyConfig {
    apiKey: string;
}