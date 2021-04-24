const table = require('text-table');
const commands = require('./helpers/commands');
const output = []
commands.map(item => output.push([item.run, item.description]));
console.log(table(output))
