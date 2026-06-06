import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportTicketsApi } from '../api/supportTickets';

export function useSupportTickets() {
  return useQuery({
    queryKey: ['supportTickets'],
    queryFn: supportTicketsApi.getAll,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: supportTicketsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
    },
  });
}

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) =>
      supportTicketsApi.updateStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
    },
  });
}
