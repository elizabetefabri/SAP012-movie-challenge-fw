import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Movie } from 'src/models/Movie';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar', () => {
    expect(service).toBeTruthy();
  });

// BEM-SUCEDIDO
it('deve retornar dados dos filmes se a solicitação da API foi bem-sucedida', () => {
  const genresMockResponse = {
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' }
    ]
  };

  const moviesMockResponse = {
    page: 1,
    total_pages: 20,
    results: [
      { id: 1, title: 'Movie 1', genre_ids: [28] },
      { id: 2, title: 'Movie 2', genre_ids: [12] }
    ]
  };

  service.getMovies().subscribe((res) => {
    expect(res.movies.length).toBe(2);
    expect(res.movies[0].id).toBe(1);
    expect(res.movies[0].genres).toContain('Action');
    expect(res.movies[1].id).toBe(2);
    expect(res.movies[1].genres).toContain('Adventure');
  });

  const reqGenres = httpMock.expectOne('https://api.themoviedb.org/3/genre/movie/list');
  expect(reqGenres.request.method).toBe('GET');
  reqGenres.flush(genresMockResponse);

  const reqMovies = httpMock.expectOne('https://api.themoviedb.org/3/discover/movie?'+ new URLSearchParams({page: '1'}).toString());
  expect(reqMovies.request.method).toBe('GET');
  reqMovies.flush(moviesMockResponse);
});

// SOLICITAÇÃO DE ERRO
it('deve lidar com erro de solicitação de API', () => {
  const genresMockResponse = {
    genres: [{ id: 28, name: 'Action' }]
  };

  const errorMessage = 'Http failure response for https://api.themoviedb.org/3/discover/movie?page=1: 404 Not Found';
  service.getMovies().subscribe(
    () => fail('Expected an error, but received no error'),
    error => expect(error.message).toContain(errorMessage)
  );

  const genresReq = httpMock.expectOne(`https://api.themoviedb.org/3/genre/movie/list`);
  genresReq.flush(genresMockResponse); // Primeiro responda à chamada dos gêneros

  const moviesReq = httpMock.expectOne('https://api.themoviedb.org/3/discover/movie?'+ new URLSearchParams({page: '1'}).toString());
  moviesReq.flush(null, { status: 404, statusText: 'Not Found' }); // Em seguida, simule um erro na chamada dos filmes

});

});
