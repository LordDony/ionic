import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API : string = '127.0.0.1/api/reports';
  constructor(private http : HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get(this.API+'/reports');
  }

  create(body:any) : Observable<any>{
    return this.http.post(this.API+'/reports', body);
  }

  delete(id : number) : Observable<any>{
    return this.http.delete(this.API+'/reports/'+id);
  }

  update(id : number, body : any) : Observable<any> {
    return this.http.put(this.API+'/reports/'+id,body);
  }
}
