const marked = require("marked");
const TerminalRenderer = require("marked-terminal");
const axios = require("axios");
const readline = require("readline");
const cli = require("./cli");

(async () => {
	// readline.emitKeypressEvents(process.stdin);
	// process.stdin.setRawMode(true);

	// process.stdin.on("keypress", (str, key) => {
	// 	if (key.ctrl && key.name === "c") {
	// 		process.exit();
	// 	} else {
	// 		console.log(`You pressed the "${str}" key`);
	// 		console.log();
	// 		console.log(key);
	// 		console.log();
	// 	}
	// });
	// console.log("Press any key...");
	const readme = await axios.get(
		"https://unpkg.com/gatsby-plugin-react-helmet/README.md"
	);

	marked.setOptions({ renderer: new TerminalRenderer() });
	console.log(marked(readme.data));
})();
