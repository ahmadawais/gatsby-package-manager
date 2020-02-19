const chalk = require(`chalk`);
const cli = require(`commander`);
const pkg = require(`./package.json`);
const log = require(`./utils/log.js`);
const yellow = chalk.bold.yellow;
const green = chalk.bold.green;
const data = {};
const help = `
Example:
This is how you install Gatsby MDX plugin
  ${green(`gpm install ${yellow(`gatsby-plugin-mdx`)}`)}
OR
  ${green(`gpm i ${yellow(`gatsby-plugin-mdx`)}`)}

Interactive:
Run the interactive mode, without any commands.
  ${green(`gpm`)}
\n`;

module.exports = () => {
	cli.name(`gpm`);
	cli.version(pkg.version, `-v, --version`, `output the current version`);
	cli.option(`-c, --configure`, `store custom configuration`);
	cli.option(`-d, --debug`, `output debugging info`);
	cli.allowUnknownOption();
	cli.on(`--help`, () => {
		console.log(help);
	});

	cli.command('install <pkgName>')
		.description('install a gatsby package')
		.action(pkgName => {
			data.install = true;
			data.pkgName = pkgName;
		});
	cli.command('i <pkgName>')
		.description('install a gatsby package')
		.action(pkgName => {
			data.install = true;
			data.pkgName = pkgName;
		});

	cli.command('docs <pkgName>')
		.description('print readme.md of a package')
		.action(pkgName => {
			data.docs = true;
			data.pkgName = pkgName;
		});

	cli.command('d <pkgName>')
		.description('print readme.md of a package')
		.action(pkgName => {
			data.docs = true;
			data.pkgName = pkgName;
		});
	cli.parse(process.argv);
	return { ...cli.opts(), ...data };
};
