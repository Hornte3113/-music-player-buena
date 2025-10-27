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
  private readonly SPOTIFY_TOKEN = 'BQDv_5ntBz2LN7mAAmat7T5VKgnvUy5A2keWUjkBwIDvZn4rvdf1QZGeX5CMm9ohqNWb2rEHFnq7kUV4Mf_C4weAGr-A6a2xq9jG4JK3f6mKF6k2QM2oEI3jztS1Vx9g-8YbLmG3-4JS7gGnXtwoHmYGWOuZBP_cMbF-LT_RqAsBurjhLqiunkedI-gaGDtmvuu4MEpjU-bDPM4tJ0gElV4nUg6uZ1wDiUtH_UfcU_Bjb7nuaAmTGT1YyfnYCxst-yM59mTQOhnoCwzZfUiHrnNQhyLKdnDrfM6JMM9_V30HcdHs4YQlVwnFK9WKhNqwLMzsf99W';

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
