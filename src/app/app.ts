import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router'; // 👈 Importamos las rutas
import { TmdbService } from './services/tmdb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, RouterOutlet, RouterModule], // 👈 Agregamos RouterOutlet y RouterModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  peliculas: any[] = [];
  cargando: boolean = true;
  busqueda: string = '';

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.obtenerPeliculasPopulares();
  }

  obtenerPeliculasPopulares(): void {
    this.cargando = true;
    this.tmdbService.getPopularMovies().subscribe({
      next: (respuesta: any) => {
        this.peliculas = respuesta.results;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al obtener las películas:', err);
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
        this.peliculas = respuesta.results;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error en la búsqueda:', err);
        this.cargando = false;
      }
    });
  }
}