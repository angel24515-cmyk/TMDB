import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from './services/tmdb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html'
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
}