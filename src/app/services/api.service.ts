import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API : string = 'http://127.0.0.1:3000/api/v1';
  constructor(private http : HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get(this.API+'/users');
  }

  create(body:any) : Observable<any>{
    return this.http.post(this.API+'/users', body);
  }

  delete(id : number) : Observable<any>{
    return this.http.delete(this.API+'/users/'+id);
  }

  update(id : number, body : any) : Observable<any> {
    return this.http.put(this.API+'/users/'+id,body);
  }
}
