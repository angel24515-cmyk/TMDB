import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from './services/tmdb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  peliculas: any[] = [];
  cargandoPeliculas: boolean = true;
  busquedaQuery: string = '';

  // Modal Detalle/Similares/Reparto
  modalDetalleAbierto: boolean = false;
  peliculaSeleccionada: any = null;
  repartoPelicula: any[] = [];
  peliculasSimilares: any[] = [];
  cargandoDetalles: boolean = false;

  // Actores Populares
  actoresPopulares: any[] = [];
  actorSeleccionado: any = null;
  cargandoActor: boolean = false;

  constructor(
    private tmdbService: TmdbService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cargarPopulares();
      this.cargarActoresPopulares();
    }, 0);
  }

  cargarPopulares(): void {
    this.cargandoPeliculas = true;

    this.tmdbService.getPopularMovies().subscribe({
      next: (data: any) => {
        this.peliculas = data?.results || [];
        this.cargandoPeliculas = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar populares:', err);
        this.cargandoPeliculas = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarTopRated(): void {
    this.cargandoPeliculas = true;

    this.tmdbService.getTopRatedMovies().subscribe({
      next: (data: any) => {
        this.peliculas = data?.results || [];
        this.cargandoPeliculas = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar top rated:', err);
        this.cargandoPeliculas = false;
        this.cdr.detectChanges();
      }
    });
  }

  buscar(): void {
    if (!this.busquedaQuery.trim()) {
      this.cargarPopulares();
      return;
    }
    this.cargandoPeliculas = true;

    this.tmdbService.searchMovies(this.busquedaQuery).subscribe({
      next: (data: any) => {
        this.peliculas = data?.results || [];
        this.cargandoPeliculas = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en búsqueda:', err);
        this.cargandoPeliculas = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Abrir Modal de la Película (Sinopsis, Reparto y Similares)
  verDetallesPelicula(pelicula: any): void {
    this.modalDetalleAbierto = true;
    this.peliculaSeleccionada = pelicula;
    this.repartoPelicula = [];
    this.peliculasSimilares = [];
    this.cargandoDetalles = true;

    // Cargar Reparto
    this.tmdbService.getMovieCredits(pelicula.id).subscribe({
      next: (data: any) => {
        this.repartoPelicula = data?.cast?.slice(0, 8) || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar reparto:', err)
    });

    // Cargar Similares
    this.tmdbService.getSimilares(pelicula.id).subscribe({
      next: (data: any) => {
        this.peliculasSimilares = data?.results?.slice(0, 6) || [];
        this.cargandoDetalles = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener similares:', err);
        this.cargandoDetalles = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarModalDetalles(): void {
    this.modalDetalleAbierto = false;
    this.peliculaSeleccionada = null;
  }

  // Cargar Actores Populares
  cargarActoresPopulares(): void {
    this.tmdbService.getPopularActors().subscribe({
      next: (data: any) => {
        this.actoresPopulares = data?.results || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error actores:', err)
    });
  }

  // Biografía del Actor
  verBiografiaActor(personId: number): void {
    this.cargandoActor = true;
    this.actorSeleccionado = null;

    this.tmdbService.getActorDetail(personId).subscribe({
      next: (data: any) => {
        this.actorSeleccionado = data;
        this.cargandoActor = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error biografía:', err);
        this.cargandoActor = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarModalActor(): void {
    this.actorSeleccionado = null;
  }
}