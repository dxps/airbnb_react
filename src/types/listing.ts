export class Listing {
  id: number;
  name: string;
  description: string;
  locationId: number;
  images: [string, ...string[]]; // At least one image exists.
  availability: Availability;
  maxGuests: number;
  price: number;
  rating: number;
  guestFavorite?: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(listing: Listing) {
    this.id = listing.id;
    this.name = listing.name;
    this.description = listing.description;
    this.locationId = listing.locationId;
    this.images = listing.images;
    this.availability = listing.availability;
    this.maxGuests = listing.maxGuests;
    this.price = listing.price;
    this.rating = listing.rating;
    this.guestFavorite = listing.guestFavorite || false;
    this.userId = listing.userId;
    this.createdAt = listing.createdAt || new Date();
    this.updatedAt = listing.updatedAt || new Date();
  }
}

export type Availability = {
  from: Date;
  to: Date;
};
