import { useState } from "react";
import screen from "./assets/screen.svg";

type Seat = {
  row: number;
  col: number;
};

//TODO: make this dynamic
// type Category = {
//   seats: Seat[];
//   name: "VIP" | "Normal" | "Economy";
// };

function App() {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  //const [categories, setCategories] = useState<Category[]>([]);

  function handleSeatClick(row: number, col: number) {
    const idx = selectedSeats.findIndex(
      (seat) => seat.row === row && seat.col === col,
    );
    if (idx === -1) {
      setSelectedSeats([...selectedSeats, { row, col }]);
    } else {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat.row !== row || seat.col !== col),
      );
    }
    console.log(selectedSeats);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Theator Creator</h1>
      <div className="flex flex-col items-center">
        <div className={`w-200 h-200 rounded-full cursor-pointer`}>
          <img src={screen} alt="screen" className="w-full h-full" />
          <div className="flex flex-col space-y-2">
            {
              // 15 * 15 grid
              Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="flex justify-center space-x-2">
                  {Array.from({ length: 15 }, (_, j) => (
                    <div
                      key={j}
                      className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer ${
                        selectedSeats.some(
                          (seat) => seat.row == i && seat.col == j,
                        )
                          ? "bg-red-600"
                          : "bg-gray-300"
                      }`}
                      onClick={() => {
                        handleSeatClick(i, j);
                      }}
                    ></div>
                  ))}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
