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

      <div *ngIf="cargando" style="margin-top: 50px;">
        <p>Cargando películas mejor valoradas...</p>
      </div>

      <div *ngIf="!cargando" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 30px;">
        <div 
          *ngFor="let pelicula of peliculas" 
          (click)="verSimilares(pelicula)"
          style="width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor: pointer;"
        >
          <img 
            [src]="pelicula.poster_path ? 'https://image.tmdb.org/t/p/w500' + pelicula.poster_path : 'https://via.placeholder.com/500x750?text=Sin+Imagen'" 
            [alt]="pelicula.title" 
            style="width: 100%; border-radius: 6px;"
          />
          <h3 style="font-size: 15px; margin: 10px 0 5px 0;">{{ pelicula.title }}</h3>
          <p style="font-size: 13px; color: #666; margin: 0;">⭐ {{ pelicula.vote_average }}</p>
          <small style="color: #007bff; font-weight: bold;">Haz clic para ver similares</small>
        </div>
      </div>
    </div>

    <!-- Modal local -->
    <div *ngIf="peliculaSeleccionada" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000;">
      <div style="background: white; width: 80%; max-width: 800px; max-height: 85vh; overflow-y: auto; padding: 25px; border-radius: 12px; position: relative; text-align: center;">
        
        <button (click)="cerrarModal()" style="position: absolute; top: 15px; right: 20px; background: #ff4d4d; color: white; border: none; padding: 5px 12px; border-radius: 50%; font-size: 16px; cursor: pointer;">&times;</button>

        <h2>Películas similares a: "{{ peliculaSeleccionada.title }}"</h2>

        <div *ngIf="cargandoSimilares" style="padding: 20px;">
          <p>Buscando recomendaciones...</p>
        </div>

        <div *ngIf="!cargandoSimilares && peliculasSimilares.length === 0" style="padding: 30px; color: #666;">
          <p style="font-size: 16px;">⚠️ No se encontraron películas similares disponibles para este título.</p>
        </div>

        <div *ngIf="!cargandoSimilares && peliculasSimilares.length > 0" style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-top: 20px;">
          <div *ngFor="let similar of peliculasSimilares" style="width: 150px; border: 1px solid #eee; padding: 8px; border-radius: 6px;">
            <img 
              [src]="similar.poster_path ? 'https://image.tmdb.org/t/p/w500' + similar.poster_path : 'https://via.placeholder.com/500x750?text=Sin+Imagen'" 
              [alt]="similar.title" 
              style="width: 100%; border-radius: 4px;"
            />
            <h4 style="font-size: 13px; margin: 8px 0 4px 0;">{{ similar.title }}</h4>
            <p style="font-size: 12px; color: #666; margin: 0;">⭐ {{ similar.vote_average }}</p>
          </div>
        </div>

      </div>
    </div>
  `
})
export class TopRatedComponent implements OnInit {
  peliculas: any[] = [];
  cargando: boolean = true;

  peliculaSeleccionada: any = null;
  peliculasSimilares: any[] = [];
  cargandoSimilares: boolean = false;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.obtenerMejorValoradas();
  }

  obtenerMejorValoradas(): void {
    this.cargando = true;
    this.tmdbService.getTopRatedMovies().subscribe({
      next: (respuesta: any) => {
        this.peliculas = respuesta.results || [];
        this.cargando = false;
      },
      error: (err: any) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  verSimilares(pelicula: any): void {
    this.peliculaSeleccionada = pelicula;
    this.cargandoSimilares = true;
    this.peliculasSimilares = [];

    this.tmdbService.getSimilarMovies(pelicula.id).subscribe({
      next: (respuesta: any) => {
        this.peliculasSimilares = respuesta.results || [];
        this.cargandoSimilares = false;
      },
      error: (err: any) => {
        console.error(err);
        this.peliculasSimilares = [];
        this.cargandoSimilares = false;
      }
    });
  }

  cerrarModal(): void {
    this.peliculaSeleccionada = null;
    this.peliculasSimilares = [];
  }
}