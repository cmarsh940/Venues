import { Injectable } from '@angular/core';

declare let ga: Function;

@Injectable()
export class AnalyticsService {
  
  public emitEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    ga("send", "event", {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }
}