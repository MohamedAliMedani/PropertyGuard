import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi } from '../api/documents';

export function useDocumentsByRequest(requestId: number) {
  return useQuery({
    queryKey: ['documents', requestId],
    queryFn: () => documentsApi.getByRequest(requestId),
    enabled: !!requestId,
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, file }: { requestId: number; file: File }) =>
      documentsApi.upload(requestId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}
