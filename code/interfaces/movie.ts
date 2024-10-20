export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string | null;
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  original_language: string | null;
  original_title: string | null;
  genre_ids: number[];
  title: string | null;
  vote_average: number;
  overview: string | null;
  release_date: string | null;
}

export interface MovieDetailResponse {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: {
    id: number;
    name: string | null;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string | null;
  original_title: string | null;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string | null;
    origin_country: string | null;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string | null;
  }[];
  release_date: string | null;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    iso_639_1: string;
    name: string | null;
  }[];
  status: string | null;
  tagline: string | null;
  title: string | null;
  video: boolean;
  vote_average: number | null;
  vote_count: number | null;
}