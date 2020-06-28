const fs = require("fs");
let path = "output.js";
fs.open(path, "w", function (err, fd) {
  if (err) {
    throw "could not open file: " + err;
  }
});

const writeAll = (pegMap) => {
  let s = JSON.stringify(pegMap) + ",";
  fs.writeFileSync("output.js");
  console.log(s);
};

const pegMap = {
  A: [],
  B: [],
  C: []
};
const pegArray = ["A", "B", "C"];

const updateMapAndPlot = (pegMap, from, to) => {
  try {
    let theDisk = pegMap[from].pop(); // this actually moves the disk
    pegMap[to].push(theDisk);
    writeAll(pegMap);
  } catch (e) {
    console.log("no disk in Map");
  }
};

// Pegs  A   B   C
// disks are labeled 0 to N
var moves = 0;
const moveDisks = function (n, from, to, spare) {
  if (n == 1) {
    updateMapAndPlot(pegMap, from, to);
    moves++;
  } else {
    moveDisks(n - 1, from, spare, to);
    updateMapAndPlot(pegMap, from, to);
    moves++;
    moveDisks(n - 1, spare, to, from);
  }
};
// given from and to figure out the other peg
const missing = (from, to) => {
  const all = {
    A: 1,
    B: 2,
    C: 3
  };
  let total = all[from] + all[to];
  let miss = 5 - total; // 0 based so not 6 but one less
  let keys = Object.keys(all); // array of keys
  return keys[miss];
};

const initialize = (nDisks, pegMap) => {
  for (let i = nDisks; i >= 1; i--) {
    pegMap["A"].push(i); // this stacks disks with smallest on top
  }
  writeAll(pegMap);
};
const nDisks = 3;
initialize(nDisks, pegMap);
var sparePeg = missing("A", "C");

moveDisks(nDisks, "A", "C", "B");