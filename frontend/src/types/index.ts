export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'Customer' | 'Lawyer' | 'Engineer' | 'GovExpert' | 'Admin';
  avatarUrl?: string;
  preferredLanguage: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  preferredLanguage: string;
}

export interface VerificationRequest {
  id: number;
  requestNumber: string;
  propertyType: string;
  location: string;
  address?: string;
  propertyPrice?: number;
  status: string;
  progress: number;
  submittedDate: string;
  estimatedCompletion?: string;
  packageName: string;
  packagePrice: number;
  notes?: string;
  timeline?: TimelineStep[];
  experts?: AssignedExpert[];
  documents?: Document[];
}

export interface TimelineStep {
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  description?: string;
}

export interface AssignedExpert {
  role: string;
  name: string;
  status: string;
  hasReport: boolean;
}

export interface Document {
  id: number;
  fileName: string;
  fileSize: number;
  contentType: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ServicePackage {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
  isPopular: boolean;
  requiredExpertRole: 'Lawyer' | 'Engineer' | 'GovExpert';
  estimatedDays: number;
}

export interface Payment {
  id: number;
  transactionNumber: string;
  requestNumber: string;
  amount: number;
  method: string;
  status: string;
  paidAt?: string;
  createdAt: string;
}

export interface Conversation {
  id: number;
  requestNumber: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Message {
  id: number;
  senderId: string;
  senderName: string;
  text: string;
  isRead: boolean;
  sentAt: string;
}

export interface Visit {
  id: number;
  requestNumber: string;
  propertyInfo: string;
  customerName: string;
  expertName: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  status: string;
  completedAt?: string;
}

export interface Notification {
  id: number;
  title: string;
  body: string;
  type?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeRequests: number;
  monthlyRevenue: number;
  activeExperts: number;
  usersChange: string;
  requestsChange: string;
  revenueChange: string;
  pendingApprovals: number;
  monthlyData: { month: string; requests: number; revenue: number }[];
  packageDistribution: { name: string; value: number; color: string }[];
}
