import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  // ⚠️ Asegúrate de colocar tu API Key real de TMDB dentro de las comillas
  private apiKey = 'a6a7d14023a3b3901a511add1da22155'; 
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-MX&page=${page}`);
  }
}