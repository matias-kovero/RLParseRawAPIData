var fs = require('fs');
var json = require('./containerdrops.json');

const parsedFileName = 'result.txt';
const mapName = 'seriesItems';
const indent = '  '; // 2 spaces -> The indent on C++ map objects

const parseJson = () => {
  try {
    // Dirty way to get the drops array, loads to RAM?
    let containerDrops = json['Responses'][0].Result.ContainerDrops;
    // Sort by series id
    containerDrops.sort((a,b) => a.SeriesID > b.SeriesID && 1 || -1);

    const newLine = '\r\n';
    let parsed = `static std::unordered_map<int, std::vector<int>> ${mapName}${newLine}{${newLine}`;

    console.log(`JSON has ${containerDrops.length} container drops!`);
    // {s, { i, i, i, ...i} }
    parsed += f(`${containerDrops.map((container) => 
      f(`${indent}{ ${container.SeriesID}, { ${container.Drops.map(d => d.ProductID).join(', ')} } }`)
    ).join(`,${newLine}`)} ${newLine}};`);

    writeToFile(parsed);

    console.log(`JSON parsed to ${parsedFileName}`);
  } catch (e) { 
    console.log(e.message);
  };
};

const writeToFile = (data) => {
  try {
    fs.writeFile(parsedFileName, data, (err) => {
      if (err) console.log(err);
    });
  } catch (e) {
    console.log(e.message);
  }
};

function f() {
  return Array.prototype.join.call(arguments);
}
// Run code
parseJson();