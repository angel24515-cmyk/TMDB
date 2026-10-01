import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { TmdbService } from './services/tmdb'; 
 
@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [CommonModule, FormsModule], 
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
 
  generos: any[] = []; 

  getNombresGeneros(genreIds: number[]): string {
    if (!genreIds || genreIds.length === 0) {
      return 'Sin género';
    }

    return genreIds
      .map(id => {
        const genero = this.generos.find(g => g.id === id);
        return genero ? genero.name : '';
      })
      .filter(nombre => nombre !== '')
      .join(', ');
  }
 
  constructor( 
    private tmdbService: TmdbService, 
    private cdr: ChangeDetectorRef 
  ) {} 
 
  ngOnInit(): void { 
    this.obtenerPeliculasPopulares(); 
    this.obtenerGeneros(); 
  } 
 
  // 1. Películas populares 
  obtenerPeliculasPopulares(): void { 
    this.cargando = true; 
 
    this.tmdbService.getPopularMovies().subscribe({ 
      next: (respuesta: any) => { 
        this.peliculas = respuesta?.results || []; 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      }, 
      error: (err: any) => { 
        console.error('Error al cargar populares:', err); 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      } 
    }); 
  } 
 
  // 2. Películas mejor valoradas 
  obtenerMejorValoradas(): void { 
    this.cargando = true; 
 
    this.tmdbService.getTopRatedMovies().subscribe({ 
      next: (respuesta: any) => { 
        this.peliculas = respuesta?.results || []; 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      }, 
      error: (err: any) => { 
        console.error('Error al cargar mejor valoradas:', err); 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      } 
    }); 
  } 

  // 3. Próximos estrenos 
  obtenerProximosEstrenos(): void { 
    this.cargando = true; 
 
    this.tmdbService.getUpcomingMovies().subscribe({ 
      next: (respuesta: any) => { 
        this.peliculas = respuesta?.results || []; 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      }, 
      error: (err: any) => { 
        console.error('Error al cargar próximos estrenos:', err); 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      } 
    }); 
  }

  // 4. En cartelera 
  obtenerEnCartelera(): void { 
    this.cargando = true; 
 
    this.tmdbService.getNowPlayingMovies().subscribe({ 
      next: (respuesta: any) => { 
        this.peliculas = respuesta?.results || []; 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      }, 
      error: (err: any) => { 
        console.error('Error al cargar películas en cartelera:', err); 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      } 
    }); 
  } 
 
  // 5. Obtener géneros 
  obtenerGeneros(): void { 
    this.tmdbService.getGenres().subscribe({ 
      next: (respuesta: any) => { 
        this.generos = respuesta?.genres || []; 
        this.cdr.detectChanges(); 
      }, 
      error: (err: any) => { 
        console.error('Error al cargar géneros:', err); 
      } 
    }); 
  } 
 
  // 6. Buscar películas 
  buscarPeliculas(): void { 
 
    if (!this.busqueda.trim()) { 
      this.obtenerPeliculasPopulares(); 
      return; 
    } 
 
    this.cargando = true; 
 
    this.tmdbService.searchMovies(this.busqueda).subscribe({ 
      next: (respuesta: any) => { 
        this.peliculas = respuesta?.results || []; 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      }, 
      error: (err: any) => { 
        console.error('Error al buscar películas:', err); 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      } 
    }); 
  } 
 
  // 7. Películas por género 
  obtenerPeliculasPorGenero(genero: any): void { 
 
    this.cargando = true; 
 
    this.tmdbService.getMoviesByGenre(genero.id).subscribe({ 
      next: (respuesta: any) => { 
        this.peliculas = respuesta?.results || []; 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      }, 
      error: (err: any) => { 
        console.error('Error al cargar películas por género:', err); 
        this.cargando = false; 
        this.cdr.detectChanges(); 
      } 
    }); 
  } 
 
  // 8. Películas similares 
  verSimilares(pelicula: any): void { 
 
    this.peliculaSeleccionada = pelicula; 
    this.cargandoSimilares = true; 
 
    this.tmdbService.getSimilarMovies(pelicula.id).subscribe({ 
      next: (respuesta: any) => { 
        this.peliculasSimilares = respuesta?.results || []; 
        this.cargandoSimilares = false; 
        this.cdr.detectChanges(); 
      }, 
      error: (err: any) => { 
        console.error('Error al obtener similares:', err); 
        this.cargandoSimilares = false; 
        this.cdr.detectChanges(); 
      } 
    }); 
  } 
 
  // 9. Cerrar modal 
  cerrarModal(): void { 
    this.peliculaSeleccionada = null; 
    this.peliculasSimilares = []; 
  } 
}