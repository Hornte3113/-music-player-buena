import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() currentTrack: Track | null = null;

  getArtistNames(): string {
    if (!this.currentTrack) return '';
    return this.currentTrack.artists.map(artist => artist.name).join(', ');
  }

  getAlbumImage(): string {
    if (!this.currentTrack) {
      return 'https://via.placeholder.com/400x400?text=Selecciona+una+cancion';
    }
    return this.currentTrack.album.images[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image';
  }
}
