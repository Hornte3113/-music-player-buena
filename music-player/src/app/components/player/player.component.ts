import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.interface';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  @Input() currentTrack: Track | null = null;
  isPlaying: boolean = false;
  volume: number = 50;
  isMuted: boolean = false;

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  
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

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.volume = parseInt(target.value);
    if (this.volume === 0) {
      this.isMuted = true;
    } else {
      this.isMuted = false;
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
  }
}
