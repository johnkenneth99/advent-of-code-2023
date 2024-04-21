import { readFile } from "fs/promises";

type TResultKey = "red" | "blue" | "green";
type TResultObject = Record<TResultKey, number>;

const mainFunction = async () => {
  const input = await readFile("./input.txt", { encoding: "utf-8" }).then((data) =>
    data.split("\n")
  );

  let sum = 0;

  for (let i = 0; i < input.length - 1; i++) {
    const [gameIndex, gameDetails] = input[i].split(":");
    console.log(i);

    const games: TResultObject = { red: 0, blue: 0, green: 0 };

    const simplifiedDetails = gameDetails.replaceAll(/,|;/g, "").trim().split(" ");

    for (let j = 0; j < simplifiedDetails.length; j++) {
      if (j % 2 === 0) {
        const key = simplifiedDetails[j + 1] as TResultKey;
        const value = Number(simplifiedDetails[j]);

        games[key] = games[key] < value ? value : games[key];
      } else {
        continue;
      }
    }

    if (games["blue"] <= 14 && games["red"] <= 12 && games["green"] <= 13) {
      sum += Number(gameIndex.substring(5));
    }
  }

  return sum;
};
