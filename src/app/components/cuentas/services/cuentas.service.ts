import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ GlobalConstants } from '../../../global-constants';
const baseUrl = GlobalConstants.baseUrlCuentas;
@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  searchByNumeroCuenta(numeroCuenta: any): Observable<any> {
    return this.http.get(`${baseUrl}?numeroCuenta=${numeroCuenta}`);
  }
}