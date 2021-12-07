import { getPuzzleInputApi, getPuzzleInputFile } from "..";

const day4 = (input: string[]) => {
  const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
  const validation = {
    "byr": (value: number) => value >= 1920 && value <= 2002,
    "iyr": (value: number) => value >= 2010 && value <= 2020,
    "eyr": (value: number) => value >= 2020 && value <= 2030,
    "hgt": (value: string) => {
      if (value.includes("in")) {
        const numberValue = parseInt(value);
        return numberValue >= 59 && numberValue <= 76;
      } else if (value.includes("cm")) {
        const numberValue = parseInt(value);
        return numberValue >= 150 && numberValue <= 193;
      } else {
        return false;
      }
    },
    "hcl": (value: string) => value.match(/#[0123456789abcdef]{6}/g) !== null,
    "ecl": (value: string) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(color => color === value),
    "pid": (value: string) => value.length === 9,
  }

  let validPassports = 0;
  let validFields = 0;

  let validPassportsWithValidation = 0;
  let validFieldsWithValidation = 0;

  for (const line of input) {
    if (line === "") {
      validPassports = validFields === mandatoryFields.length ? ++validPassports : validPassports;
      validFields = 0;

      validPassportsWithValidation = validFieldsWithValidation === mandatoryFields.length ? ++validPassportsWithValidation : validPassportsWithValidation;
      validFieldsWithValidation = 0
    }

    const parsedFields = line.split(" ").map(field => field.split(":"));
    validFields = parsedFields.reduce(
      (acc, currVal) => mandatoryFields.some(field => field === currVal[0]) ? ++acc : acc, validFields
    )
    validFieldsWithValidation = parsedFields.reduce(
      (acc, currVal) => mandatoryFields.some(field => field === currVal[0]) && validation[currVal[0]](currVal[1]) ? ++acc : acc, validFieldsWithValidation
    )
  }

  return {
    part1: validPassports,
    part2: validPassportsWithValidation
  };
};

const testInput = getPuzzleInputFile("04");
console.log(day4(testInput));

getPuzzleInputApi(4).then((input) => {
  console.log(day4(input));
});
