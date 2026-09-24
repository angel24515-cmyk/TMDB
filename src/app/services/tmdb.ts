import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'a6a7d14023a3b3901a511add1da22155';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // 1. Películas Populares (Inicio)
  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-MX&page=${page}`);
  }

  // 2. Buscador de Películas
  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=es-MX&query=${encodeURIComponent(query)}&page=${page}`);
  }

  // 3. Películas Mejor Valoradas (Top Rated)
  getTopRatedMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=es-MX&page=${page}`);
  }

  // 4. Películas Similares / Recomendaciones
  getSimilarMovies(movieId: number, page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/similar?api_key=${this.apiKey}&language=es-MX&page=${page}`);
  }
}