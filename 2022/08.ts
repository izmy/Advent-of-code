import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

interface Tree {
  value: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  scoreTop: number;
  scoreBottom: number;
  scoreLeft: number;
  scoreRight: number;
}

const day8 = (input: string[]) => {
  const trees = input.map(tree => tree.split("").map(Number));
  const size = trees.length;
  let treeVisibility = [...trees.map(tree => [...tree])].map(treeLine =>
    treeLine.map(
      tree =>
        ({
          value: tree,
          top: false,
          bottom: false,
          left: false,
          right: false,
          scoreTop: 0,
          scoreBottom: 0,
          scoreLeft: 0,
          scoreRight: 0,
        } as Tree)
    )
  );

  for (let i = 0; i < size; i++) {
    treeVisibility[0][i].top = true;
    treeVisibility[i][0].left = true;
    treeVisibility[i][size - 1].right = true;
    treeVisibility[size - 1][i].bottom = true;

    for (let j = 0; j < size; j++) {
      // left
      for (let k = 0; k < size; k++) {
        if (j > k) {
          if (treeVisibility[i][j].value > treeVisibility[i][k].value) {
            treeVisibility[i][j].left = true;
          } else {
            treeVisibility[i][j].left = false;
            break;
          }
        }
      }

      // right
      for (let k = 0; k < size; k++) {
        if (j < size - 1 - k) {
          if (treeVisibility[i][j].value > treeVisibility[i][size - 1 - k].value) {
            treeVisibility[i][j].right = true;
          } else {
            treeVisibility[i][j].right = false;
            break;
          }
        }
      }

      // top
      for (let k = 0; k < size; k++) {
        if (j > k) {
          if (treeVisibility[j][i].value > treeVisibility[k][i].value) {
            treeVisibility[j][i].top = true;
          } else {
            treeVisibility[j][i].top = false;
            break;
          }
        }
      }

      // bottom
      for (let k = 0; k < size; k++) {
        if (j < size - 1 - k) {
          if (treeVisibility[j][i].value > treeVisibility[size - 1 - k][i].value) {
            treeVisibility[j][i].bottom = true;
          } else {
            treeVisibility[j][i].bottom = false;
            break;
          }
        }
      }
    }
  }

  const visible = treeVisibility.reduce((acc, curr) => {
    const sum = curr.reduce((acc2, curr2) => {
      return curr2.bottom || curr2.left || curr2.right || curr2.top ? acc2 + 1 : acc2;
    }, 0);
    return acc + sum;
  }, 0);

  // part2
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // left
      for (let k = 0; k < size; k++) {
        if (j > k) {
          treeVisibility[i][j].scoreLeft++;
          if (treeVisibility[i][j].value <= treeVisibility[i][j - k - 1].value) break;
        }
      }

      // right
      for (let k = 0; k < size; k++) {
        if (j < size - 1 - k) {
          treeVisibility[i][j].scoreRight++;
          if (treeVisibility[i][j].value <= treeVisibility[i][j + k + 1].value) break;
        }
      }

      // top
      for (let k = 0; k < size; k++) {
        if (j > k) {
          treeVisibility[j][i].scoreTop++;
          if (treeVisibility[j][i].value <= treeVisibility[j - k - 1][i].value) break;
        }
      }

      // bottom
      for (let k = 0; k < size; k++) {
        if (j < size - 1 - k) {
          treeVisibility[j][i].scoreBottom++;
          if (treeVisibility[j][i].value <= treeVisibility[j + k + 1][i].value) break;
        }
      }
    }
  }

  const max = Math.max(
    ...treeVisibility.map(trees =>
      Math.max(
        ...trees.map(
          tree => tree.scoreTop * tree.scoreBottom * tree.scoreLeft * tree.scoreRight
        )
      )
    )
  );

  return {
    part1: visible,
    part2: max,
  };
};

const testInput = getPuzzleInputFile("08", 2022);
console.log(day8(testInput));

getPuzzleInputApi(8, 2022).then(input => {
  console.log(day8(input));
});
