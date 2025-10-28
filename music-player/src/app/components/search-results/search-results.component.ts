import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Para leer parámetros de ruta
import { SpotifyService } from '../../services/spotify.service'; // Asegúrate que la ruta es correcta
import { Track, Artist, Album } from '../../models/track.interface'; // Asegúrate que la ruta es correcta
import { TrackListComponent } from '../track-list/track-list.component'; // Importa TrackListComponent

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, TrackListComponent], // Añade TrackListComponent aquí
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'] // Corregido a styleUrls
})
export class SearchResultsComponent implements OnInit {
  @Output() trackSelectedForResult = new EventEmitter<Track>(); // Para pasar la selección al AppComponent

  searchQuery: string = '';
  tracks: Track[] = [];
  artists: Artist[] = []; // Añade arrays para artistas y álbumes
  albums: Album[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  selectedTrackId: string | null = null; // Para resaltar en la lista

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('query') || '';
      if (this.searchQuery) {
        this.performSearch();
      }
    });
  }

  performSearch(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tracks = [];
    this.artists = [];
    this.albums = [];

    // Llama al servicio para buscar canciones (podrías necesitar llamadas separadas o modificadas para artistas/albums)
    this.spotifyService.searchTracks(this.searchQuery).subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        // Aquí deberías añadir lógica similar para buscar artistas y álbumes
        // this.spotifyService.searchArtists(this.searchQuery).subscribe(...)
        // this.spotifyService.searchAlbums(this.searchQuery).subscribe(...)
        this.isLoading = false;
        if (this.tracks.length === 0 /* && this.artists.length === 0 && this.albums.length === 0 */) {
          this.errorMessage = `No se encontraron resultados para "${this.searchQuery}"`;
        }
      },
      error: (error) => {
        console.error('Error al buscar:', error);
        this.errorMessage = 'Error al buscar. Verifica tu token de Spotify.';
        this.isLoading = false;
      }
    });
  }

    // Método para manejar la selección de una canción desde la lista de resultados
    onTrackSelectedFromList(track: Track): void {
        this.selectedTrackId = track.id;
        this.trackSelectedForResult.emit(track); // Emite el evento hacia AppComponent
    }
}
