import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Base url
  baseurl = 'http://10.54.223.19:3000';

 // Http Headers

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };




  constructor(private http: HttpClient) { }

  getData(table: string, fk: any = null): Observable<any> {
    let baseurl = '';
    if (fk === null) {
      baseurl = this.baseurl + '/api/' + table;
    } else {
      baseurl = this.baseurl + '/api/' + table + '/fk/' + fk;
    }
    return this.http.get<any>(baseurl)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  getLatitude(ini: string, fin:string): Observable<any> {
    let baseurl = '';
    baseurl = this.baseurl + '/api/estacion/latitud/' + ini + '/' + fin;
    return this.http.get<any>(baseurl)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}
