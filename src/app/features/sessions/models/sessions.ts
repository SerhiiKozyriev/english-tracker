import { TopicCategory } from './category';

export interface Session {
  _id: string;
  date: string;
  notes: string | null;
  duration: number;
  topics: SessionTopic[];
}

export interface SessionTopic {
  category: TopicCategory;
  desc: string;
}

export type SessionFormModel = Omit<Session, '_id'>;
