import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, map, of, throwError } from 'rxjs';
import { Tag } from 'src/app/core/modals/tag';
@Injectable({
  providedIn: 'root',
})
export class TagsCrudService {
  constructor(private Http: HttpClient) {}

  getAlltags(): Observable<Tag[]> {
    return this.Http.get<Tag[]>('http://localhost:3000/tags').pipe(
      catchError((err) => {
        return throwError(() => {
          return {
            success: false,
            data: null,
            message: err.message,
          };
        });
      })
    );
  }
  createTag(newTag: Tag): Observable<Tag> {
    return this.Http.post<Tag>(`http://localhost:3000/tags`, newTag).pipe(
      catchError((err: Tag) => {
        return throwError(() => {
          return {
            success: false,
          };
        });
      })
    );
  }
  getTag(id: number): Observable<Tag | null> {
    return this.Http.get<Tag | null>(`http://localhost:3000/tags/${id}`).pipe(
      catchError((err: Tag) => {
        return of<Tag | null>(null);
      })
    );
  }
  upDateTag(id: number, newTag: Tag): Observable<Tag> {
    return this.Http.patch<Tag>(`http://localhost:3000/tags/${id}`, newTag);
  }
  deleteTag(id: number): Observable<any> {
    return this.Http.delete<boolean>(`http://localhost:3000/tags/${id}`).pipe(
      catchError((err: Tag) => {
        return of<any>(false);
      })
    );
  }
}
