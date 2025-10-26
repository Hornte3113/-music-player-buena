import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../models/track.interface';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  @Input() currentTrack: Track | null = null;
  isPlaying: boolean = false;
  volume: number = 50;
  isMuted: boolean = false;

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }
