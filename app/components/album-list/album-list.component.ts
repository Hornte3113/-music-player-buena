import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../../models/track.interface';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent {
  @Input() albums: Album[] = [];
  @Input() selectedAlbumId: string | null = null;
  @Output() albumSelected = new EventEmitter<Album>();

  onSelectAlbum(album: Album): void {
    this.albumSelected.emit(album);
  }

  getAlbumImage(album: Album): string {
    return album.images && album.images.length > 0
      ? album.images[0].url
      : 'https://via.placeholder.com/300x300?text=No+Image';
  }

  getArtistNames(album: Album): string {
    if (!album.artists || album.artists.length === 0) return 'Artista desconocido';
    return album.artists.map(artist => artist.name).join(', ');
  }

  getReleaseYear(releaseDate: string): string {
    return releaseDate.split('-')[0];
  }
}
