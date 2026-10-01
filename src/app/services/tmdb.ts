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

  // 1. Películas Populares
  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-MX&page=${page}`
    );
  }

  // 2. Buscador de Películas
  searchMovies(
    query: string,
    page: number = 1
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=es-MX&query=${encodeURIComponent(query)}&page=${page}`
    );
  }

  // 3. Películas Mejor Valoradas
  getTopRatedMovies(
    page: number = 1
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=es-MX&page=${page}`
    );
  }

  // 4. Películas Similares
  getSimilarMovies(
    movieId: number,
    page: number = 1
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${movieId}/similar?api_key=${this.apiKey}&language=es-MX&page=${page}`
    );
  }

  // 5. Lista de Géneros
  getGenres(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=es-MX`
    );
  }

  // 6. Películas por Género
  getMoviesByGenre(
    genreId: number,
    page: number = 1
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=es-MX&with_genres=${genreId}&page=${page}`
    );
  }

  // 7. Próximos Estrenos
  getUpcomingMovies(
    page: number = 1
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&language=es-MX&page=${page}`
    );
  }

  // 8. En Cartelera / Cines
  getNowPlayingMovies(
    page: number = 1
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=es-MX&page=${page}`
    );
  }

}