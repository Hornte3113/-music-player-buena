import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.interface'; // Asegúrate que la ruta es correcta

@Component({
  selector: 'app-static-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './static-playlist.component.html',
  styleUrls: ['./static-playlist.component.css'] // Corregido a styleUrls
})
export class StaticPlaylistComponent {
  @Output() trackSelected = new EventEmitter<Track>();
  selectedTrackId: string | null = null;

  // Datos estáticos/simulados
  staticTracks: Track[] = [
    // Ejemplo de datos (reemplaza con tus datos o déjalo vacío)
    {
      id: 'static1', name: 'Canción Estática 1', artists: [{ id: 'a1', name: 'Artista 1' }],
      album: { id: 'al1', name: 'Album 1', images: [{ url: 'https://via.placeholder.com/64?text=S1', height: 64, width: 64 }], release_date: '2023-01-01' },
      duration_ms: 200000, preview_url: null
    },
    {
      id: 'static2', name: 'Canción Estática 2', artists: [{ id: 'a2', name: 'Artista 2' }],
      album: { id: 'al2', name: 'Album 2', images: [{ url: 'https://via.placeholder.com/64?text=S2', height: 64, width: 64 }], release_date: '2023-02-01' },
      duration_ms: 220000, preview_url: null
    }
  ];

  onSelectTrack(track: Track): void {
    this.selectedTrackId = track.id;
    this.trackSelected.emit(track);
  }

  getArtistNames(track: Track): string {
    return track.artists.map(artist => artist.name).join(', ');
  }

  getAlbumImage(track: Track): string {
    return track.album.images[0]?.url || 'https://via.placeholder.com/64?text=No+Image';
  }
}