import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { StaticPlaylistComponent } from './components/static-playlist/static-playlist.component'; // Importa el nuevo componente
import { PlayerComponent } from './components/player/player.component';
import { Track } from './models/track.interface';
import { SearchResultsComponent } from './components/search-results/search-results.component'; // Importa SearchResultsComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, // Añade RouterOutlet
    SearchBarComponent,
    StaticPlaylistComponent, // Añade StaticPlaylistComponent
    PlayerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido a styleUrls
})
export class AppComponent {
  title = 'Spotify Player'; // Puedes mantener o quitar el título si no lo usas
  currentTrack: Track | null = null;

  // Ya no necesitas: tracks, isLoading, errorMessage, constructor(spotifyService), onSearch

  onTrackSelected(track: Track): void {
    console.log('Track selected:', track);
    this.currentTrack = track;
  }

  // Método para escuchar el evento del componente cargado en router-outlet
  onActivate(componentRef: any) {
    // Si el componente cargado es SearchResultsComponent, suscríbete a su evento
    if (componentRef instanceof SearchResultsComponent) {
      componentRef.trackSelectedForResult.subscribe((track: Track) => {
        this.onTrackSelected(track);
      });
    }
  }
}