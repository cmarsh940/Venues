import { Pipe, PipeTransform } from '@angular/core';
import { Venue } from '../models/venue';

@Pipe({
  name: 'filterVenues',
  pure: false
})
export class FilterVenuesPipe implements PipeTransform {

  transform(venue_array: Array<Venue>, search: string): Array<Venue> {
    if (!venue_array) return [];
    search = search.toString().toLowerCase()

    return venue_array.filter(venue => {
      return venue.name.toString().toLowerCase().includes(search) || venue.category.toString().toLowerCase().includes(search)
    })
  }

}
