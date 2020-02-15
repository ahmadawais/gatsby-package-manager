#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
	handleError(`UNHANDLED`, err);
});

const execa = require("execa");
const chalk = require("chalk");
const ora = require("ora");
const axios = require("axios");
const to = require("await-to-js").default;
const handleError = require("cli-handle-error");
const { Toggle, prompt } = require("enquirer");
const shouldCancel = require("cli-should-cancel");
const init = require("./utils/init.js");
const exit = require("./utils/exit.js");
const dim = chalk.dim;
const yellow = chalk.bold.yellow;
const green = chalk.bold.green;

(async () => {
	init();
	const spinner = ora({ text: "" });
	// Root.
	console.log(`${dim(`❯ Use arrow-keys. [enter/return] to submit.`)}`);
	const promptClone = new Toggle({
		name: `root`,
		message: `Are you running this in the root directory of a Gatsby project?`,
		enabled: `${green(`YEP [y]`)}`,
		disabled: `${yellow(`NOPE [n]`)}`
	});
	const [errRoot, root] = await to(promptClone.run());
	handleError(`ROOT`, errRoot);
	await shouldCancel(root);
	exit(root);

	// Manager.
	const promptMgr = new Toggle({
		name: `manager`,
		message: `Which package manager would you like to use?`,
		enabled: `npm`,
		disabled: `yarn`
	});
	const [errMgr, manager] = await to(promptMgr.run());
	handleError(`MANAGER`, errMgr);
	await shouldCancel(manager);
	const npm = manager ? `true` : `false`;

	// Slug.
	const promptName = {
		type: `input`,
		name: `name`,
		initial: `gatsby-plugin-xyz`,
		message: `Gatsby package you'd like to install?`
	};
	const [errName, name] = await to(prompt(promptName));
	handleError(`NAME`, errName);
	await shouldCancel(name);
	const pkgSlug = name.name;

	// Dependencies.
	spinner.start(`${yellow(`DEPENDENCIES`)} fetching…`);

	const data = await axios.get(`https://unpkg.com/${pkgSlug}/package.json`);
	const deps = Object.keys(data.data.peerDependencies).filter(
		dep => dep !== "gatsby"
	);
	spinner.succeed(`${green(`DEPENDENCIES`)} ${deps.length} found`);

	// Installer.
	const pkgs = [pkgSlug, ...deps];
	const total = pkgs.length;

	spinner.start(`${yellow(`INSTALLING`)} ${total} packages…`);
	const [errInstall, installed] = await to(
		Promise.all(
			pkgs.map(async (pkg, i) => {
				if (npm) {
					await execa(`npm`, [`install`, pkg, `--save`]);
				} else {
					await execa(`yarn`, [`add`, pkg, `--dev`]);
				}
				spinner.start(`${yellow(`INSTALLING`)} package ${i + 1}/${total} …`);
			})
		)
	);
	handleError("INSTALLER", errInstall);
	spinner.succeed(`${green(`INSTALLED`)} ${total}/${total} packages`);
	spinner.succeed(`${green(`…and that was it.`)}\n`);
	spinner.info(
		`${green(`PACKAGE DOCS →`)} ${dim(
			`https://www.gatsbyjs.org/packages/${pkgSlug}/`
		)}`
	);
	spinner.info(
		`${dim(`Check out the docs for more info on configuring the package`)}\n`
	);
})();
