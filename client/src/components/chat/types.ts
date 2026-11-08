export type ChatKind = "text" | "image" | "audio" | "video" | "file";

export type ChatAttachment = {
  url: string;
  name: string;
  size: number | null;
  mime: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
};

export type ChatReply = {
  id: number;
  senderId: number | null;
  content: string;
  kind: string;
  attachmentName: string | null;
  deleted: boolean;
};

export type ChatMessage = {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  kind: ChatKind | string;
  isRead: boolean;
  createdAt: string;
  deliveredAt: string | null;
  readAt: string | null;
  editedAt: string | null;
  deletedAt: string | null;
  clientId: string | null;
  attachment: ChatAttachment | null;
  replyTo: ChatReply | null;
  reactions: Record<string, number[]>;
  // Solo en el navegador, mientras se envía
  pending?: "sending" | "error";
  progress?: number;
  localPreview?: string;
  errorText?: string;
};

export type ChatUser = { id: number; username: string; displayName: string | null; avatarUrl: string | null };

export type Conversation = {
  user: ChatUser;
  lastMessage: {
    id: number;
    content: string;
    senderId: number;
    createdAt: string;
    isRead: boolean;
    kind?: string;
    deletedAt?: string | null;
    deliveredAt?: string | null;
    readAt?: string | null;
  } | null;
  unreadCount: number;
  online?: boolean;
};

export type ThreadData = { messages: ChatMessage[]; hasMore: boolean };
