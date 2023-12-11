import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathFinderService {

  constructor() { }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    console.log(distance)
    return distance;
  }

  findShortestPath(sourceData: any, destinationData: any, stopsData: any): { path: string[], distance: number } {
    const source = Object.keys(sourceData)[0]; // Extracting the source key
    const destination = Object.keys(destinationData)[0]; // Extracting the destination key

    const sourceLocation = {
      name: source,
      lat: parseFloat(sourceData[source].lat),
      lon: parseFloat(sourceData[source].lon)
    };
    const destinationLocation = {
      name: destination,
      lat: parseFloat(destinationData[destination].lat),
      lon: parseFloat(destinationData[destination].lon)
    };

    const stops = [];
    for (const stop in stopsData) {
      if (stopsData.hasOwnProperty(stop)) {
        stops.push({
          name: stop,
          lat: parseFloat(stopsData[stop].lat),
          lon: parseFloat(stopsData[stop].lon)
        });
      }
    }

    let shortestPath: string[] = [];
    let shortestDistance = Number.MAX_VALUE;
    const self = this

    function permute(arr: any[], m: any[] = []) {
      if (arr.length === 0) {
        const path = [sourceLocation, ...m, destinationLocation];
        let totalDistance = 0;
        for (let i = 0; i < path.length - 1; i++) {
          totalDistance += self.calculateDistance(
            path[i].lat, path[i].lon,
            path[i + 1].lat, path[i + 1].lon
          );
        }
        if (totalDistance < shortestDistance) {
          shortestDistance = totalDistance;
          shortestPath = path.map((point: any) => point.name);
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          const curr = arr.slice();
          const next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
        }
      }
    }

    permute(stops);

    return {
      path: shortestPath,
      distance: shortestDistance
    };
  }
}
