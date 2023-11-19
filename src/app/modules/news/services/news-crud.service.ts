import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, map, of, throwError } from 'rxjs';
import { News } from 'src/app/core/modals/news';
@Injectable({
  providedIn: 'root'
})
export class NewsCrudService {

  constructor(private Http:HttpClient) { }

  getAllnews():Observable<News[]>{
    return this.Http.get<News[]>('http://localhost:3000/news').pipe(catchError((err)=>{
      return throwError(()=>{
        return {
          success:false,
          data:null,
          message:err.message
        }
      })
    }))
  }
  createNews(news:any):Observable<News>{

    return this.Http.post<News>(`http://localhost:3000/news`,news).pipe(catchError((err:News)=>{
      return throwError(()=>{
        return {
          success:false
        }
      })
    }))
}
  getNews(id:number):Observable<News>{
    return this.Http.get<News>(`http://localhost:3000/news/${id}`)
  }
upDateNews(id:number,News:News):Observable<News>{
  return this.Http.patch<News>(`http://localhost:3000/news/${id}`,News)
}
  deleteNews(id:number):Observable<any>{
    return this.Http.delete<boolean>(`http://localhost:3000/news/${id}`).pipe(catchError((err:News)=>{
      return of<any>(false)
    }))
  }}
