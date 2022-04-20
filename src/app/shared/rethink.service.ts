import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RethinkService {

// Base url
baseurl = 'http://10.54.217.85:8000';

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

  getData(): Observable<any> {

    var baseurl = this.baseurl + '/stations/';
    console.log(baseurl);
    return this.http.get<any>(baseurl)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getGraph(net:string, stat:string): Observable<any> {
    var baseurl = 'http://10.54.217.85:8000/image/' + net + '/' + stat;
    return this.http.get<any>(baseurl)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
    
  }

  getPlot(stat:string): Observable<any> {
    var baseurl = 'http://10.54.217.85:8000/gps/' + stat;
    return this.http.get<any>(baseurl)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
    
  }

}