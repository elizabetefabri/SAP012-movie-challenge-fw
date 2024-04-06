import { environment } from 'src/environments/environment.development';
import { formatMovie } from 'src/utils/transformers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from 'src/models/Movie';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public readonly API_URL = 'https://api.themoviedb.org/3'
  private readonly TOKEN_API = environment;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.TOKEN_API}`
    });

    return this.http.get<any>(`${this.API_URL}/discover/movie`, { headers }).pipe(
      map(response => response.results.map((apiMovieData: any) => formatMovie(apiMovieData)))
    );
  }
}
