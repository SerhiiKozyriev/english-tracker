import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environment/environment';
import { Word } from '../models/word';

@Injectable()
export class VocabularyService {
  private readonly http: HttpClient = inject(HttpClient);

  createWord(word: Omit<Word, '_id' | 'createdAt'>): Observable<Word> {
    return this.http.post<Word>(`${Environment.apiHost}/vocabulary/`, word);
  }

  deleteWord(id: string): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(`${Environment.apiHost}/vocabulary/${id}`);
  }

  getStats(): Observable<{ learned: number; learning: number; total: number }> {
    return this.http.get<{ learned: number; learning: number; total: number }>(
      `${Environment.apiHost}/vocabulary/stats`,
    );
  }

  getWords(search?: string, status?: string): Observable<Word[]> {
    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (status && status !== 'all') params = params.set('status', status);

    return this.http.get<Word[]>(`${Environment.apiHost}/vocabulary/`, { params });
  }

  updateWord(id: string, word: Partial<Word>): Observable<Word> {
    return this.http.patch<Word>(`${Environment.apiHost}/vocabulary/${id}`, word);
  }
}
