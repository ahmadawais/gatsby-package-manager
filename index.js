#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	handleError(`UNHANDLED`, err);
});

const execa = require('execa');
const chalk = require('chalk');
const ora = require('ora');
const axios = require('axios');
const to = require('await-to-js').default;
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const handleError = require('cli-handle-error');
const { Toggle, prompt } = require('enquirer');
const shouldCancel = require('cli-should-cancel');
const semver = require('semver');
const pkgJSON = require('./package.json');
const ConfigStore = require('configstore');
const init = require('./utils/init.js');
const a11y = require('./utils/a11y.js');
const exit = require('./utils/exit.js');
const cli = require('./utils/cli');
const dim = chalk.dim;
const yellow = chalk.bold.yellow;
const red = chalk.bold.red;
const green = chalk.bold.green;
const maxSatisfying = semver.maxSatisfying;
const valid = semver.valid;
const coerce = semver.coerce;
let pkgSlug;
let npm;

(async () => {
	init();
	const spinner = ora({ text: '' });
	const cliData = cli();
	const debug = cliData.debug;
	debug && spinner.warn(yellow(`cliData:`));
	debug && console.log(cliData);
	const isInteractive = cliData.pkgName ? false : true;
	const shouldConfig = cliData.config ? true : false;

	// Config.
	const config = new ConfigStore(pkgJSON.name);
	const pkgManager = config.get('pkgManager');
	debug && spinner.warn(yellow(`pkgManager: ${pkgManager}`));

	// Manager.
	if (!pkgManager || shouldConfig) {
		a11y();
		const promptMgr = new Toggle({
			name: `manager`,
			message: `Which package manager would you like to use?`,
			enabled: `npm`,
			disabled: `yarn`
		});
		const [errMgr, manager] = await to(promptMgr.run());
		handleError(`MANAGER`, errMgr);
		await shouldCancel(manager);
		config.set('pkgManager', manager ? `npm` : `yarn`);
		npm = manager ? true : false;
	} else {
		npm = pkgManager === `npm` ? true : false;
	}

	if (isInteractive) {
		if (!shouldConfig) {
			a11y();
		}
		// Root.
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

		// Slug.
		const promptName = {
			type: `input`,
			name: `name`,
			initial: `e.g. gatsby-plugin-mdx`,
			message: `Gatsby package you'd like to install?`,
			validate(value) {
				return !value || value === `e.g. gatsby-plugin-mdx` ? `Please enter a valid package name` : true;
			}
		};
		const [errName, name] = await to(prompt(promptName));
		handleError(`NAME`, errName);
		await shouldCancel(name);
		pkgSlug = name.name;
		debug && spinner.warn(yellow(`pkgSlug: ${pkgSlug}`));
	} else {
		pkgSlug = cliData.pkgName;
		debug && spinner.warn(yellow(`pkgSlug: ${pkgSlug}`));
	}

	if (cliData.install || cliData.docs === undefined) {
		// Dependencies.
		spinner.start(`${yellow(`DEPENDENCIES`)} fetching…`);

		const [errData, data] = await to(axios.get(`https://unpkg.com/${pkgSlug}/package.json`));
		if (errData) {
			spinner.fail(
				`${red(`FAILED`)} Doesn't look like ${red(pkgSlug)} exists.\n${dim(
					`Check if you made a typo in the package name.\n`
				)}`
			);
			process.exit(0);
		}
		const peerDependencies = data.data.peerDependencies;
		const deps = Object.keys(peerDependencies)
			.filter(dep => dep !== 'gatsby')
			.map(dep => {
				let depVer = peerDependencies[dep];

				// Check if there is whitespace.
				if (depVer.indexOf(' ') >= 0) {
					// Semver ranges can have a join of comparator sets.
					// e.g. '^3.0.2 || ^4.0.0' or '>=1.2.7 <1.3.0'
					const rangeSplit = depVer
						.split(' ')
						.map(v => coerce(v))
						.filter(v => valid(v));

					// Take each version in the range and find the maxSatisfying.
					const verToInstall = maxSatisfying(rangeSplit, depVer);
					if (verToInstall === null) {
						return `${dep}`;
					} else {
						return `${dep}@${verToInstall}`;
					}
				} else {
					return `${dep}@${depVer}`;
				}
			});
		debug && spinner.warn(yellow(`Dependencies to be installed: ${deps}`));
		spinner.succeed(`${green(`DEPENDENCIES`)} ${deps.length} found`);

		// Installer.
		const pkgs = [pkgSlug, ...deps];
		const total = pkgs.length;

		spinner.start(`${yellow(`INSTALLING`)} ${total} packages…`);
		debug && spinner.warn(yellow(`USING ${npm ? `npm` : `yarn`}`));
		const [errInstall, installed] = await to(
			Promise.all(
				pkgs.map(async (pkg, i) => {
					debug && spinner.warn(yellow(`INSTALLING ${pkg}`));
					if (npm !== false) {
						await execa(`npm`, [`install`, pkg, `--save`]);
					} else {
						await execa(`yarn`, [`add`, pkg]);
					}
					spinner.start(`${yellow(`INSTALLING`)} package ${i + 1}/${total} …`);
				})
			)
		);
		handleError('INSTALLER', errInstall);
		spinner.succeed(`${green(`INSTALLED`)} ${total}/${total} packages`);
		spinner.succeed(`${green(`…and that was it.`)}\n`);
		spinner.info(`${dim(`Check out the docs for more info on configuring the package`)}\n`);
		spinner.info(`${green(`ONLINE DOCS →`)} ${dim(`https://www.gatsbyjs.org/packages/${pkgSlug}/`)}`);
		spinner.info(`${green(`READ DOCS IN TERMINAL →`)} ${dim(`gpm docs ${pkgSlug}`)}\n`);
	}

	// Docs.
	if (cliData.docs) {
		spinner.start(`${yellow(`README`)} fetching…`);

		let errReadme, readme;

		/* The following code is painful. I've asked Michael to help fix this
		   https://twitter.com/MrAhmadAwais/status/1229146482420387844
		*/
		[errReadme, readme] = await to(axios.get(`https://unpkg.com/${pkgSlug}/README.md`));

		if (errReadme) {
			[errReadme, readme] = await to(axios.get(`https://unpkg.com/${pkgSlug}/readme.md`));
		}

		if (errReadme) {
			[errReadme, readme] = await to(axios.get(`https://unpkg.com/${pkgSlug}/ReadMe.md`));
		}

		if (errReadme) {
			spinner.fail(`${red(`FAILED`)} Maybe ${pkgSlug} doesn't have a readme.md\n`);
		}

		if (!errReadme) {
			spinner.succeed(`${green(`README`)} found`);
			spinner.info(`${green(`DOCS`)} for ${pkgSlug} ↓\n`);
			spinner.info(`${green(`RENDERING DOCS FROM →`)} ${dim(`https://www.gatsbyjs.org/packages/${pkgSlug}/`)}\n`);
			marked.setOptions({ renderer: new TerminalRenderer() });
			console.log(marked(readme.data));
		}
	}
})();
