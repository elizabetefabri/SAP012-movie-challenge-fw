import { formatMovie } from './transformers';

describe('formatMovie', () => {
 // DEVE RETORNAR OS 5 ELEMENTOS
 it('deve retornar um objeto com todos os elementos solicitados', () => {
  const apiMovieData = {
    id: 1011985,
    title: 'Kung Fu Panda 4',
    poster_path: '/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
    release_date: '2024-03-02',
    genre_ids: ['Action', 'Adventure', 'Animation', 'Comedy', 'Family'],
    overview: 'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
    vote_average: 6.8
  };


  const formattedMovie = formatMovie(apiMovieData);
  expect(formattedMovie).toEqual({
    id: 1011985,
    title: 'Kung Fu Panda 4',
    image_path: 'https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
    release_year: '2024',
    overview: 'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
    vote_average: 6.8
  });

});
});
