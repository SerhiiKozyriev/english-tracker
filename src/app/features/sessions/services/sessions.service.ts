import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../models/sessions';
import { Environment } from '../../../../environment/environment';

@Injectable()
export class SessionsService {
  private readonly http: HttpClient = inject(HttpClient);

  getSessions(search?: string): Observable<Session[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Session[]>(`${Environment.apiHost}/sessions/`, { params });
  }

  createSession(session: Omit<Session, '_id'>): Observable<Session> {
    return this.http.post<Session>(`${Environment.apiHost}/sessions/`, session);
  }

  deleteSession(id: string): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(
      `${Environment.apiHost}/sessions/${id}`,
    );
  }
}
