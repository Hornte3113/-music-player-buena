import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:query', component: SearchResultsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
