import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Lo crearemos después
import { SearchResultsComponent } from './components/search-results/search-results.component'; // Lo crearemos después

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'search/:query', component: SearchResultsComponent }, // Ruta para resultados de búsqueda
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirigir rutas no encontradas a la principal
];