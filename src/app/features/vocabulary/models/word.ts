export type WordStatus = 'all' | 'learning' | 'learned';

export interface Word {
  _id: string;
  word: string;
  translation: string;
  status: WordStatus;
  createdAt: string;
  example: string;
}
