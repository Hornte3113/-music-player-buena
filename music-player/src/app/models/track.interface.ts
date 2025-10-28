export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  preview_url: string | null;
}

export interface Artist {
  id: string;
  name: string;
  images?: Image[];
  genres?: string[];
  followers?: {
    total: number;
  };
  popularity?: number;
}

export interface Album {
  id: string;
  name: string;
  images: Image[];
  release_date: string;
  artists?: Artist[];
  total_tracks?: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface SpotifySearchResponse {
  tracks: {
    items: Track[];
  };
  artists?: {
    items: Artist[];
  };
  albums?: {
    items: Album[];
  };
}
