import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export abstract class BaseService<T = any> {
  protected _baseUrl: string
  public serverUrl!: string

  constructor(protected http: HttpClient) {
    this._baseUrl = this.config();
    this.serverUrl = `${environment.API_URL}`;
  }

  abstract config(): string

  public get(url: string): Observable<T[] | T> {
    const useUrl = url ? "/" + url : "" 
    return this.http
      .get<T[] | T>(`${this.serverUrl}${this._baseUrl}${useUrl}`)
      .pipe(
        catchError(
          (error): Observable<never[]> => this.handlerError(error)
        )
      );
  }

  public post(
    url: string,
    body: any,
    header?: HttpHeaders
  ): Observable<any> {
    return this.http
      .post<any>(`${this.serverUrl}${this._baseUrl}${url}`, body, {
        headers: header,
      })
      .pipe(
        catchError(
          (error): Observable<any> => this.handlerError(error)
        )
      );
  }

  public put(
    url: string,
    body: any,
  ): Observable<any> {
    const useUrl = url ? "/" + url : "" 
    return this.http
      .put<any>(`${this.serverUrl}${this._baseUrl}${useUrl}`, body)
      .pipe(
        catchError(
          (error): Observable<any> => this.handlerError(error)
        )
      );
  }

  public delete(url: string): Observable<any> {
    const useUrl = url ? "/" + url : "" 
    return this.http
      .delete<any>(`${this.serverUrl}${this._baseUrl}${useUrl}`)
      .pipe(
        catchError(
          (error): Observable<any> => this.handlerError(error)
        )
      );
  }

  private handlerError(error: any): any {
    let message

    if (error.error) {
      let message = error.error.message;

      if (!message) {
        message = 'Error';
      }
    }

    const errorObj = {error: message}

    return throwError(() => errorObj || { data: [] });
  }
}
