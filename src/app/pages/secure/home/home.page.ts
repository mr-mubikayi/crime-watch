import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Location } from '../../../models/interfaces/location';
import { Locations } from '../../../models/interfaces/locations';
import { Marker } from '../../../models/interfaces/marker';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild('map') public mapEl: ElementRef<HTMLElement>;

  public map: GoogleMap;

  public heading: string = null;
  public description: string = null;

  public locationOptions = {
    header: 'Free State',
    subHeader: 'Select a city from the list',
    message: '',
    translucent: true,
  };

  public locations: Array<Location> = [];
  private markers: Array<Marker> = [];
  private ids: Array<string> = [];

  constructor(
    private dataService: DataService) {
    this.locations = dataService.locations;
    this.heading      = 'Select a country from the above menu';
    this.description  = 'Interact with the markers that are displayed for each selected country';
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.map.removeAllMapListeners();
    this.map.destroy();
    this.map = undefined;
  }

  ionViewDidEnter() {
    setTimeout(async () => {
      await this.createMap();
    }, 500);
  }

  public selected(event: any): void {
    const locations =  this.locations.filter((item: any) => item.country === event.detail.value);
    this.location(locations[0]);
    if (this.markers.length > 0) {
      this.removeMarkers();
    }

    // Render to component view
    this.heading      = locations[0].country;
    this.description  = locations[0].description;
  }

  private async createMap(): Promise<void> {
    this.map = await GoogleMap.create({
      id: 'google-map',
      element: this.mapEl.nativeElement,
      apiKey: environment.keys.googleMaps,
      forceCreate: true,
      config: {
        center: {
          lat: -28.4541,
          lng: 26.7968
        },
        zoom: 5
      }
    });
  }

  private async location(selectedLocation: Location): Promise<void> {
    await this.manageMap(selectedLocation);
    await this.manageMarkers(selectedLocation);
  }

  private async manageMap(location: Location): Promise<void> {
    await this.map.setCamera({
      coordinate: {
        lat: location.lat,
        lng: location.lng,
      },
      zoom: 7
    });
  }

  private async manageMarkers(location: Location): Promise<void> {
    this.markers = this.generateMarkers(location.locations);
    this.ids = await this.map.addMarkers(this.markers);
    this.markers.map((marker, index) => {
      marker.markerId = this.ids[index];
    });
    await this.map.setOnMarkerClickListener((event) => {
      this.manageMarker(event);
    });
  }

  private manageMarker(event: any): void {
    const summary = this.markers.filter((item: any) => {
      if (item.markerId === event.markerId) {
        return item;
      }
    });

    // Render to component view
    this.heading = summary[0].title;
    this.description = summary[0].snippet;
  }

  private generateMarkers(locations: Array<Locations>): Array<any> {
    return locations.map((location: any, index: number) => ({
      coordinate: {
        lat: location.lat,
        lng: location.lng
      },
      title: location.name,
      snippet: location.description
    }));
  }

  private async removeMarkers(): Promise<void> {
    const markers = this.markers.map((marker) => marker.markerId);
    this.map.removeMarkers(markers);
    this.ids      = [];
    this.markers  = [];
  }
}
