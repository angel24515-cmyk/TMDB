import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  // Configuración base de la API de TMDB
  private apiKey: string = 'a6a7d14023a3b3901a511add1da22155'; // Reemplaza con tu API Key si no usas interceptor
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private lang: string = 'es-ES';

  constructor(private http: HttpClient) {}

  /**
   * 1. Obtener películas más populares
   */
  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=${this.lang}&page=${page}`);
  }

  /**
   * 2. Obtener películas mejor valoradas
   */
  getTopRatedMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=${this.lang}&page=${page}`);
  }

  /**
   * 3. Buscar películas por texto
   */
  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&language=${this.lang}&page=${page}`);
  }

  /**
   * 4. Obtener detalle completo de una película por ID
   */
  getMovieDetail(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=${this.lang}`);
  }

  /**
   * 5. Obtener el reparto (créditos/actores) de una película
   */
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}&language=${this.lang}`);
  }

  /**
   * 6. Obtener películas similares a una seleccionada
   */
  getSimilares(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/similar?api_key=${this.apiKey}&language=${this.lang}`);
  }

  /**
   * 7. Obtener lista de actores populares
   */
  getPopularActors(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/popular?api_key=${this.apiKey}&language=${this.lang}&page=${page}`);
  }

  /**
   * 8. Obtener la biografía y detalle completo de un actor
   */
  getActorDetail(personId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${personId}?api_key=${this.apiKey}&language=${this.lang}`);
  }
}