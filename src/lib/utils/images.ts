import { env } from '@/lib/env';

const PUBLIC_BASE_PATH = env.BASE_URL + '/assets';

export const getImageUrl = (filename: string) => {
  return new URL(`/assets/${filename}`, `${PUBLIC_BASE_PATH}`).href;
};
