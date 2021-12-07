import { getPuzzleInputApi } from "..";

enum SeatType {
  FRONT = "F",
  BACK = "B",
  LEFT = "L",
  RIGHT = "R",
}

const getSeat = (bottomLimit: number, topLimit: number, partitioning: string): number => {
  const seatType = partitioning[0];

  if (seatType === SeatType.BACK || seatType === SeatType.RIGHT) {
    bottomLimit = Math.ceil((bottomLimit + topLimit) / 2);
  }
  if (seatType === SeatType.FRONT || seatType === SeatType.LEFT) {
    topLimit = Math.floor((bottomLimit + topLimit) / 2);
  }

  if (partitioning.length > 1) {
    const nextPartitioning = partitioning.slice(1, partitioning.length);
    return getSeat(bottomLimit, topLimit, nextPartitioning);
  } else {
    return seatType === SeatType.BACK || seatType === SeatType.RIGHT
      ? bottomLimit
      : topLimit;
  }
};

const day5 = (input: string[]) => {
  let highestSeatId = 0;
  let seatIds = new Array<number>();

  for (const line of input) {
    if (line.length === 0) break;
    const row = getSeat(0, 127, line.slice(0, 7));
    const column = getSeat(0, 7, line.slice(7, 10));
    const seatID = row * 8 + column;
    seatIds = [...seatIds, seatID];

    highestSeatId = highestSeatId < seatID ? seatID : highestSeatId;
  }

  let mySeat = 0;
  const sortedSeatIds = seatIds.sort((a, b) => a - b);
  const seatIdsOffset = sortedSeatIds[0];
  for (let i = 1; i < sortedSeatIds.length - 1; i++) {
    if (i + seatIdsOffset !== sortedSeatIds[i]) {
      mySeat = (sortedSeatIds[i - 1] + sortedSeatIds[i]) / 2;
      break;
    }
  }

  return {
    part1: highestSeatId,
    part2: mySeat,
  };
};

(async () => {
  const input = await await getPuzzleInputApi(5);

  console.log(day5(input));
})();
