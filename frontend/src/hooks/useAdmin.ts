import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../api/admin';

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: adminApi.getDashboard,
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminApi.getUsers,
  });
}

export function useAdminExperts() {
  return useQuery({
    queryKey: ['admin', 'experts'],
    queryFn: adminApi.getExperts,
  });
}

export function useAdminRequests() {
  return useQuery({
    queryKey: ['admin', 'requests'],
    queryFn: adminApi.getAllRequests,
  });
}

export function useAssignExpert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.assignExpert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}
