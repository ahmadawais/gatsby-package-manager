const chalk = require('chalk');
const log = console.log.bind(console);
const warn = chalk.keyword('orange');

module.exports = (name, data) => {
	log(warn(`\n ⚠️  ${name}\n`));
	log(data);
	log('\n');
};
