import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/track.interface';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.css'
})
export class ArtistListComponent {
  @Input() artists: Artist[] = [];
  @Input() selectedArtistId: string | null = null;
  @Output() artistSelected = new EventEmitter<Artist>();

  onSelectArtist(artist: Artist): void {
    this.artistSelected.emit(artist);
  }

  getArtistImage(artist: Artist): string {
    return artist.images && artist.images.length > 0
      ? artist.images[0].url
      : 'https://via.placeholder.com/200x200?text=No+Image';
  }

  formatFollowers(count: number | undefined): string {
    if (!count) return '0';
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(0) + 'K';
    }
    return count.toString();
  }
}
