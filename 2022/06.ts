import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const PACKET_MARKER = 4;
const MESSAGE_MARKER = 14;

const day6 = (input: string[]) => {
  const datastream = input[0].split("");
  let stack = [] as string[];

  let startOfPacketMarker: number | undefined;
  let startOfMessageMarker: number | undefined;

  for (let i = 0; i < datastream.length; i++) {
    if (stack.length === PACKET_MARKER || stack.length === MESSAGE_MARKER) {
      const unique = new Set([...stack]);
      if (startOfPacketMarker === undefined) {
        if (unique.size === PACKET_MARKER) {
          startOfPacketMarker = i;
          stack = [];
        }
      } else {
        if (unique.size === MESSAGE_MARKER) {
          startOfMessageMarker = i;
          break;
        }
      }
    }

    if (startOfPacketMarker === undefined && stack.length === PACKET_MARKER) {
      stack.shift();
    }
    if (startOfPacketMarker !== undefined && stack.length === MESSAGE_MARKER) {
      stack.shift();
    }

    stack.push(datastream[i]);
  }

  return {
    part1: startOfPacketMarker,
    part2: startOfMessageMarker,
  };
};

const testInput = getPuzzleInputFile("06", 2022);
console.log(day6(testInput));

getPuzzleInputApi(6, 2022).then(input => {
  console.log(day6(input));
});
