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
  const mockResponse = {
    results: [
      {
        id: 1,
        title: 'Movie 1',
        poster_path: '/poster1.jpg',
        release_date: '2021',
        overview: 'Overview do Movie 1',
        vote_average: 7.5,
      },
      {
        id: 2,
        title: 'Movie 2',
        poster_path: '/poster2.jpg',
        release_date: '2021',
        overview: 'Overview do Movie 2',
        vote_average: 8.0,
      }
    ]
  };

  const expectedMovies: Movie[] = [
    {
      id: 1,
      title: 'Movie 1',
      image_path: 'https://image.tmdb.org/t/p/w500/poster1.jpg',
      release_year: '2020',
      overview: 'Overview do Movie 1',
      vote_average: 7.5
    },
    {
      id: 2,
      title: 'Movie 2',
      image_path: 'https://image.tmdb.org/t/p/w500/poster2.jpg',
      release_year: '2020',
      overview: 'Overview do Movie 2',
      vote_average: 8.0
    }
  ];

  service.getMovies().subscribe(movies => {
    expect(movies).toEqual(expectedMovies);
  });

  const req = httpMock.expectOne(`${service.API_URL}/discover/movie`);
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
});
});
