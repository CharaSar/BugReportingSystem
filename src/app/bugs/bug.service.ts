import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Bug } from '../models/bug-model';
import { PageParameters } from '../models/pageParameters';
import { FilterParameters } from '../models/filterParams';

@Injectable({
  providedIn: 'root'
})

export class BugService {
  size:number = 30;
  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getBugs():Observable<Bug[]>{
    return this.http.get<Bug[]>(`${environment.apiUrl+'/bugs/'}?size=${this.size}`);
  }

  getBug(id):Observable<Bug>{
    return this.http.get<Bug>(environment.apiUrl+'/bugs/'+id);
  }

  createBug(bug):Observable<Bug>{
    return this.http.post<Bug>(environment.apiUrl+'/bugs',JSON.stringify(bug), this.httpOptions);
  }

  editBug(id, data): Observable<Bug> {
    return this.http.put<Bug>(environment.apiUrl+'/bugs/'+id,JSON.stringify(data), this.httpOptions);
  }

  getPageableBugs(pageableParams:PageParameters):Observable<HttpResponse<Bug[]>>{

    const params = new HttpParams()
    .set('page',pageableParams.page)
    .set('size',pageableParams.size)
    .set('sort',pageableParams.sort);
    
    return this.http.get<Bug[]>(environment.apiUrl+'/bugs/',{params,  observe: 'response'});
  }

  filteredBugs(filteredParams:FilterParameters):Observable<HttpResponse<Bug[]>>{

    const params = new HttpParams()
    .set('title',filteredParams.title)
    .set('priority',filteredParams.priority)
    .set('reporter',filteredParams.reporter)
    .set('status',filteredParams.status);
    
    return this.http.get<Bug[]>(environment.apiUrl+'/bugs/',{params,  observe: 'response'});
  }

  deleteBug(id){
    return this.http.delete<Bug>(environment.apiUrl+'/bugs/' + id, this.httpOptions);
  }

}
