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
  
  // TOKEN TEMPORAL - Reemplaza esto con tu token de Spotify
  // Para obtener un token: https://developer.spotify.com/console/get-search-item/
  private readonly SPOTIFY_TOKEN = 'BQA19_ig-6oeNCW4CxVRy4pKaw0ssVE6vDTEbqUUbOQErdtJBZGBWAEW5Ihy9MSOKpPzzmvRk3f74R5-uYTLaNO8pSvXbddQXzp98cSv9TBF5L4K5R_Oto3HTa_Q5_VmRUYCJCDW2j9FV2u95z_lSiK0iPMfdlW9QqwK_oZBt6VXRvePTJc_GnclN6aRwedgIAJ9dLJvOh-4sXs0ZEsrVRRwyqisQBS2vPAoLWc1BClCAe8Lc2Sz8d9ry_NX9UWZgOdCMuZf6DqTV_OMgRlwUxCzAaHgeECIBKNz6m8R-LM2ZUkz3i1nXV__ZnOo47vIuJn1-0Js';

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

  // Método alternativo usando fetch si prefieres
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
