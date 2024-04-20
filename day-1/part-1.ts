import { readFile } from "fs/promises";

const sum = async () => {
  try {
    const list = await readFile("./input.txt", { encoding: "utf-8" }).then((data) =>
      data.split("\n")
    );

    let sum = 0;

    for (let i = 0; i < list.length; i++) {
      const numList: string[] = [];

      for (let j = 0; j < list[i].length; j++) {
        const element = list[i][j];

        if (!isNaN(Number(element))) numList.push(element);

        if (j === list[i].length - 1) {
          if (numList.length === 1) {
            sum += Number(numList[0]) * 11;
          } else {
            sum += Number(numList[0] + numList[numList.length - 1]);
          }
        }
      }
    }

    return sum;
  } catch (error) {
    console.log(error);
  }
};
