"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [turn, setTurn] = useState("x");
  const [count, setCount] = useState(0);
  const [values, setValues] = useState<string[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(""))
  );
  useEffect(() => {
    checkWinner();
  }, [values]);

  const handleChangeValue = (x: number, y: number) => {
    if (values[x][y] == "x" || values[x][y] == "o") return;
    const newValues = values.map((row) => [...row]);
    newValues[x][y] = turn;

    setValues(newValues);
    const newCount = count + 1;
    setCount(newCount);
    turn == "x" ? setTurn("o") : setTurn("x");
    console.log(count);
  };
  const handleNewGame = () => {
    setValues(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(""))
    );
    setCount(0);
  };

  const isWinningLine = (a: string, b: string, c: string) => {
    if (a !== "" && a === b && b === c) {
      return true;
    } else {
      return false;
    }
  };

  const checkWinner = () => {
    //TODO check winner and if it does not exist then move to the next step
    //Row check
    for (let i = 0; i < 3; i++) {
      if (isWinningLine(values[i][0], values[i][1], values[i][2])) {
        declareWinner(values[i][0]);
        return;
      }
    }

    //column check
    for (let i = 0; i < 3; i++) {
      if (isWinningLine(values[0][i], values[1][i], values[2][i])) {
        declareWinner(values[0][i]);
        return;
      }
    }

    //diagonal check

    if (isWinningLine(values[0][0], values[1][1], values[2][2])) {
      declareWinner(values[0][0]);
      return;
    }

    if (isWinningLine(values[0][2], values[1][1], values[2][0])) {
      declareWinner(values[0][2]);
      return;
    }

    if (count == 8) {
      console.log("game completed");
    }
  };

  const declareWinner = (winner: string) => {
    alert(`${winner} Wins!`);
    setTimeout(handleNewGame, 1500);
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="h-150 w-150 outline-solid  grid grid-cols-3">
          {values.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
                onClick={() => handleChangeValue(i, j)}
              >
                {cell}
              </div>
            ))
          )}
        </div>
        {/* <div className="h-150 w-150 outline-solid  grid grid-cols-3">
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(0, 0)}
          >
            {values[0][0]}
          </div>
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(0, 1)}
          >
            {values[0][1]}
          </div>
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(0, 2)}
          >
            {values[0][2]}
          </div>
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(1, 0)}
          >
            {values[1][0]}
          </div>
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(1, 1)}
          >
            {values[1][1]}
          </div>
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(1, 2)}
          >
            {values[1][2]}
          </div>
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(2, 0)}
          >
            {values[2][0]}
          </div>
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(2, 1)}
          >
            {values[2][1]}
          </div>
          <div
            className="h-50 w-50 outline-solid text-9xl flex justify-center items-center hover:bg-emerald-700 cursor-pointer"
            onClick={() => handleChangeValue(2, 2)}
          >
            {values[2][2]}
          </div>
        </div>  */}
      </div>
    </>
  );
}
