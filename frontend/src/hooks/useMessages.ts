import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from '../api/messages';

export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: messagesApi.getConversations,
  });
}

export function useMessages(conversationId: number) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => messagesApi.getMessages(conversationId),
    enabled: !!conversationId,
    refetchInterval: 10000,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: messagesApi.sendMessage,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}
