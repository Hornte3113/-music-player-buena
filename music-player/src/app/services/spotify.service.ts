import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, throwError, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { SpotifySearchResponse, Track, Artist, Album } from '../models/track.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly API_URL = 'https://api.spotify.com/v1';
  private readonly TOKEN_URL = 'https://accounts.spotify.com/api/token';
  
  // CONFIGURACIÓN: Reemplaza estos valores con tus credenciales de Spotify
  private readonly CLIENT_ID = 'fe3e6901d05043e1bd21da215de3a31d';
  private readonly CLIENT_SECRET = '5382ee41d03c4bcf86209a7d6c770a5f';
  
  private accessToken: string | null = null;
  private tokenExpiryTime: number = 0;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene un token de acceso usando Client Credentials Flow
   */
  private getAccessToken(): Observable<string> {
    // Si ya tenemos un token válido, lo retornamos
    if (this.accessToken && Date.now() < this.tokenExpiryTime) {
      return of(this.accessToken);
    }

    // Codificar credenciales en Base64
    const credentials = btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`);
    
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = 'grant_type=client_credentials';

    return this.http.post<any>(this.TOKEN_URL, body, { headers }).pipe(
      tap(response => {
        this.accessToken = response.access_token;
        // El token expira en 3600 segundos (1 hora), lo guardamos con 5 minutos de margen
        this.tokenExpiryTime = Date.now() + (response.expires_in - 300) * 1000;
        console.log('✅ Token de Spotify obtenido correctamente');
      }),
      map(response => response.access_token),
      catchError(error => {
        console.error('❌ Error al obtener token de Spotify:', error);
        if (error.status === 401) {
          return throwError(() => new Error('Client ID o Client Secret inválidos. Verifica tus credenciales en spotify.service.ts'));
        }
        return throwError(() => new Error('Error al conectar con Spotify. Verifica tu conexión a internet.'));
      })
    );
  }

  /**
   * Obtiene los headers con el token de autorización
   */
  private getHeaders(): Observable<HttpHeaders> {
    return this.getAccessToken().pipe(
      map(token => new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }))
    );
  }

  /**
   * Método auxiliar para hacer peticiones autenticadas
   */
  private makeAuthenticatedRequest<T>(url: string): Observable<T> {
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<T>(url, { headers }))
    );
  }

  // Buscar solo canciones
  searchTracks(query: string): Observable<Track[]> {
    const url = `${this.API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=20`;
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<SpotifySearchResponse>(url, { headers })),
      map(response => response.tracks.items)
    );
  }

  // Buscar solo artistas
  searchArtists(query: string): Observable<Artist[]> {
    const url = `${this.API_URL}/search?q=${encodeURIComponent(query)}&type=artist&limit=10`;
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<SpotifySearchResponse>(url, { headers })),
      map(response => response.artists?.items || [])
    );
  }

  // Buscar solo álbumes
  searchAlbums(query: string): Observable<Album[]> {
    const url = `${this.API_URL}/search?q=${encodeURIComponent(query)}&type=album&limit=10`;
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<SpotifySearchResponse>(url, { headers })),
      map(response => response.albums?.items || [])
    );
  }

  // Buscar todo (canciones, artistas y álbumes) en paralelo
  searchAll(query: string): Observable<{ tracks: Track[], artists: Artist[], albums: Album[] }> {
    return forkJoin({
      tracks: this.searchTracks(query),
      artists: this.searchArtists(query),
      albums: this.searchAlbums(query)
    });
  }

  // Obtener las canciones de un álbum
  getAlbumTracks(albumId: string): Observable<Track[]> {
    const url = `${this.API_URL}/albums/${albumId}/tracks?limit=50`;
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<any>(url, { headers })),
      map(response => response.items)
    );
  }

  // Obtener los álbumes de un artista
  getArtistAlbums(artistId: string): Observable<Album[]> {
    const url = `${this.API_URL}/artists/${artistId}/albums?limit=20`;
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<any>(url, { headers })),
      map(response => response.items)
    );
  }

  // Obtener las canciones más populares de un artista
  getArtistTopTracks(artistId: string): Observable<Track[]> {
    const url = `${this.API_URL}/artists/${artistId}/top-tracks?market=US`;
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<any>(url, { headers })),
      map(response => response.tracks)
    );
  }
}
