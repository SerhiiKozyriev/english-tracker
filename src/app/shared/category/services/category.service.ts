import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Environment } from '../../../../environment/environment';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  private readonly http: HttpClient = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${Environment.apiHost}/categories/`);
  }
}
