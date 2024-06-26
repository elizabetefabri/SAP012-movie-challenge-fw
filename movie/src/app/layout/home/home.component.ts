import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Genre } from 'src/models/Genre';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
  selectedGenreValue: string = '0';
  selectedSortValue: string = 'popularity.desc';
  // toClear: boolean = true;
  isMobile: boolean = false;
  clearGenreSubject: Subject<string> = new Subject<string>();
  clearSortSubject: Subject<string> = new Subject<string>();

  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.loadMovies(this.paginationState.currentPage);
  }

  ngOnInit(): void {
    this.loadGenres();
    this.route.queryParams.subscribe((params) => {
      const genreId = params['genreId']
        ? parseInt(params['genreId'], 10)
        : undefined;
      const sortBy = params['sortBy'] ?? 'popularity.desc';
      const currentPage = params['currentPage']
        ? parseInt(params['currentPage'], 10)
        : 1;
      this.loadMovies(currentPage, genreId, sortBy);
      this.checkIsMobile();
    });
  }

  private checkIsMobile(): void {
    const screenWidth = window.innerWidth;
    this.isMobile = screenWidth < 768;
  }

  clearFilters(): void {
    this.clearGenreSubject.next('0');
    this.clearSortSubject.next('popularity.desc');
    this.loadMovies(1);
    this.router.navigate(['/home']);
  }

  loadGenres(): void {
    this.ApiService.getMovieGenres().subscribe((genres) => {
      this.genreOptions = genres.map((genre) => {
        return JSON.stringify({
          value: genre.id.toString(),
          label: genre.name,
        } as Genre);
      });
      this.selectedGenreValue = '0';
      this.selectedSortValue = 'popularity.desc';
    });
  }

  onGenreChange(selectedGenre: string): void {
    this.router.navigate([], {
      queryParams: { genreId: selectedGenre, currentPage: 1 },
      queryParamsHandling: 'merge',
    });
  }

  onSortChange(selectedSort: string): void {
    this.router.navigate([], {
      queryParams: { sortBy: selectedSort, currentPage: 1 },
      queryParamsHandling: 'merge',
    });
  }

  loadMovies(currentPage: number, genreId?: number, sortBy?: string): void {
    this.loading = true;
    this.ApiService.getMovies({ page: currentPage, genreId, sortBy }).subscribe(
      (response: any) => {
        this.movies = response.movies;
        this.paginationState.currentPage =
          response.metaData.pagination.currentPage;
        this.paginationState.totalPages =
          response.metaData.pagination.totalPages;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading movies:', error);
        this.error =
          'Erro ao obter os dados dos filmes. Por favor, tente novamente mais tarde.';
        this.loading = false;
      }
    );
  }
  onPageChange(page: number): void {
    this.router.navigate([], { queryParams: { currentPage: page } });
  }
}
