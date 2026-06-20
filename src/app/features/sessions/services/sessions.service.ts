import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environment/environment';
import { Session } from '../models/sessions';

@Injectable()
export class SessionsService {
  private readonly http: HttpClient = inject(HttpClient);

  createSession(session: Partial<Session>): Observable<Session> {
    return this.http.post<Session>(`${Environment.apiHost}/sessions/`, session);
  }

  deleteSession(id: string): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(`${Environment.apiHost}/sessions/${id}`);
  }

  getSessions(search?: string): Observable<Session[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Session[]>(`${Environment.apiHost}/sessions/`, { params });
  }

  updateSession(id: string, session: Partial<Session>): Observable<Session> {
    return this.http.patch<Session>(`${Environment.apiHost}/sessions/${id}`, session);
  }
}
