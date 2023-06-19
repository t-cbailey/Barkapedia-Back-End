import { Park } from "../types/CustomTypes";

//takes an array of park objects (1st arg), a string that is the orderBy query (2nd arg), and a string of 'asc' or 'desc'(3rd arg) and returns true if the objects have been ordered appropriately, and false if the order is incorrect.

type orderCheckerParam = "asc" | "desc";
interface ParkIterable extends Park {
  [key: string]: any;
}

export const orderChecker = (
  arr: ParkIterable[],
  orderByQuery: string,
  direction: orderCheckerParam
) => {
  let inputArr = arr.map((park) => {
    return park[orderByQuery];
  });

  let sortedArr = [...inputArr].sort((a: any, b: any) => {
    return direction === "asc" ? a - b : b - a;
  });

  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] !== sortedArr[i]) return false;
  }
  return true;
};
