import { Movie } from "src/models/Movie";

export function formatMovie(apiMovieData: any, genresMap: Map<number, string>): Movie {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const genres: string[] = apiMovieData.genre_ids
    ? apiMovieData.genre_ids.map((genreId: number) => genresMap.get(genreId) || 'Gênero não encontrado!')
    : ['Gênero não disponível'];
  return {
    id: apiMovieData.id,
    title: apiMovieData.title,
    image_path: apiMovieData.poster_path ? `${baseUrl}${apiMovieData.poster_path}` : 'https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
    release_year: apiMovieData.release_date ? new Date(apiMovieData.release_date).getFullYear().toString() : 'Desconhecido',
    overview: apiMovieData.overview,
    vote_average: apiMovieData.vote_average,
    genres
  };
}

export function formatGenresToMap(genresData: { id: number, name: string }[]): Map<number, string> {
  return new Map(genresData.map(genre => [genre.id, genre.name]));
}

export function formatGenresToOptions(genresData: { id: number, name: string }[]): Array<{value: string, label: string}> {
  return genresData.map(genre => ({
    value: genre.id.toString(),
    label: genre.name
  }));
}
