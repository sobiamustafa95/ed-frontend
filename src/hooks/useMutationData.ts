import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useGenericMutation = <T, U>(
  mutationFn: (data: T) => Promise<U>,
  options?: Omit<UseMutationOptions<U, unknown, T>, 'mutationFn'>,
) => {
  return useMutation({
    mutationFn: mutationFn,
    ...options,
  });
};
