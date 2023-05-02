export interface Movieface {
  title: string;
  name: string;
  overview: string;
  backdrop_path: string;
  profile_path: string;
  original_language: string;
  poster_path: string;
  media_type: string;
  release_date: string;
  popularity:number;
  vote_average: number;
  vote_count: number;
  id: any;
  tagline: string;
  biography:string;
  birthday:string;
  deathday:string;
  known_for_department:string
  genres: { name: string; id: number }[];
}
