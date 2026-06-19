import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from '../models/word';
import { Environment } from '../../../../environment/environment';

@Injectable()
export class VocabularyService {
  private readonly http: HttpClient = inject(HttpClient);

  getWords(search?: string, status?: string): Observable<Word[]> {
    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (status && status !== 'all') params = params.set('status', status);

    return this.http.get<Word[]>(`${Environment.apiHost}/vocabulary/`, { params });
  }

  getStats(): Observable<{ learned: number; learning: number; total: number }> {
    return this.http.get<{ learned: number; learning: number; total: number }>(
      `${Environment.apiHost}/vocabulary/stats`
    );
  }

  createWord(word: Omit<Word, '_id' | 'createdAt'>): Observable<Word> {
    return this.http.post<Word>(`${Environment.apiHost}/vocabulary/`, word);
  }

  updateWord(id: string, word: Partial<Word>): Observable<Word> {
    return this.http.patch<Word>(`${Environment.apiHost}/vocabulary/${id}`, word);
  }

  deleteWord(id: string): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(
      `${Environment.apiHost}/vocabulary/${id}`,
    );
  }
}
