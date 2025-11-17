import { getDatabaseTable } from './helpers';

type Review = {
  id: number;
  userId: number;
  listingId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getReviewsByListingId = (listingId: number | string): Review[] => {
  const reviews = getDatabaseTable<Review[]>('reviews');
  if (!reviews) {
    console.log('>>> [getReviewsByListingId] No reviews db table found');
    return [];
  }

  const idNum = Number(listingId);
  return reviews.filter((review) => review.listingId === idNum);
};
