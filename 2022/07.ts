import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const LIMIT = 100000;
const TOTAL_SIZE = 70000000;
const UPDATE = 30000000;

const day7 = (input: string[]) => {
  let tree = {
    name: "/",
    isDirectory: true,
    children: [] as any,
  };

  let path = ["/"];

  for (const line of input) {
    if (line[0] === "$") {
      const command = line.slice(2);

      switch (command) {
        case "cd /":
          path = ["/"];
          break;
        case "cd ..":
          path.pop();
          break;
        case "ls":
          break;
        default:
          const directory = command.split(" ")[1];
          if (directory !== undefined) path.push(directory);
      }
    } else {
      const values = line.split(" ");
      let currentTree = tree;

      for (let i = 0; i < path.length; i++) {
        if (i === path.length - 1 && values[0] !== "dir") {
          currentTree.children.push({
            name: values[1],
            isDirectory: false,
            size: +values[0],
            parent: currentTree,
          });
          break;
        }

        if (i === path.length - 1 && values[0] === "dir") {
          currentTree.children.push({
            name: values[1],
            isDirectory: true,
            children: [],
            parent: currentTree,
          });
          break;
        }
        currentTree = currentTree.children.find(t => t.name === path[i + 1]);
        if (currentTree.children === undefined) currentTree.children = [];
      }
    }
  }

  const getSize = (node, listOfDirSize) => {
    if (!node.isDirectory) {
      return node.size;
    }

    let dirSize = node.children
      .map(child => getSize(child, listOfDirSize))
      .reduce((acc, curr) => acc + curr, 0);

    listOfDirSize.push({ name: node.name, dirSize });

    return dirSize;
  };

  const listOfDirSize = [] as any;
  getSize(tree, listOfDirSize);

  const part1 = listOfDirSize
    .filter(dir => dir.dirSize < LIMIT)
    .reduce((acc, curr) => acc + curr.dirSize, 0);

  const availableSpace = TOTAL_SIZE - listOfDirSize.find(dir => dir.name === "/").dirSize;
  const minimumFolderSize = UPDATE - availableSpace;

  const dirsForDelete = [] as any;
  for (let i = 0; i < listOfDirSize.length; i++) {
    if (listOfDirSize[i].dirSize >= minimumFolderSize) {
      dirsForDelete.push(listOfDirSize[i].dirSize);
    }
  }

  const part2 = dirsForDelete.sort((a, b) => a - b)[0];

  return {
    part1,
    part2,
  };
};

const testInput = getPuzzleInputFile("07", 2022);
console.log(day7(testInput));

getPuzzleInputApi(7, 2022).then(input => {
  console.log(day7(input));
});
