import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGenericQuery = <T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, unknown>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
