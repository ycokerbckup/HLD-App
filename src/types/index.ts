// Auth Types
export type UserRole = "member" | "sub_leader" | "hod" | "admin";
export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
}

// Members Types
export interface Member {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  trainingStatus: "observation" | "training" | "integrated";
  softwareProficiency: Record<string, number>;
  joinDate: string;
  image?: string;
}

// Announcements Types
export type AnnouncementPriority = "low" | "medium" | "high" | "urgent";
export type AnnouncementStatus = "draft" | "published" | "archived";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  pinned: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Schedule Types
export type ActivityType = "sunday" | "wednesday" | "tuesday" | "saturday" | "special";

export interface ScheduleEntry {
  id: string;
  date: string;
  type: ActivityType;
  description: string;
  location?: string;
  duration: number;
}

export interface MemberSchedule {
  id: string;
  memberId: string;
  scheduleEntryId: string;
  status: "assigned" | "present" | "absent" | "excused";
  notes?: string;
}

// Training Types
export type TrainingModule = "propresenter" | "vmix" | "resolume" | "hardware" | "networking";

export interface TrainingProgress {
  id: string;
  memberId: string;
  module: TrainingModule;
  status: "not_started" | "in_progress" | "completed";
  progress: number;
  completedAt?: string;
}

// Reports Types
export type ReportPriority = "low" | "medium" | "high" | "critical";
export type ReportStatus = "open" | "in_progress" | "resolved" | "closed";

export interface TechnicalReport {
  id: string;
  title: string;
  description: string;
  equipment: string;
  priority: ReportPriority;
  status: ReportStatus;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  resolvedAt?: string;
  notes?: string;
}

// Feedback Types
export type FeedbackType = "bug" | "feature" | "improvement" | "general";

export interface Feedback {
  id: string;
  type: FeedbackType;
  title: string;
  message: string;
  memberId: string;
  status: "open" | "reviewed" | "addressed";
  response?: string;
  createdAt: string;
  respondedAt?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  trainingInProgress: number;
  pendingReports: number;
}
