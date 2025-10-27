import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { PlayerComponent } from './components/player/player.component';
import { SpotifyService } from './services/spotify.service';
import { Track } from './models/track.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    TrackListComponent,
    PlayerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Spotify Player';
  tracks: Track[] = [];
  currentTrack: Track | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private spotifyService: SpotifyService) {}

  onSearch(query: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.spotifyService.searchTracks(query).subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.isLoading = false;
        if (tracks.length === 0) {
          this.errorMessage = 'No se encontraron resultados';
        }
      },
      error: (error) => {
        console.error('Error al buscar canciones:', error);
        this.errorMessage = 'Error al buscar. Verifica tu token de Spotify.';
        this.isLoading = false;
        this.tracks = [];
      }
    });
  }

  onTrackSelected(track: Track): void {
    this.currentTrack = track;
  }
}
