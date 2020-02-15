const chalk = require("chalk");
const green = chalk.bold.green;
const red = chalk.bold.red;
const yellow = chalk.bold.yellow;

module.exports = root => {
	if (!root) {
		console.log(
			yellow(`
Follow these steps:
1. Browse to the root directory of a Gatsby site
2. Run ${green(`gpm`)}
`)
		);
		process.exit(0);
	}
};
