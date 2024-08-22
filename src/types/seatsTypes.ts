export interface Seat {
  seat_number: number;
  screen_id: string;
  seat_type: string;
  row: number;
  col: number;
  seatNumber: number;
  screenId: string;
  seatType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsertSeatsArgs {
  parseJson: any;
}

export interface SeatResult {
  seatNumber: number;
  row: number;
  col: number;
  seatType: string;
}
