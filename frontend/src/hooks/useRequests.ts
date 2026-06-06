import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requestsApi } from '../api/requests';

export function useMyRequests() {
  return useQuery({
    queryKey: ['requests'],
    queryFn: requestsApi.getMyRequests,
  });
}

export function useRequest(id: number) {
  return useQuery({
    queryKey: ['requests', id],
    queryFn: () => requestsApi.getRequest(id),
    enabled: !!id,
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestsApi.createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}

export function useUpdateRequestStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; status: number; progress?: number; notes?: string }) =>
      requestsApi.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}
