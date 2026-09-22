import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from './services/tmdb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  peliculas: any[] = []; // Arreglo para almacenar el catálogo
  cargando: boolean = true;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    // Se ejecuta automáticamente al cargar la aplicación
    this.obtenerPeliculasPopulares();
  }

  // 👇 Método 1: Obtener películas populares
  obtenerPeliculasPopulares(): void {
    this.cargando = true;
    this.tmdbService.getPopularMovies().subscribe({
      next: (respuesta) => {
        this.peliculas = respuesta.results;
        this.cargando = false;
        console.log('Películas cargadas con éxito:', this.peliculas);
      },
      error: (err) => {
        console.error('Error al obtener las películas:', err);
        this.cargando = false;
      }
    });
  }
}