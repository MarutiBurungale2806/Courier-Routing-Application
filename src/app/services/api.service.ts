import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://geocode.maps.co/search'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // getLocation(city: string): Observable<any> {
  //   // Mocked method to get location data based on city name
  //   // Replace with your actual API endpoint for fetching location by city name
  //   return this.http.get<any>(`${this.apiUrl}/location?city=${city}`).pipe(
  //     catchError((error: any) => {
  //       // Handle API errors here
  //       console.error('Error fetching location:', error);
  //       return [];
  //     })
  //   );
  // }
  getLocation(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${city}`);
  }

  getIntermediateStops(start: string, end: string, count: number): Observable<any[]> {
    // Mocked method to get intermediate stops between start and end points
    // Replace with your actual API endpoint for fetching intermediate stops
    return this.http.get<any[]>(`${this.apiUrl}/stops?start=${start}&end=${end}&count=${count}`).pipe(
      catchError((error: any) => {
        // Handle API errors here
        console.error('Error fetching intermediate stops:', error);
        return [];
      })
    );
  }
}
