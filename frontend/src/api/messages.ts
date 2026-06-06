import client from './client';
import type { Conversation, Message } from '../types';

export const messagesApi = {
  getConversations: async (): Promise<Conversation[]> => {
    const response = await client.get('/messages/conversations');
    return response.data;
  },

  getMessages: async (conversationId: number): Promise<Message[]> => {
    const response = await client.get(`/messages/conversations/${conversationId}`);
    return response.data;
  },

  sendMessage: async (data: { conversationId: number; text: string }) => {
    const response = await client.post('/messages', data);
    return response.data;
  },
};
