import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  genreOptions: string[] = [];
  sortOptions: string[] = [
    JSON.stringify({ value: 'popularity.desc', label: 'Mais populares' }),
    JSON.stringify({ value: 'release_date.desc', label: 'Mais recentes' }),
    JSON.stringify({ value: 'vote_average.desc', label: 'Melhor avaliados' }),
  ];

  paginationState: { currentPage: number; totalPages: number } = {
    currentPage: 1,
    totalPages: 1,
  };

  error: string | null = null;
  loading: boolean = true;
  selectedGenreValue: string = "0"
  selectedSortValue: string = ""
  toClear: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadMovies(this.paginationState.currentPage);
  }

  ngOnInit(): void {
    // this.loadMovies(this.paginationState.currentPage);
    this.route.queryParams.subscribe(params => {
      const genreId = params['genreId'] ? parseInt(params['genreId'], 10) : undefined;
      const sortBy = params['sortBy'];
      const currentPage = params['currentPage'] ? parseInt(params['currentPage'], 10) : 1;
      this.loadMovies(currentPage, genreId, sortBy);
      this.toClear = false;
    });
  }


  loadMovies(currentPage: number, genreId?: number, sortBy?: string): void {
    this.loading = true;
    this.apiService.getMovies({ page: currentPage, genreId, sortBy }).subscribe(
      (response: any) => {
        this.movies = response.movies;

        this.loading = false;
      },
      error => {
        console.error('Error loading movies:', error);
        this.error = 'Erro ao obter os dados dos filmes. Por favor, tente novamente mais tarde.';
        this.loading = false;
      }
    );
  }


}

