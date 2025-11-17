export type CachedData<T> = {
  /** The data that is cached. */
  data: T;

  /**
   * The time when the data was cached.
   * The time is the Epoch time: the value in milliseconds since midnight, January 1, 1970 UTC.
   */
  cachedAt: number;
};
