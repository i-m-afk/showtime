export interface GetShowsByTheater {
  theaterName: string;
  screenId: string;
  movieTitle: string;
  movieLanguage: string | null;
  showDate: Date;
  showTime: Date;
  basePrice: string;
  screenType: string | null;
  seatsLeft: number;
}
