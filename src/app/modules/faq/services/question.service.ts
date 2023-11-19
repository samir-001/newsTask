import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, map, of, throwError } from 'rxjs';
import { IQuestion } from '../../../core/modals/question';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private Http:HttpClient) { }

  getAllQuestions():Observable<IQuestion[]>{
    return this.Http.get<IQuestion[]>('http://localhost:3000/questions').pipe(catchError((err)=>{
      return throwError(()=>{
        return {
          success:false,
          data:null,
          message:err.message
        }
      })
    }))
  }
  createQuestion(newQuestion:IQuestion):Observable<IQuestion>{
    return this.Http.post<IQuestion>(`http://localhost:3000/questions`,newQuestion).pipe(catchError((err:IQuestion)=>{
      return throwError(()=>{
        return {
          success:false
        }
      })
    }))
}
  getQuestion(id:number):Observable<IQuestion|null>{
    return this.Http.get<IQuestion|null>(`http://localhost:3000/questions/${id}`).pipe(catchError((err:IQuestion)=>{
      return of<IQuestion|null>(null)
    }))
  }
upDateQuestion(id:number,newQuestion:IQuestion):Observable<IQuestion>{
  return this.Http.patch<IQuestion>(`http://localhost:3000/questions/${id}`,newQuestion)
}
  deleteQuestion(id:number):Observable<any>{
    return this.Http.delete<boolean>(`http://localhost:3000/questions/${id}`).pipe(catchError((err:IQuestion)=>{
      return of<any>(false)
    }))
  }
}
