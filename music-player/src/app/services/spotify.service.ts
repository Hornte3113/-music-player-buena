import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifySearchResponse, Track } from '../models/track.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly API_URL = 'https://api.spotify.com/v1';
  
  // TOKEN TEMPORAL 
  private readonly SPOTIFY_TOKEN = 'BQBCdZzqJXPfh2TXHvLO04mDx6E7eJszVX0cuaxEstTayYV8W2ccVZ0g_MxXQVNClkeuRBTEKWEvtIZXTZ2qGWdwW4NDLNL9EUZBvC6LOMfZD49TX2-LMEdh-lhG8fEFrBijqL1c2NTVbFPA8KI5Ib19uv968y6L9wRhcSzJtpPLYVp4E3dPd0uCuX_jUE3jg8VV5UYZwyJAsB-BHQptVGEhGWAXTahqkZmc8YZs7oNEHN1ALpeZeO24v-QWvYbnbnq3dWDQ5laJ3soEMmAK2XTLCaPoe2rxaB2lo-b293jgcJB5zQ5fFknXl_Wd64jiXFI0ryn4';

  constructor(private http: HttpClient) { }

  searchTracks(query: string): Observable<Track[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.SPOTIFY_TOKEN}`
    });

    return this.http.get<SpotifySearchResponse>(
      `${this.API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      { headers }
    ).pipe(
      map(response => response.tracks.items)
    );
  }

  
  async searchTracksWithFetch(query: string): Promise<Track[]> {
    const response = await fetch(
      `${this.API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${this.SPOTIFY_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Error al buscar canciones');
    }

    const data: SpotifySearchResponse = await response.json();
    return data.tracks.items;
  }
}
