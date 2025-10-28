import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.interface';

@Component({
  selector: 'app-static-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './static-playlist.component.html',
  styleUrls: ['./static-playlist.component.css']
})
export class StaticPlaylistComponent {
  @Output() trackSelected = new EventEmitter<Track>();
  selectedTrackId: string | null = null;

  // Playlist estática de ejemplo
  staticTracks: Track[] = [
    {
      id: 'static1',
      name: 'Blinding Lights',
      artists: [{ id: 'a1', name: 'The Weeknd' }],
      album: {
        id: 'al1',
        name: 'After Hours',
        images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36', height: 640, width: 640 }],
        release_date: '2020-03-20'
      },
      duration_ms: 200000,
      preview_url: null
    },
    {
      id: 'static2',
      name: 'Shape of You',
      artists: [{ id: 'a2', name: 'Ed Sheeran' }],
      album: {
        id: 'al2',
        name: '÷ (Divide)',
        images: [{ url: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', height: 640, width: 640 }],
        release_date: '2017-03-03'
      },
      duration_ms: 233713,
      preview_url: null
    },
    {
      id: 'static3',
      name: 'Someone Like You',
      artists: [{ id: 'a3', name: 'Adele' }],
      album: {
        id: 'al3',
        name: '21',
        images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300', height: 640, width: 640 }],
        release_date: '2011-01-24'
      },
      duration_ms: 285493,
      preview_url: null
    },
    {
      id: 'static4',
      name: 'Levitating',
      artists: [{ id: 'a4', name: 'Dua Lipa' }],
      album: {
        id: 'al4',
        name: 'Future Nostalgia',
        images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2739f0c4d96806d1c4a585e3b63', height: 640, width: 640 }],
        release_date: '2020-03-27'
      },
      duration_ms: 203064,
      preview_url: null
    },
    {
      id: 'static5',
      name: 'Bohemian Rhapsody',
      artists: [{ id: 'a5', name: 'Queen' }],
      album: {
        id: 'al5',
        name: 'A Night at the Opera',
        images: [{ url: 'https://i.scdn.co/image/ab67616d0000b2731e319e65f8d2e2762a72c2c0', height: 640, width: 640 }],
        release_date: '1975-11-21'
      },
      duration_ms: 354320,
      preview_url: null
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
