import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, map, of, throwError } from 'rxjs';
import { category } from 'src/app/core/modals/category';
@Injectable({
  providedIn: 'root'
})
export class CategoriesCrudService {

  constructor(private Http:HttpClient) { }

  getAllcategories():Observable<category[]>{
    return this.Http.get<category[]>('http://localhost:3000/categories').pipe(catchError((err)=>{
      return throwError(()=>{
        return {
          success:false,
          data:null,
          message:err.message
        }
      })
    }))
  }
  createCategory(newCategory:category):Observable<category>{
    return this.Http.post<category>(`http://localhost:3000/categories`,newCategory).pipe(catchError((err:category)=>{
      return throwError(()=>{
        return {
          success:false
        }
      })
    }))
}
  getCategory(id:number):Observable<category>{
    return this.Http.get<category>(`http://localhost:3000/categories/${id}`)
  }
upDateCategory(id:number,newCategory:category):Observable<category>{
  return this.Http.patch<category>(`http://localhost:3000/categories/${id}`,newCategory)
}
  deleteCategory(id:number):Observable<any>{
    return this.Http.delete<boolean>(`http://localhost:3000/categories/${id}`).pipe(catchError((err:category)=>{
      return of<any>(false)
    }))
  }}
