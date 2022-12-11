import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

class Monkey {
  id: number;
  items: number[];
  operation: string;
  divisibleNumber: number;
  ifTrue: number;
  ifFalse: number;
  inspected = 0;

  constructor(
    id: number,
    items: number[],
    operation: string,
    divisibleNumber: number,
    ifTrue: number,
    ifFalse: number
  ) {
    this.id = id;
    this.items = items;
    this.operation = operation;
    this.divisibleNumber = divisibleNumber;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
  }

  inspect(reliefe = 3, lcm?: number) {
    this.items = this.items.map(item => {
      const operation = this.operation.replace(/old/g, `${item}`);
      const result = lcm ? eval(operation) % lcm : eval(operation);
      const worriedLevel = Math.floor(result / reliefe);
      this.inspected++;

      return worriedLevel;
    });
  }

  updateItems(monkeys: Map<number, Monkey>) {
    this.items = this.items.filter(item => {
      const newMonkeyId = item % this.divisibleNumber === 0 ? this.ifTrue : this.ifFalse;
      monkeys.get(newMonkeyId)?.addItem(item);

      if (newMonkeyId === this.id) return item;
    });
  }

  addItem(item: number) {
    this.items.push(item);
  }

  printWorryLevels() {
    console.log(`Monkey ${this.id}:`, this.items);
  }

  printInspected() {
    console.log(`Monkey ${this.id} inspected items ${this.inspected} times.`);
  }
}

const createMonkey = (data: string[]) => {
  const monkeyId = parseInt(data[0].split(" ")[1]);
  const items = data[1].split(":")[1].split(",").map(Number);
  const operation = data[2].split("=")[1].trim();
  const divisibleNumber = parseInt(data[3].split("by")[1]);
  const ifTrue = parseInt(data[4].split("monkey")[1]);
  const ifFalse = parseInt(data[5].split("monkey")[1]);

  return new Monkey(monkeyId, items, operation, divisibleNumber, ifTrue, ifFalse);
};

const lcmFromMonkeys = (monkeys: Map<number, Monkey>) =>
  Array.from(monkeys)
    .map(([_id, monkey]) => monkey.divisibleNumber)
    .reduce((acc, curr) => acc * curr, 1);

const getMonkeyBusiness = (monkeys: Map<number, Monkey>) =>
  Array.from(monkeys)
    .map(([_id, monkey]) => monkey.inspected)
    .sort((a, b) => b - a)
    .splice(0, 2)
    .reduce((acc, curr) => acc * curr, 1);

const day11 = (input: string[]) => {
  const monkeys = new Map<number, Monkey>();
  const monkeys2 = new Map<number, Monkey>();

  let monkeyRawData = [] as string[];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "") continue;
    monkeyRawData.push(input[i].trim());

    if (monkeyRawData.length === 6) {
      const monkey = createMonkey(monkeyRawData);
      monkeys.set(monkey.id, monkey);

      const monkey2 = createMonkey(monkeyRawData);
      monkeys2.set(monkey2.id, monkey2);
      monkeyRawData = [];
    }
  }

  // part1
  for (let i = 1; i <= 20; i++) {
    monkeys.forEach(monkey => {
      monkey.inspect(3);
      monkey.updateItems(monkeys);
    });
  }

  // part2
  const lcm = lcmFromMonkeys(monkeys2);
  for (let i = 1; i <= 10000; i++) {
    monkeys2.forEach(monkey => {
      monkey.inspect(1, lcm);
      monkey.updateItems(monkeys2);
    });
  }

  return {
    part1: getMonkeyBusiness(monkeys),
    part2: getMonkeyBusiness(monkeys2),
  };
};

const testInput = getPuzzleInputFile("11", 2022);
console.log(day11(testInput));

getPuzzleInputApi(11, 2022).then(input => {
  console.log(day11(input));
});
