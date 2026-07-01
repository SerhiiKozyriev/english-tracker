import { TopicCategory } from '@app/shared/category';

export interface Session {
  id: string;
  date: string;
  notes: string;
  duration: number;
  topics: SessionTopic[];
}

export interface SessionTopic {
  category: TopicCategory;
  desc: string;
}

export type SessionFormModel = Omit<Session, 'id'>;
