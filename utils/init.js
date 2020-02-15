const pkg = require("./../package.json");
const welcome = require("cli-welcome");
const clearConsole = require("clear-any-console");

module.exports = () => {
	clearConsole();
	welcome(`Gatsby Package Manager`, `\nby Awais.dev`, {
		bgColor: `#FADC00`,
		color: `#000000`,
		bold: true,
		clear: true,
		version: `v${pkg.version}`
	});
};
