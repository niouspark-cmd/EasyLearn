
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: UserRole;
  avatar: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'document' | 'quiz';
  completed: boolean;
  content?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  teacherName: string;
  teacherAvatar: string;
  studentCount: number;
  moduleCount: number;
  image: string;
  isPublic: boolean;
  progress?: number;
  modules: Module[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  year: number;
  type: 'WASSCE' | 'MOCK' | 'INTERNAL';
  questions: Question[];
  timeLimitMinutes: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  total: number;
  date: string;
  timeTaken: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  withUser: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
}
