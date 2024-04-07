import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { MovieListComponent } from './layout/movie-list/movie-list.component';
import { HomeComponent } from './layout/home/home.component';
import { ApiService } from './shared/services/api.service';
import { MoviePaginationComponent } from './layout/movie-pagination/movie-pagination.component';
import { MatCardModule } from '@angular/material/card';
import { ListOptionsComponent } from './layout/list-options/list-options.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MovieDetailComponent } from './layout/movie-detail/movie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MovieListComponent,
    HomeComponent,
    MoviePaginationComponent,
    ListOptionsComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
  ],
  exports: [MovieCardComponent],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
