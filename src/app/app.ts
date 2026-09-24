import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { TmdbService } from './services/tmdb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  peliculas: any[] = [];
  cargando: boolean = true;
  busqueda: string = '';

  peliculaSeleccionada: any = null;
  peliculasSimilares: any[] = [];
  cargandoSimilares: boolean = false;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.obtenerPeliculasPopulares();
  }

  obtenerPeliculasPopulares(): void {
    this.cargando = true;
    this.tmdbService.getPopularMovies().subscribe({
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

  buscarPeliculas(): void {
    if (!this.busqueda.trim()) {
      this.obtenerPeliculasPopulares();
      return;
    }

    this.cargando = true;
    this.tmdbService.searchMovies(this.busqueda).subscribe({
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