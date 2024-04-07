import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { MovieListComponent } from './layout/movie-list/movie-list.component';
import { HomeComponent } from './layout/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ListOptionsComponent } from './layout/list-options/list-options.component';
import { MovieDetailComponent } from './layout/movie-detail/movie-detail.component';
import { MoviePaginationComponent } from './layout/movie-pagination/movie-pagination.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [
      AppComponent,
      MovieCardComponent,
      MovieListComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      ListOptionsComponent,
      MovieDetailComponent,
      MoviePaginationComponent
    ]
  }));

  it('deve criar o aplicativo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`deveria ter como título 'movie'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('movie');
  });
});
