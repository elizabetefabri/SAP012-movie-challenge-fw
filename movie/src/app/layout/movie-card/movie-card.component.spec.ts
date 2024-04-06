import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { Movie } from 'src/models/Movie';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardComponent]
    });
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir os detalhes do filme corretamente', () => {
    const movie: Movie[] = [
      {
      id: 1,
      title: 'Test Movie',
      image_path: 'test_image_path.jpg',
      release_year: '2022',
      overview: 'Overview do Movie 1',
      vote_average: 7.5,
      }
    ];
    component.movie = movie[0];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(movie[0].title);
    expect(compiled.querySelector('p').textContent).toContain(movie[0].release_year);
    expect(compiled.querySelector('img').src).toContain(movie[0].image_path);
  });
});
