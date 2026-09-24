import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { TopRatedComponent } from './top-rated';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'top-rated', component: TopRatedComponent },
  { path: '**', redirectTo: '' }
];