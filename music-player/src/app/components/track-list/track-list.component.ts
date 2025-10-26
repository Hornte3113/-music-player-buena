import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.interface';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css'
})
export class TrackListComponent {
  @Input() tracks: Track[] = [];
  @Input() selectedTrackId: string | null = null;
  @Output() trackSelected = new EventEmitter<Track>();

  onSelectTrack(track: Track): void {
    this.trackSelected.emit(track);
  }

  getArtistNames(track: Track): string {
    return track.artists.map(artist => artist.name).join(', ');
  }

  getAlbumImage(track: Track): string {
    return track.album.images[0]?.url || 'https://via.placeholder.com/300x300?text=No+Image';
  }
}
