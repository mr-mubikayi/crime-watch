import { Locations } from './locations';

export interface Location {
  country: string;
  lat: number;
  lng: number;
  description: string;
  locations: Array<Locations>;
}
