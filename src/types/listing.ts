export type Listing = {
  id: number;
  name: string;
  images: [string, ...string[]]; // At least one image exists.
};
