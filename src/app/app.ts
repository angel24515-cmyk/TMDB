import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common'; // 👈 Asegúrate de incluir NgIf y NgFor
import { TmdbService } from './services/tmdb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor], // 👈 Agrégalos aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  peliculas: any[] = [];
  cargando: boolean = true;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.obtenerPeliculasPopulares();
  }

  obtenerPeliculasPopulares(): void {
    this.cargando = true;
    this.tmdbService.getPopularMovies().subscribe({
      next: (respuesta: any) => {
        this.peliculas = respuesta.results;
        this.cargando = false; // 👈 Aquí apaga el spinner cuando llegan las películas
        console.log('Películas cargadas con éxito:', this.peliculas);
      },
      error: (err: any) => {
        console.error('Error al obtener las películas:', err);
        this.cargando = false;
      }
    });
  }
}