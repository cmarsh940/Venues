import { Pipe, PipeTransform } from '@angular/core';
import { Venue } from '../models/venue';

@Pipe({
  name: 'filterVenues',
  pure: false
})
export class FilterVenuesPipe implements PipeTransform {

  transform(venue_array: Array<Venue>, search: string): Array<Venue> {
    search = search.toLowerCase()

    return venue_array.filter(venue => {
      return venue.name.toLowerCase().includes(search) || venue.category.toLowerCase().includes(search)
    })
  }

}
