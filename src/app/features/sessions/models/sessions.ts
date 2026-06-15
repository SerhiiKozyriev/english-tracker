import { TopicCategory } from './category';

export interface Session {
  _id: string;
  date: string;
  notes: string | null;
  duration: number | null;
  topics: SessionTopic[];
}

export interface SessionTopic {
  category: TopicCategory;
  desc: string;
}
