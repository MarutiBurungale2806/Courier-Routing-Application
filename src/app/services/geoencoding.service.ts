import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoencodingService {
  apiUrlForCities = 'https://api.countrystatecity.in/v1/countries';
  apiUrlforGeocode = 'https://geocode.maps.co/search?q='

  apiKey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';

  httpOptions = {
    headers: new HttpHeaders({
      'X-CSCAPI-KEY': this.apiKey
    })
  };

  constructor(private http: HttpClient) {}
  
  getCities(countryCode: string, stateCode: string): Observable<any> {
    const url = `${this.apiUrlForCities}/${countryCode}/states/${stateCode}/cities`;
    return this.http.get<any>(url, this.httpOptions);
  }

  getCoordinates(location: string): Observable<any> {
    const url = `${this.apiUrlforGeocode}${location}`;
    return this.http.get(url)
  }
}