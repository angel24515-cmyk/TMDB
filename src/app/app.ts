import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Importante para el buscador
import { TmdbService } from './services/tmdb';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule], // 👈 Agregado FormsModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  peliculas: any[] = [];
  cargando: boolean = true;
  textoBusqueda: string = ''; // Variable para almacenar el término buscado

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.obtenerPeliculasPopulares();
  }

  // Método 1
  obtenerPeliculasPopulares(): void {
    this.cargando = true;
    this.tmdbService.getPopularMovies().subscribe({
      next: (respuesta: any) => {
        this.peliculas = respuesta.results;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al obtener películas:', err);
        this.cargando = false;
      }
    });
  }

  // Método 2
  verDetalles(peliculaId: number): void {
    Swal.fire({
      title: 'Cargando información...',
      didOpen: () => { Swal.showLoading(); }
    });

    this.tmdbService.getMovieDetails(peliculaId).subscribe({
      next: (detalle: any) => {
        Swal.fire({
          title: detalle.title,
          text: detalle.overview || 'Sin sinopsis disponible.',
          imageUrl: detalle.poster_path ? `https://image.tmdb.org/t/p/w500${detalle.poster_path}` : '',
          imageWidth: 200,
          imageAlt: detalle.title,
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#0d6efd',
          footer: `<b>Estreno:</b> ${detalle.release_date} | <b>Puntuación:</b> ⭐ ${detalle.vote_average.toFixed(1)}`
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los detalles.'
        });
      }
    });
  }

  // Método 3: Lógica de búsqueda
  buscarPeliculas(): void {
    if (!this.textoBusqueda.trim()) {
      this.obtenerPeliculasPopulares();
      return;
    }

    this.cargando = true;
    this.tmdbService.searchMovies(this.textoBusqueda).subscribe({
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