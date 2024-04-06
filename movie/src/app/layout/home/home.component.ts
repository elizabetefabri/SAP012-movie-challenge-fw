import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  movies: Movie[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(): void {
    this.apiService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (error) => {
        console.error(`Error loading movies: ${error.status} ${error.message}`);
        this.error = 'Erro ao obter os dados dos filmes. Por favor, tente novamente mais tarde.';
        this.loading = false;
      }
    });
  }
}
