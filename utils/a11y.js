const chalk = require("chalk");
const dim = chalk.dim;

module.exports = () => {
	console.log(`${dim(`❯ Use arrow-keys. [enter/return] to submit.`)}`);
};
