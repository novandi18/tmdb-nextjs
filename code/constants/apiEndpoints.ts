export const API_ENDPOINTS = {
  NOW_PLAYING: `https://api.themoviedb.org/3/movie/now_playing`,
  POPULAR: `https://api.themoviedb.org/3/movie/popular`,
  ADD_FAVORITE: (accountId: string) => `https://api.themoviedb.org/3/account/${accountId}/favorite`,
  FAVORITE_MOVIES: (accountId: string) => `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`,
  DELETE_FAVORITE: (accountId: string, movieId: string) => `https://api.themoviedb.org/3/account/${accountId}/favorite/${movieId}`,
  CREATE_GUEST_SESSION: 'https://api.themoviedb.org/3/authentication/guest_session/new',
  CREATE_REQUEST_TOKEN: 'https://api.themoviedb.org/3/authentication/token/new',
  VALIDATE_REQUEST_TOKEN: 'https://api.themoviedb.org/3/authentication/token/validate_with_login',
  AUTHENTICATE_USER: (requestToken: string) => `https://www.themoviedb.org/authenticate/${requestToken}`,
  CREATE_SESSION: 'https://api.themoviedb.org/3/authentication/session/new',
  DELETE_SESSION: 'https://api.themoviedb.org/3/authentication/session',
  GET_ACCOUNT: `https://api.themoviedb.org/3/account`,
  GET_MOVIE_DETAIL: (movieId: number) => `https://api.themoviedb.org/3/movie/${movieId}`
}