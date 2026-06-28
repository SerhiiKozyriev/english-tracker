export type WordStatus = 'all' | 'learning' | 'learned';

export interface Word {
  id: string;
  word: string;
  translation: string;
  status: WordStatus;
  createdAt: string;
  example: string;
}
export type WordFormModel = Omit<Word, 'id' | 'createdAt'>;
