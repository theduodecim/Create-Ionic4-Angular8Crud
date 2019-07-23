import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';
import { Observable, of } from 'rxjs';
// tslint:disable:variable-name
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/products';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }
  // errorHandler function
  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(product => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  // tslint:disable-next-line:variable-name
  getProduct(_id: any): Observable<Product> {
    const url = `${apiUrl}/${_id}`;
    return this.http.get<Product>(url).pipe(
      tap(() => console.log(`fetched product _id=${_id}`)),
      catchError(this.handleError<Product>(`getProduct _id=${_id}`))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((prod: Product) => console.log(`added product w/ _id=${prod._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }


  updateProduct(_id: any, product: any): Observable<any> {
    const url = `${apiUrl}/${_id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(() => console.log(`updated product _id=${_id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(_id: any): Observable<Product> {
    const url = `${apiUrl}/${_id}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(() => console.log(`deleted product _id=${_id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

}
