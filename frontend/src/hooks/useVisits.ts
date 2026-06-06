import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitsApi } from '../api/visits';

export function useVisits() {
  return useQuery({
    queryKey: ['visits'],
    queryFn: visitsApi.getVisits,
  });
}

export function useUpdateVisitStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; status: number; notes?: string }) =>
      visitsApi.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    },
  });
}
