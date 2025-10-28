import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Track, Artist, Album } from '../../models/track.interface';
import { TrackListComponent } from '../track-list/track-list.component';
import { ArtistListComponent } from '../artist-list/artist-list.component';
import { AlbumListComponent } from '../album-list/album-list.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, TrackListComponent, ArtistListComponent, AlbumListComponent],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Output() trackSelectedForResult = new EventEmitter<Track>();

  searchQuery: string = '';
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  selectedTrackId: string | null = null;
  selectedArtistId: string | null = null;
  selectedAlbumId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

    this.spotifyService.searchAll(this.searchQuery).subscribe({
      next: (results) => {
        this.tracks = results.tracks;
        this.artists = results.artists;
        this.albums = results.albums;
        this.isLoading = false;
        
        if (this.tracks.length === 0 && this.artists.length === 0 && this.albums.length === 0) {
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

  onTrackSelectedFromList(track: Track): void {
    this.selectedTrackId = track.id;
    this.trackSelectedForResult.emit(track);
  }

  onArtistSelected(artist: Artist): void {
    this.selectedArtistId = artist.id;
    console.log('Artista seleccionado:', artist);
    // Aquí podrías navegar a una vista de detalle del artista o cargar sus canciones
  }

  onAlbumSelected(album: Album): void {
    this.selectedAlbumId = album.id;
    console.log('Álbum seleccionado:', album);
    // Aquí podrías navegar a una vista de detalle del álbum o cargar sus canciones
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
