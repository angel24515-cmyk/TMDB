import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'a6a7d14023a3b3901a511add1da22155';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopulares(): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-MX`;
    return this.http.get(url);
  }

  buscarPelicula(nombre: string): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${nombre}&language=es-MX`;
    return this.http.get(url);
  }
}