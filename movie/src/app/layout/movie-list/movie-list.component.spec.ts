import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { Movie } from 'src/models/Movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent, MovieCardComponent]
    });
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a lista de filmes', () => {
    const movies: Movie[] = [
      { id: 1, title: 'Movie 1',
      image_path: 'path/to/image1.jpg',
      release_year: '2022',
      genres: ['Action', 'Adventure'],
      overview: 'Overview do Movie 1',
        vote_average: 7.5
    },
      { id: 2, title: 'Movie 2',
      image_path: 'path/to/image2.jpg',
      release_year: '2023',
      genres: ['Drama', 'Romance'],
      overview: 'Overview do Movie 2',
      vote_average: 8.0
    }
    ];

    component.movies = movies;
    fixture.detectChanges();

    const movieCardElements =
      fixture.nativeElement.querySelectorAll('app-movie-card');

    expect(movieCardElements.length).toBe(movies.length);

    movieCardElements.forEach(
      (movieCardElement: HTMLElement, index: number) => {
        const movie = movies[index];
        expect(movieCardElement.textContent).toContain(movie.title);
        expect(movieCardElement.textContent).toContain(movie.release_year);
        const imgElement = movieCardElement.querySelector('img');
        expect(imgElement).toBeTruthy();
        if (imgElement) {
            expect(imgElement.getAttribute('src')).toContain(movie.image_path);
        }
      }
    );
  });
});
