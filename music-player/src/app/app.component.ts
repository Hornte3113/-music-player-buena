import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { StaticPlaylistComponent } from './components/static-playlist/static-playlist.component';
import { PlayerComponent } from './components/player/player.component';
import { Track } from './models/track.interface';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SearchBarComponent,
    StaticPlaylistComponent,
    PlayerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Spotify Player';
  currentTrack: Track | null = null;

  onTrackSelected(track: Track): void {
    console.log('Track selected:', track);
    this.currentTrack = track;
  }

  onActivate(componentRef: any) {
    // Pasar currentTrack a HomeComponent
    if (componentRef instanceof HomeComponent) {
      componentRef.currentTrack = this.currentTrack;
    }
    
    // Suscribirse al evento trackSelectedForResult de SearchResultsComponent
    if (componentRef instanceof SearchResultsComponent) {
      componentRef.trackSelectedForResult.subscribe((track: Track) => {
        this.onTrackSelected(track);
      });
    }
  }
}
