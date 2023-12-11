import { Component, Renderer2, ElementRef } from '@angular/core';
import { GeoencodingService } from '../../services/geoencoding.service';
import { PathFinderService } from 'src/app/services/path-finder.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css'],
})
export class RouteFormComponent {
  source: string = '';
  destination: string = '';
  calculatedDistance: number = 0;
  showDistance: boolean = false;
  stops: { name: string }[] = [{ name: '' }];
  stopsCoords: { [key: string]: { lat: number; lon: number } } = {};
  steps: string[] = [];
  countries: any[] = [];
  states: any[] = [];
  cityControl = new FormControl();
  citiesData: any[] = [ /* Populate with your cities data */ ];
  cities: any[] = [];
  filteredCities: any[] = [];
  constructor(
    private geocodingService: GeoencodingService,
    private pathFinderService: PathFinderService,
  ) {

    this.loadCities('IN', 'MH')

    this.cityControl.valueChanges.subscribe((query: string) => {
      this.filterCities(query);
    });
  }


  filterCities(query: string): void {
    this.filteredCities = this.cities.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.loadCities('IN','MH')
  }

  loadCities(countryCode: string, stateCode: string): void {
    this.geocodingService.getCities(countryCode, stateCode).subscribe(
      (response: any[]) => {
        this.cities = response;
        this.filteredCities = response
      },
      (error) => {
        console.error('Error loading cities:', error);
      }
    );
  }

   // Add a new empty stop object to the stops array
  addStop(): void {
    this.stops.push({ name: '' });
  }
  reset(): void {
    this.stops =[{ name: '' }];
    this.source = '';
    this.destination = '';
  }

  // Function used to calculate the total travveld distance from source to destination and also used to get the path
  calculateDistance(): void {
    const sourceCoords: { [key: string]: { lat: number; lon: number } } = {};
    const destCoords: { [key: string]: { lat: number; lon: number } } = {};

    const getSourceCoordinates = async (): Promise<any> => {
      try {
        const sourceData: any = await this.geocodingService
          .getCoordinates(this.source)
          .toPromise();
        sourceCoords[this.source] = {
          lat: sourceData[0].lat,
          lon: sourceData[0].lon,
        };
      } catch (error) {
        console.error('Error fetching source coordinates:', error);
      }
    };

    const getDestinationCoordinates = async (): Promise<any> => {
      try {
        const destData: any = await this.geocodingService
          .getCoordinates(this.destination)
          .toPromise();
        destCoords[this.destination] = {
          lat: destData[0].lat,
          lon: destData[0].lon,
        };
      } catch (error) {
        console.error('Error fetching destination coordinates:', error);
      }
    };

    const calculateAndShowDistance = async () => {
      await getSourceCoordinates();
      await getDestinationCoordinates();
      await this.fetchCoordinatesForStops();

      const result = this.pathFinderService.findShortestPath(
        sourceCoords,
        destCoords,
        this.stopsCoords
      );
      this.steps = result.path;
      this.calculatedDistance = result.distance;
      this.showDistance = true;
    };

    calculateAndShowDistance();
  }

  async fetchCoordinatesForStops(): Promise<void> {
    const delayBetweenRequests = 1000;
    for (const stop of this.stops) {
      const stopName = stop.name;
      if (stopName) {
        try {
          const data: any = await this.geocodingService
            .getCoordinates(stopName)
            .toPromise();
          this.stopsCoords[stopName] = {
            lat: data[0].lat,
            lon: data[0].lon,
          };
        } catch (error) {
          console.error('Error fetching coordinates for stop', stopName, error);
          // Handle errors if needed
        }
      }
      await this.delay(delayBetweenRequests); // Wait before fetching the next stop coordinates
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
