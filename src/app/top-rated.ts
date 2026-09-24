import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { TmdbService } from './services/tmdb';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  template: `
    <div style="text-align: center; padding: 20px; font-family: sans-serif;">
      <h1>⭐ Películas Mejor Valoradas</h1>
      <p>Las joyas cinematográficas con las mejores calificaciones</p>

      <div style="margin-bottom: 20px;">
        <a href="/" style="text-decoration: none; color: #007bff; font-weight: bold;">← Volver al Inicio</a>
      </div>

      <!-- Spinner -->
      <div *ngIf="cargando" style="margin-top: 50px;">
        <p>Cargando películas mejor valoradas...</p>
      </div>

      <!-- Cuadrícula de películas -->
      <div *ngIf="!cargando" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 30px;">
        <div *ngFor="let pelicula of peliculas" style="width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <img 
            [src]="pelicula.poster_path ? 'https://image.tmdb.org/t/p/w500' + pelicula.poster_path : 'https://via.placeholder.com/500x750?text=Sin+Imagen'" 
            [alt]="pelicula.title" 
            style="width: 100%; border-radius: 6px;"
          />
          <h3 style="font-size: 15px; margin: 10px 0 5px 0;">{{ pelicula.title }}</h3>
          <p style="font-size: 13px; color: #666; margin: 0;">⭐ {{ pelicula.vote_average }}</p>
        </div>
      </div>
    </div>
  `
})
export class TopRatedComponent implements OnInit {
  peliculas: any[] = [];
  cargando: boolean = true;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.obtenerMejorValoradas();
  }

  obtenerMejorValoradas(): void {
    this.cargando = true;
    this.tmdbService.getTopRatedMovies().subscribe({
      next: (respuesta: any) => {
        this.peliculas = respuesta.results;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al obtener mejor valoradas:', err);
        this.cargando = false;
      }
    });
  }
}