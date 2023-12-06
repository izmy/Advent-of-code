import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const countPoints = (points: number) => (points >= 2 ? 2 ** (points - 1) : points);

const day4 = (input: string[]) => {
  let pointsSum = 0;
  const cards = [] as any;
  
  for (const line of input) {
    const [cardId, cardData] = line.slice(5).split(":");
    const [winningNumbersRaw, betNumbersRaw] = cardData.split(" | ");
    const winningNumbers = winningNumbersRaw.trim().split(/[ ,]+/).map(num => parseInt(num));
    const betNumbers = betNumbersRaw.trim().split(/[ ,]+/).map(num => parseInt(num));
    const matchedNumbers = betNumbers.filter(num => winningNumbers.includes(num));

    pointsSum += countPoints(matchedNumbers.length);
    cards.push({
      id: cardId,
      win: matchedNumbers.length,
      count: 1
    });
  }

  const result1 = pointsSum;
  
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j <= i + cards[i].win; j++) {
      cards[j].count += cards[i].count;
    }
  }
  // console.log(cards);

  const result2 = cards.reduce((acc, curr) => acc + curr.count, 0);

  return {
    part1: result1,
    part2: result2,
  };
};

const testInput = getPuzzleInputFile("04", 2023);
console.log(day4(testInput));

getPuzzleInputApi(4, 2023).then(input => {
  console.log(day4(input));
});
