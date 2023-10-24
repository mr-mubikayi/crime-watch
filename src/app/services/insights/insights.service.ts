import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  private endpoint = 'https://www.numbeo.com/api/city_crime_raw?api_key=wl1rvko3ziykgx&query=bloemfontein%20South%20Africa';

  constructor(private http: HttpClient) {

  }

  getCityCrimeData(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }
}
