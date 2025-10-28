import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs'; // Importa forkJoin si buscas varios tipos
import { map } from 'rxjs/operators';
import { SpotifySearchResponse, Track, Artist, Album } from '../models/track.interface'; // Asegúrate que la ruta es correcta

// Define interfaces para las respuestas de artistas y albums si son diferentes
interface SpotifyArtistSearchResponse { artists: { items: Artist[] } }
interface SpotifyAlbumSearchResponse { albums: { items: Album[] } }


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  // ... (API_URL y TOKEN sin cambios)
  private readonly API_URL = 'https://api.spotify.com/v1'; // URL correcta de la API
  private readonly SPOTIFY_TOKEN = 'BQB6RsxdH1qIjpP-AOiQdy78H-AKqT8WhX-TkZFUB0k7WpYWDbVwWKInlpdKufxspHVx7VztrHz7NFTl-lSenJ0Wr2HbCXmw3mn3Oc4tH34SJhVB6zpPbGkSWjODD_DKN4C-6x_Y5xpC6h6vUEWdAJgPDIKDsrklbzsvLA0bxywhBVyvMCtljuK31O0TBoLmvlF5nJs5Lz_Cm1taKrSnfYYDDEszA9ONwE6gr9uoGoErJVU_Jig4wMSjG3RdctthwPmGbggi78lt2-YimbmcIP7RRSfIcqDurNL8s4hs5-DhapPd4tuPA8--B8AvGY0zWWj83DQN'; // Reemplaza con tu token válido

  constructor(private http: HttpClient) { }

  // Modificado para buscar solo tracks por ahora
  searchTracks(query: string): Observable<Track[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.SPOTIFY_TOKEN}`
    });
    const url = `${this.API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=20`;

    return this.http.get<SpotifySearchResponse>(url, { headers })
      .pipe(
        map(response => response.tracks.items)
      );
  }

   // Ejemplo de cómo podrías buscar todo (necesitarás ajustar el componente de resultados)
   /*
   searchAll(query: string): Observable<{ tracks: Track[], artists: Artist[], albums: Album[] }> {
       const headers = new HttpHeaders({
           'Authorization': `Bearer ${this.SPOTIFY_TOKEN}`
       });
       const encodedQuery = encodeURIComponent(query);
       const trackUrl = `${this.API_URL}/search?q=${encodedQuery}&type=track&limit=10`;
       const artistUrl = `${this.API_URL}/search?q=${encodedQuery}&type=artist&limit=5`;
       const albumUrl = `${this.API_URL}/search?q=${encodedQuery}&type=album&limit=5`;

       return forkJoin({
           tracks: this.http.get<SpotifySearchResponse>(trackUrl, { headers }).pipe(map(res => res.tracks.items)),
           artists: this.http.get<SpotifyArtistSearchResponse>(artistUrl, { headers }).pipe(map(res => res.artists.items)),
           albums: this.http.get<SpotifyAlbumSearchResponse>(albumUrl, { headers }).pipe(map(res => res.albums.items)),
       });
   }
   */

  // ... (searchTracksWithFetch sin cambios si aún la usas)
}