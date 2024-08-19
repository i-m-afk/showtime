export interface Theater {
  theaterid: string;
  name: string;
  image: string | null;
  address: string;
  city: string;
  state: string;
  pinCode: string | null;
  latitude: string;
}

export interface TheaterWithMovieCity {
  theaterid: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contactNumber: string | null;
  latitude: string;
  longitude: string;
  screenid: string;
  screenType: string | null;
  totalSeats: number;
  seatsLeft: number;
  movieid: number;
  movieTitle: string;
  movieLanguage: string | null;
}
