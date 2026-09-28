import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from './services/tmdb';

declare const Swal: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  peliculasPopulares: any[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.tmdbService.getPopulares().subscribe({
      next: (data) => {
        this.peliculasPopulares = data.results;
      },
      error: (err) => console.error(err)
    });
  }
  busqueda: string = '';
  imgBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

  buscar(): void {
    if (!this.busqueda.trim()) {
      this.ngOnInit(); 
      return;
    }

    this.tmdbService.buscarPelicula(this.busqueda).subscribe({
      next: (data) => {
        this.peliculasPopulares = data.results;
      },
      error: (err) => console.error(err)
    });
  }

  verDetalle(pelicula: any): void {
    Swal.fire({
      title: pelicula.title,
      html: `
        <div class="text-start">
          <p><strong>Fecha de estreno:</strong> ${pelicula.release_date || 'N/A'}</p>
          <p><strong>Calificación:</strong> ${pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A'}</p>
          <p><strong>Sinopsis:</strong> ${pelicula.overview || 'Sin descripción disponible.'}</p>
        </div>
      `,
      imageUrl: pelicula.poster_path ? `${this.imgBaseUrl}${pelicula.poster_path}` : 'https://via.placeholder.com/300x450',
      imageHeight: 250,
      confirmButtonText: 'Cerrar',
      customClass: { confirmButton: 'btn btn-primary' }
    });
  }

}