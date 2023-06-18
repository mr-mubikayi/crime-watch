import { Coordinate } from './coordinate';

export interface Marker {
  coordinate: Coordinate;
  markerId: string;
  title: string;
  snippet: string;
}
