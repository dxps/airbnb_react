import { env } from '@/lib/env';
import axios, { type AxiosRequestConfig } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import api from '@/api';
import { getItem, setItem } from '@/lib/utils';
import type { CachedData } from '@/types';

const DB = env.DB + '_cache_';
const CACHE_TIME = 5 * 60 * 1000; // Used to cache data for 5 minutes.

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef<AbortController>(null);

  const storageKey = useMemo(() => {
    if (!options?.params) {
      return DB + url;
    }

    return DB + url + '?' + JSON.stringify(options.params);
  }, [options, url]);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedData = getItem<CachedData<T>>(storageKey);

      if (cachedData && currentTime - cachedData.cachedAt < CACHE_TIME) {
        setData(cachedData.data);
        setIsLoading(false);
        return;
      }

      setError(null);
      setIsLoading(true);

      abortControllerRef.current = new AbortController();

      try {
        const response = await api.get<T>(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [options, url]);

  useEffect(() => {
    if (!data) return;

    setItem<CachedData<T>>(storageKey, {
      cachedAt: new Date().getTime(),
      data,
    });
  }, [data, storageKey]);

  return { data, error, isLoading };
};

export default useFetch;
