import { Movie } from "src/models/Movie";

export function formatMovie(apiMovieData: any): Movie{
  const baseUrl = 'https://image.tmdb.org/t/p/w500';


  const formattedMovie: Movie = {
    id: apiMovieData.id,
    title: apiMovieData.title,
    image_path: apiMovieData.poster_path ? `${baseUrl}${apiMovieData.poster_path}` : 'https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
    release_year: apiMovieData.release_date ? new Date(apiMovieData.release_date).getFullYear().toString() : 'Desconhecido',
    overview: apiMovieData.overview,
    vote_average: apiMovieData.vote_average
  };

  return formattedMovie;
}
