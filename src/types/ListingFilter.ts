import type { Availability } from '@/types';

export class ListingFilter {
  dates: Availability;
  guests?: number;
  search?: string;

  constructor({ dates, guests, search }: ListingFilter) {
    this.dates = dates;
    this.guests = guests || 0;
    this.search = search || '';
  }
}
