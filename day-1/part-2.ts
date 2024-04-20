import { readFile } from "fs/promises";

const VALID_NUMS = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;

type TValidNumsKey = keyof typeof VALID_NUMS;

const arrayIncludes = <T>(element: T, list: T[]) => {
  let isIncluded = false;

  for (let i = 0; i < list.length; i++) {
    if (list[i] === element) {
      isIncluded = true;
      break;
    }
  }

  return isIncluded;
};

const sum = async () => {
  try {
    const list = await readFile("./input.txt", { encoding: "utf-8" }).then((data) =>
      data.split("\n")
    );

    let sum = 0;
    let validKeys = Object.keys(VALID_NUMS);

    for (let i = 0; i < list.length; i++) {
      let element = list[i];

      const nums: string[] = [];

      for (let j = 0; j < element.length; j++) {
        let currentCharacter = element[j];

        if (!isNaN(Number(currentCharacter))) {
          nums.push(currentCharacter);
        } else {
          let stringBuilder = currentCharacter;

          for (let k = j; k < element.length - 1; k++) {
            if (isNaN(Number(element[k + 1]))) {
              stringBuilder += element[k + 1];

              if (arrayIncludes(stringBuilder, validKeys)) {
                nums.push(VALID_NUMS[stringBuilder as TValidNumsKey]);
              }
            } else {
              break;
            }
          }
        }

        if (j === element.length - 1) {
          if (nums.length === 1) {
            sum += Number(nums[0]) * 11;
          } else {
            sum += Number(nums[0] + nums[nums.length - 1]);
          }
        }
      }
    }

    return sum;
  } catch (error) {
    throw error;
  }
};
