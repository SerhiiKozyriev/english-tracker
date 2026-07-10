import { Category } from '@app/shared/category';

export interface Session {
  id: string;
  date: string;
  notes: string;
  duration: number;
  topics: SessionTopic[];
}

export interface SessionTopic {
  category: Category;
  desc: string[];
}

export interface SessionFormModel {
  date: string;
  notes: string;
  duration: number;
  topics: SessionTopic[];
}

export interface SessionStats {
  sessionsCount: number;
  hours: number;
  minutes: number;
  topicsCount: number;
  streak: number;
  statsByCategory: Record<string, number>;
}
