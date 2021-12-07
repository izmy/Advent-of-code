import { getPuzzleInputApi, getPuzzleInputFile } from "..";

type ListOfBags = { [key: string]: Bag };

type Bag = {
  name: string;
  count: number;
  contains?: Bag[];
};

const WANTED_BAG = "shiny gold";

const findWantedBag = (listOfBags: ListOfBags, bagName: string) => {
  if (listOfBags[bagName].contains.find(bag => bag.name === WANTED_BAG)) {
    return true;
  }

  for (const b of listOfBags[bagName].contains) {
    if (findWantedBag(listOfBags, b.name)) return true;
  }

  return false;
};

const countBags = (listOfBags: ListOfBags, bagName: string, value: number) => {
  let sum = 0;
  for (const b of listOfBags[bagName].contains) {
    sum += countBags(listOfBags, b.name, value * b.count);
  }

  return value + sum;
};

const day7 = (input: string[]) => {
  let listOfBags: ListOfBags;

  for (const line of input) {
    if (line.length === 0) break;
    const [mainBag, content] = line.split(" contain ");
    const [mainBagName] = mainBag.split(" bags");
    const bags = content
      .split(", ")
      .map(bag => bag.replace(/\./g, ""))
      .map(bag => {
        const countString = bag.substr(0, bag.indexOf(" "));
        if (countString === "no") {
          return null;
        }
        const count = Number(countString);
        let [name] = bag.substr(bag.indexOf(" ") + 1).split(" bag");

        return { name, count };
      })
      .filter(bag => bag !== null);

    listOfBags = {
      ...listOfBags,
      [mainBagName]: {
        name: mainBagName,
        count: 0,
        contains: bags,
      },
    };
  }

  let findInSum = 0;
  for (const bag in listOfBags) {
    if (bag === WANTED_BAG) continue;
    if (findWantedBag(listOfBags, bag)) {
      findInSum++;
    }
  }

  const allBags = countBags(listOfBags, WANTED_BAG, 1) - 1;

  return {
    part1: findInSum,
    part2: allBags,
  };
};

(async () => {
  const testInput = getPuzzleInputFile("07");
  console.log(day7(testInput));

  const input = await await getPuzzleInputApi(7);
  console.log(day7(input));
})();
