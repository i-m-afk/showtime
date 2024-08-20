export interface Seat {
  seat_number: number;
  screen_id: string;
  seat_type: string;
  row: number;
  col: number;
}

export interface InsertSeatsArgs {
  parseJson: any;
}
