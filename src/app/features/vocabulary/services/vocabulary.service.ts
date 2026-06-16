import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word } from '../models/word';
import { Environment } from '../../../../environment/environment';

@Injectable()
export class VocabularyService {
  private readonly http: HttpClient = inject(HttpClient);

  getWords(search?: string): Observable<Word[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Word[]>(`${Environment.apiHost}/vocabulary/`, { params });
  }

  createWord(word: Omit<Word, '_id' | 'createdAt'>): Observable<Word> {
    return this.http.post<Word>(`${Environment.apiHost}/vocabulary/`, word);
  }

  deleteWord(id: string): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(
      `${Environment.apiHost}/vocabulary/${id}`,
    );
  }
}
