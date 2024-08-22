export interface Seat {
  seatNumber: number;
  screenId: string;
  seatType: string;
  row: number;
  col: number;
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
