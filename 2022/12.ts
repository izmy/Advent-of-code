import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

class Node {
  name: string;
  char: string;
  neighbours = new Set<string>();

  constructor(name: string, char: string) {
    this.name = name;
    this.char = char;
  }

  addNeighbor(name: string) {
    this.neighbours.add(name);
  }
}

const isPossiblePath = (a: string, b: string) => {
  if (a === "S" && b === "a") return true;
  if (a === "z" && b === "E") return true;

  return b.charCodeAt(0) <= a.charCodeAt(0) + 1 && b.charCodeAt(0) > "a".charCodeAt(0);
};

const createNodeName = (i: number, j: number, name: string) => `${i}_${j}_${name}`;

const bfs = (nodes: Map<string, Node>, startNode: string, endNode: string) => {
  const queue = [{ name: startNode, cost: 0 }];
  const visited = [] as Array<{ name: string; cost: number }>;

  while (queue.length > 0) {
    if (visited.find(v => v.name === endNode)) {
      break;
    }
    let currentNode = queue[0];
    queue.shift();

    nodes.get(currentNode.name)?.neighbours.forEach(node => {
      if (!visited.some(v => v.name === node)) {
        visited.push({ name: node, cost: currentNode.cost + 1 });
        queue.push({ name: node, cost: currentNode.cost + 1 });
      }
    });
  }

  return visited.find(v => v.name === endNode)?.cost;
};

const day12 = (input: string[]) => {
  const nodes = new Map<string, Node>();
  const map = input.map(line => line.split(""));
  let startNode = "";
  let endNode = "";

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const nodeName = createNodeName(i, j, map[i][j]);
      const node = new Node(nodeName, map[i][j]);

      if (map[i][j] === "S") startNode = nodeName;
      if (map[i][j] === "E") endNode = nodeName;

      if (j < map[i].length - 1 && isPossiblePath(map[i][j], map[i][j + 1])) {
        const nodeNeighborName = createNodeName(i, j + 1, map[i][j + 1]);
        node.addNeighbor(nodeNeighborName);
      }
      if (j > 0 && isPossiblePath(map[i][j], map[i][j - 1])) {
        const nodeNeighborName = createNodeName(i, j - 1, map[i][j - 1]);
        node.addNeighbor(nodeNeighborName);
      }
      if (i < map.length - 1 && isPossiblePath(map[i][j], map[i + 1][j])) {
        const nodeNeighborName = createNodeName(i + 1, j, map[i + 1][j]);
        node.addNeighbor(nodeNeighborName);
      }
      if (i > 0 && isPossiblePath(map[i][j], map[i - 1][j])) {
        const nodeNeighborName = createNodeName(i - 1, j, map[i - 1][j]);
        node.addNeighbor(nodeNeighborName);
      }

      nodes.set(nodeName, node);
    }
  }

  const part1 = bfs(nodes, startNode, endNode);

  const adepts = [] as string[];
  nodes.forEach(node => {
    if (node.char === "a") {
      adepts.push(node.name);
    }
  });

  const results = [] as number[];
  for (const adept of adepts) {
    const result = bfs(nodes, adept, endNode);

    if (result !== undefined) {
      results.push(result);
    }
  }

  const part2 = results.sort((a, b) => a - b)[0];

  return {
    part1,
    part2,
  };
};

const testInput = getPuzzleInputFile("12", 2022);
console.log(day12(testInput));

getPuzzleInputApi(12, 2022).then(input => {
  console.log(day12(input));
});
