import { useQuery } from '@tanstack/react-query';
import { packagesApi } from '../api/packages';

export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: packagesApi.getAll,
    staleTime: 30 * 60 * 1000,
  });
}
