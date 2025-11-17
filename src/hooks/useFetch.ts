import axios, { type AxiosRequestConfig } from 'axios';
import { useEffect, useRef, useState } from 'react';
import api from '@/api';

const useFetch = <T>(url: string, options: AxiosRequestConfig) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef<AbortController>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      abortControllerRef.current = new AbortController();

      try {
        const response = await api.get(url, {
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

  return { data, error, isLoading };
};

export default useFetch;
