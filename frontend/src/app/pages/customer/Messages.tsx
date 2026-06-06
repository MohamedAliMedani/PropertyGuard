import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useConversations, useMessages, useSendMessage } from '../../../hooks/useMessages';
import { useAuth } from '../../../contexts/AuthContext';

export function Messages() {
  const [message, setMessage] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: conversations, isLoading: conversationsLoading } = useConversations();
  const { data: messages, isLoading: messagesLoading } = useMessages(selectedConversationId || 0);
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage();

  const conversationsList = conversations || [];
  const messagesList = messages || [];

  // Auto-select the first conversation if none selected
  useEffect(() => {
    if (!selectedConversationId && conversationsList.length > 0) {
      setSelectedConversationId(conversationsList[0].id);
    }
  }, [selectedConversationId, conversationsList]);

  const selectedConversation = conversationsList.find(c => c.id === selectedConversationId);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversationId) return;
    try {
      await sendMessage({ conversationId: selectedConversationId, text: message });
      setMessage("");
    } catch {
      // Error handled by React Query
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (conversationsLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;

  return (
    <div className="h-[calc(100vh-12rem)]">
      <h1 className="text-3xl font-bold mb-6">{t('messages.title')}</h1>
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
        {/* Conversations List */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">{t('messages.conversations')}</h2>
          </div>
          <div className="divide-y divide-border">
            {conversationsList.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                {t('messages.noConversations', { defaultValue: 'No conversations yet' })}
              </div>
            )}
            {conversationsList.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`w-full p-4 text-left hover:bg-muted transition-colors ${selectedConversationId === conv.id ? 'bg-muted' : ''}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="font-medium">{conv.requestNumber}</div>
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 bg-[#dc2626] text-white text-xs rounded-full flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground truncate">{conv.lastMessage}</div>
                <div className="text-xs text-muted-foreground mt-1">{conv.lastMessageAt}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-border">
                <div className="font-semibold">{selectedConversation.requestNumber}</div>
                <div className="text-sm text-muted-foreground">{t('messages.legalExpert')}</div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messagesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-muted-foreground">{t('common.loading')}</div>
                  </div>
                ) : (
                  messagesList.map((msg) => {
                    const isMe = msg.senderId === user?.id;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg ${isMe ? 'bg-[#059669] text-white' : 'bg-muted'}`}>
                          {!isMe && <div className="text-xs font-medium mb-1">{msg.senderName}</div>}
                          <div className="text-sm">{msg.text}</div>
                          <div className={`text-xs mt-1 ${isMe ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {msg.sentAt}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                {!messagesLoading && messagesList.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    {t('messages.noMessages', { defaultValue: 'No messages yet. Start the conversation!' })}
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('messages.typePlaceholder')}
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                    disabled={isSending}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isSending || !message.trim()}
                    className="px-4 py-2 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p className="text-sm">{t('messages.selectConversation', { defaultValue: 'Select a conversation to start messaging' })}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
