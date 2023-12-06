import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

type Race = {
  time: number;
  record: number;
}

const countNumberOfWins = (time: number, record: number) => {
  let speed = 0;
  let remainingTime = time;
  let numberOfWins = 0;
  for (let i = 0; i < time; i++) {
    if (speed * remainingTime > record) {
      numberOfWins++;
    }

    speed++;
    remainingTime--;
  }

  return numberOfWins;
}

const day6 = (input: string[]) => {
  const races: Race[] = [];

  const timeArray = input[0].split(":")[1].trim().split(/\D+/).map(Number);
  const distanceArray = input[1].split(":")[1].trim().split(/\D+/).map(Number);

  // part 1
  for (let i = 0; i < timeArray.length; i++) {
    races.push({ time: timeArray[i], record: distanceArray[i] });
  }

  let part1 = 1;
  for (const race of races) {
    part1 *= countNumberOfWins(race.time, race.record);
  }

  // part 2
  let part2 = 1;
  
  const bigRace = races.reduce((acc, curr) => {
    return {
      time: +`${acc.time}${curr.time}`,
      record: +`${acc.record}${curr.record}` ,
    }
  }, { time: 0, record: 0 })

  part2 *= countNumberOfWins(bigRace.time, bigRace.record);

  return {
    part1,
    part2,
  };
};

const testInput = getPuzzleInputFile("06", 2023);
console.log(day6(testInput));

getPuzzleInputApi(6, 2023).then(input => {
  console.log(day6(input));
});
