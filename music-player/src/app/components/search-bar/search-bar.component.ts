import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'] // Corregido a styleUrls
})
export class SearchBarComponent {
  // Ya no necesitas @Output() search = new EventEmitter<string>();
  searchQuery: string = '';

  constructor(private router: Router) {} // Inyecta el Router

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navega a la ruta de búsqueda
      this.router.navigate(['/search', this.searchQuery.trim()]);
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}