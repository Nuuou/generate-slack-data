const path = require('path');
const fs = require('fs');
const getData = require('./getData');

module.exports = async () => {
  const data = await getData();
  fs.writeFile(path.resolve('data.json'), JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
  });
};
