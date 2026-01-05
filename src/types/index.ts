export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  color: string;
}

export interface StudySession {
  id: string;
  duration: number; // in minutes
  breakDuration: number; // in minutes
  completedSessions: number;
  startedAt?: Date;
}

export type View = 'dashboard' | 'notes' | 'tasks' | 'schedule' | 'study';
